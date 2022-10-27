/**
 * Extracts the value from parameters based on property name.
 *
 * @param {*} parameters an object that contains the values that will be parsed
 * @returns a reduce function that extracts the value that correspond
 * to a property and adds it to the resulting request parameters object
 */
 export const mapProperties = (parameters) => {
  return function (requestParameters, property) {
    const value = parameters[property];
    if (!!value) {
      return { ...requestParameters, [property]: value };
    }
    return requestParameters;
  };
};

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
export const getSchemaKeys = (schema, refSchemas) => {
  const hasParentSchema = !!schema.allOf && schema.allOf.length > 0;
  const keys = Object.keys(schema.properties || {});
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
};

/**
 * Retrieves the custom config object from the config.js file on the root of
 * the app if specified
 *
 * @param {*} endpoint the Endpoint object
 * @param {*} parameters the parameters passed in by the client
 */
export const buildEndpointConfig = (endpoint, parameters) => {
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
};

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
export const buildRequestParameters = (endpoint, parameters) => {
  const { entity, type } = endpoint;
  const { schema, refSchemas= {} } = entity;

  const { decorateProperties } = (entity.endpoints || {})[type] || {
    decorateProperties: () => ({}),
  };

  if (schema) {
    const keys = getSchemaKeys(schema, refSchemas);
    const props = keys.reduce(mapProperties(parameters), {});

    return !!decorateProperties
      ? decorateProperties({ props, parameters, endpoint, entity })
      : props;

  } else {
    return !!decorateProperties
      ? decorateProperties({ props: {}, parameters, endpoint, entity })
      : null;
  }

};

/**
 * Generate the api URL using the base endpoint URL and then appending
 * any included path parameters
 *
 * @param {*} endpoint the Endpoint object
 * @param {*} parameters the parameters passed in by the client
 * @returns
 */
export const buildApiUrl = (endpoint, parameters) => {
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
};
