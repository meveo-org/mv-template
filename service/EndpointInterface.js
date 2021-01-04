import * as config from "config";
import { findEntity } from "utils";

/**
 * Extracts the value from parameters based on property name.
 *
 * @param {*} parameters an object that contains the values that will be parsed
 * @returns a reduce function that extracts the value that correspond
 * to a property and adds it to the resulting request parameters object
 */
function mapProperties(parameters) {
  return function (requestParameters, property) {
    const value = parameters[property];
    if (!!value) {
      return { ...requestParameters, [property]: value };
    }
    return requestParameters;
  };
}
/**
 * Traverse schema and refSchemas and extracts their keys.
 *
 * @param {*} schema the schema object that holds the properties that will be
 * extracted from the parameters
 * @param {*} refSchemas the list of parent schemas that are referenced in the
 * schema
 * @returns an object with only the parameter values that are defined
 * in the schema properties
 */
function getSchemaKeys(schema, refSchemas) {
  const hasParentSchema = !!schema.allOf && schema.allOf.length > 0;
  const keys = Object.keys(schema.properties);
  if (hasParentSchema) {
    return schema.allOf.reduce(
      (allKeys, schemaId) => {
        const parentSchema = refSchemas.find(
          (refSchema) => refSchema.id === schemaId["$ref"]
        );
        return [...allKeys, ...getSchemaKeys(parentSchema, refSchemas)];
      },
      [...keys]
    );
  }
  return keys;
}
/**
 * Retrieves the custom config object from the config.js file on the root of
 * the app if specified
 *
 * @param {*} endpoint the EndpointInterface object
 * @param {*} parameters the parameters passed in by the client
 */
function buildEndpointConfig(endpoint, parameters) {
  const { entity, type } = endpoint;
  const { getEndpointConfig } = (entity.endpoints || {})[type] || {
    getEndpointConfig: () => ({}),
  };
  const endpointConfig = getEndpointConfig({
    entity,
    endpoint,
    parameters,
  });
  return endpointConfig || {};
}
/**
 * Traverse schema.properties and extracts the values
 * from the parameters object. It only traverses the top-level
 * properties it does not check child nodes
 *
 * @param {*} parameters an object that contains the parameter values
 * @param {*} endpoint the endpoint object
 * @returns an object with only the parameter values that are defined
 * in the schema properties
 */
function buildRequestParameters(endpoint, parameters) {
  const { entity, type } = endpoint;
  const { schema, refSchemas } = entity;
  if (schema) {
    const keys = getSchemaKeys(schema, refSchemas);
    const { decorateProperties } = (entity.endpoints || {})[type] || {
      decorateProperties: () => ({}),
    };
    const props = keys.reduce(mapProperties(parameters), {});
    const properties = !!decorateProperties
      ? decorateProperties({ props, parameters, endpoint })
      : props;
    return properties;
  }
  return null;
}
/**
 * Generate the api URL using the base endpoint URL and then appending
 * any included path parameters
 *
 * @param {*} endpoint the EndpointInterface object
 * @param {*} parameters the parameters passed in by the client
 * @returns
 */
function buildApiUrl(endpoint, parameters) {
  const { endpointUrl, pathParameters } = endpoint;
  const endpointConfig = buildEndpointConfig(endpoint, parameters);
  const { OVERRIDE_URL } = endpointConfig;
  const hasPathParameters = !!pathParameters && pathParameters.length > 0;
  let apiUrl = endpointUrl;
  if (!OVERRIDE_URL && hasPathParameters) {
    const parameterMap = pathParameters.reduce(mapProperties(parameters), {});
    const pathParams =
      Object.keys(parameterMap)
        .map(function (key) {
          return parameterMap[key];
        })
        .join("/") || "";
    if (!!pathParams) {
      apiUrl = `${endpointUrl}/${pathParams}`;
    }
  }
  return OVERRIDE_URL || apiUrl;
}
/**
 * The base class for Requests
 *
 * @class ApiRequest
 */
