import GetRequest from "./GetRequest.js";
import PostRequest from "./PostRequest.js";
import DeleteRequest from "./DeleteRequest.js";
import PatchRequest from "./PatchRequest.js";
import PutRequest from "./PutRequest.js";
import { buildEndpointConfig } from "./ApiUtils.js";

const REQUEST_TYPE = {
  GET: GetRequest,
  POST: PostRequest,
  DELETE: DeleteRequest,
  PATCH: PatchRequest,
  PUT: PutRequest,
};
/**
 * The base class for endpoint interface classes.  To use it, create a subclass and initialize
 * the name and Http method of the endpoint via constructor.
 *
 * @export
 * @class Endpoint
 */
export default class Endpoint {
  constructor(method = "GET", type, entity) {
    this.name = entity.code;
    this.method = method;
    this.type = type;
    this.entity = entity;
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
   * @memberof Endpoint
   */
  executeApiCall(params, successCallback, errorCallback) {
    const { name, method } = this;
    const parameters = params || {};
    const endpointConfig = buildEndpointConfig(this, parameters);
    const { USE_MOCK = false, OVERRIDE_METHOD, OFFLINE } = endpointConfig;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    if (!!OFFLINE) {
      if (OFFLINE.execute) {
        successCallback(OFFLINE.execute(params));
      } else {
        successCallback({ detail: { result: OFFLINE.result } });
      }
    } else if (USE_MOCK === "ENDPOINT") {
      // Fetch from endpoint mock
      const endpointRequest = new REQUEST_TYPE[OVERRIDE_METHOD || method]({
        ...this,
        mock: true,
      });
      endpointRequest.executeRequest(parameters);
    } else {
      // Fetch from actual endpoint
      try {
        const endpointRequest = new REQUEST_TYPE[OVERRIDE_METHOD || method]({
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

export const modelEndpoints = (model) => ({
  DETAIL: new Endpoint("GET", "DETAIL", model),
  LIST: new Endpoint("POST", "LIST", model),
  NEW: new Endpoint("POST", "NEW", model),
  UPDATE: new Endpoint("PUT", "UPDATE", model),
  DELETE: new Endpoint("DELETE", "DELETE", model),
  CUSTOM_ACTION: new Endpoint("POST", "CUSTOM_ACTION", model),
});