class ApiRequest {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  /**
   * Builds an Http Request header based on the user defined headers of the default headers
   *
   * @param {*} parameters an object contains the authorization token and configs
   * @returns an http Header object with corresponding properties defined
   * @memberof ApiRequest
   */
  buildHeaders(parameters) {
    const { token, noAuth } = parameters;
    const endpointConfig = buildEndpointConfig(this.endpoint, parameters);
    const { OVERRIDE_HEADER } = endpointConfig;
    const headers = new Headers();
    const appendHeaders = OVERRIDE_HEADER || {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (!noAuth) {
      appendHeaders.Authorization = `Bearer ${token}`;
    }
    Object.keys(appendHeaders).forEach(function (key) {
      headers.append(key, appendHeaders[key]);
    });
    return headers;
  }
  /**
   * The main method for calling a fetch request to the API
   *
   * @param {*} requestUrl an Http URL object
   * @param {*} options object to be passed into the fetch request
   * contains the Http method, headers, and body
   * @memberof ApiRequest
   */
  callApi(requestUrl, options) {
    const { endpointUrl, successCallback, errorCallback } = this.endpoint;
    fetch(requestUrl, options)
      .then(function (response) {
        if (!response.ok) {
          throw [
            `Encountered error calling API: ${endpointUrl}`,
            `Status code: ${response.status} [${response.statusText}]`,
          ];
        }
        const type = response.headers.get("Content-Type");
        return type.includes("application/json")
          ? response.json()
          : { status: response.statusText };
      })
      .then(function (result) {
        if (successCallback) {
          successCallback({ detail: { result } });
        } else {
          console.info("result: ", result);
        }
      })
      .catch(function (error) {
        if (errorCallback) {
          console.log("error: ", error);
          errorCallback({ detail: { error } });
        } else {
          console.error(error);
        }
      });
  }
}
/**
 * The ApiRequest for GET requests
 *
 * @class GetRequest
 * @extends {ApiRequest}
 */
class GetRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http GET requests
   *
   * @param {*} parameters
   * @memberof GetRequest
   */
  executeRequest(parameters) {
    const { mock } = this.endpoint;
    const requestParameters = buildRequestParameters(this.endpoint, parameters);
    const parameterKeys = Object.keys(requestParameters || {});
    const hasParameters = requestParameters && parameterKeys.length > 0;
    const apiUrl = buildApiUrl(this.endpoint, parameters);
    console.log("apiUrl: ", apiUrl);
    const requestUrl = new URL(apiUrl);
    if (hasParameters) {
      parameterKeys.forEach(function (key) {
        requestUrl.searchParams.append(key, requestParameters[key]);
      });
    }
    if (mock) {
      requestUrl.searchParams.append("mock", true);
    }
    const headers = this.buildHeaders(parameters);
    const options = { method: "GET", headers };
    this.callApi(requestUrl, options);
  }
}
/**
 * The ApiRequest for POST requests
 *
 * @class PostRequest
 */
class PostRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http POST requests
   *
   * @param {*} parameters
   * @memberof PostRequest
   */
  executeRequest(parameters) {
    const { mock } = this.endpoint;
    const requestParameters = buildRequestParameters(this.endpoint, parameters);
    const apiUrl = buildApiUrl(this.endpoint, parameters);
    const requestUrl = new URL(apiUrl);
    if (mock) {
      requestUrl.searchParams.append("mock", true);
    }
    const headers = this.buildHeaders(parameters);
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(requestParameters),
    };
    this.callApi(requestUrl, options);
  }
}
/**
 * The ApiRequest for DELETE requests
 *
 * @class DeleteRequest
 */
class DeleteRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http DELETE requests
   *
   * @param {*} parameters
   * @memberof DeleteRequest
   */
  executeRequest(parameters) {
    const { mock } = this.endpoint;
    const requestParameters = buildRequestParameters(this.endpoint, parameters);
    const parameterKeys = Object.keys(requestParameters || {});
    const hasParameters = requestParameters && parameterKeys.length > 0;
    const apiUrl = buildApiUrl(this.endpoint, parameters);
    const requestUrl = new URL(apiUrl);
    if (hasParameters) {
      parameterKeys.forEach(function (key) {
        requestUrl.searchParams.append(key, requestParameters[key]);
      });
    }
    if (mock) {
      requestUrl.searchParams.append("mock", true);
    }
    const headers = this.buildHeaders(parameters);
    const options = { method: "DELETE", headers };
    this.callApi(requestUrl, options);
  }
}
/**
 * The ApiRequest for PUT requests
 *
 * @class PutRequest
 */
class PutRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http PUT requests
   *
   * @param {*} parameters
   * @memberof PutRequest
   */
  executeRequest(parameters) {
    const { mock } = this.endpoint;
    const requestParameters = buildRequestParameters(this.endpoint, parameters);
    const apiUrl = buildApiUrl(this.endpoint, parameters);
    const requestUrl = new URL(apiUrl);
    if (mock) {
      requestUrl.searchParams.append("mock", true);
    }
    const headers = this.buildHeaders(parameters);
    const options = {
      method: "PUT",
      headers,
      body: JSON.stringify(requestParameters),
    };
    this.callApi(requestUrl, options);
  }
}
const REQUEST_TYPE = {
  GET: GetRequest,
  POST: PostRequest,
  DELETE: DeleteRequest,
  PUT: PutRequest,
};
/**
 * The base class for endpoint interface classes.  To use it, create a subclass and initialize
 * the name and Http method of the endpoint via constructor.
 *
 * @export
 * @class EndpointInterface
 */
export default class EndpointInterface {
  constructor(name, method = "GET", type, entity) {
    this.name = name;
    this.endpointUrl = `http://localhost:8080/meveo/rest/${name}`;
    this.method = method;
    this.type = type;
    this.entity = entity || findEntity(config, name);
    this.successCallback = null;
    this.errorCallback = null;
  }
  /**
   * The main method to call an API.
   *
   * @param {*} params the parameters used for calling the API, main properties is token or noAuth.
   * All other parameters passed into this object are considered endpoint parameters which will be
   * parsed based on the request schema
   * token - contains the authorization token used for calling the API
   * noAuth - set to true if the endpoint does not require authorization
   * @param {*} successCallback the function to be called when an api call is successful
   * @param {*} errorCallback the function to be called when an api call throws an error
   * @memberof EndpointInterface
   */
  executeApiCall(params, successCallback, errorCallback) {
    const { name, method, mockResult } = this;
    const parameters = params || {};
    const endpointConfig = buildEndpointConfig(this, parameters);
    const { USE_MOCK = false } = endpointConfig;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    if (USE_MOCK === "OFFLINE") {
      successCallback({ detail: { result: mockResult } });
    } else if (USE_MOCK === "ENDPOINT") {
      // Fetch from endpoint mock
      const endpointRequest = new REQUEST_TYPE[method]({
        ...this,
        mock: true,
      });
      endpointRequest.executeRequest(parameters);
    } else {
      // Fetch from actual endpoint
      try {
        const endpointRequest = new REQUEST_TYPE[method]({
          ...this,
          name,
        });
        endpointRequest.executeRequest(parameters);
      } catch (error) {
        if (!!errorCallback) {
          errorCallback({ detail: { error } });
        }
      }
    }
  }
}

export const modelInterfaces = (model) => ({
  DETAIL: new EndpointInterface(model.code, "GET", "DETAIL", model),
  LIST: new EndpointInterface(model.code, "POST", "LIST", model),
  NEW: new EndpointInterface(model.code, "POST", "NEW", model),
  UPDATE: new EndpointInterface(model.code, "PUT", "UPDATE", model),
  DELETE: new EndpointInterface(model.code, "DELETE", "DELETE", model),
});
