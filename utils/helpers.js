import EndpointInterface from "../service/EndpointInterface.js";

export const extractEntities = (config) => {
  const { ENTITIES } = config || {};
  return Object.keys(ENTITIES || {}).map((key) => ENTITIES[key]) || [];
};

export const findEntity = (config, code) => {
  const allEntities = extractEntities(config);
  return allEntities.find((item) => item.code === code) || {};
};

const toJSType = (fieldType) => {
  let type = null;
  switch (fieldType) {
    case "DATE":
      type = Object;
      break;
    case "LIST":
      type = Array;
      break;
    case "STRING":
    default:
      type = String;
      break;
  }
  return type;
};

export const buildProperties = (entity) =>
  (entity.formFields || []).reduce(
    (properties, group) =>
      (group.fields || []).reduce(
        (fields, field) => ({
          ...fields,
          [field.code]: {
            type: toJSType(field.type),
            attribute: false,
            reflect: true,
          },
        }),
        properties
      ),
    {}
  );

export const buildModelFields = (entity) =>
  (entity.formFields || []).reduce(
    (modelFields, group) =>
      (group.fields || []).reduce(
        (fields, field) => [
          ...fields,
          { property: field.code, value: field.code },
        ],
        modelFields
      ),
    []
  );

export const getEndpoints = (model, baseUrl) => { 
  const {code, schema} = model;
  return {
  DETAIL: {
    schema,
    endpointInterface: new EndpointInterface(code, "GET", "DETAIL", model),
    getEndpointConfig: ({ parameters }) => {
      const { uuid } = parameters;
      return {
        OVERRIDE_URL: `${baseUrl}/api/rest/default/persistence/${code}/${uuid}`,
      };
    },
  },
  LIST: {
    schema,
    endpointInterface: new EndpointInterface(code, "GET", "LIST", model),
    getEndpointConfig: () => {
      return {
        OVERRIDE_URL: `${baseUrl}/api/rest/default/persistence/${code}/list?withCount=true`,
      };
    },
    decorateProperties: ({ parameters }) => {
      const { firstRow, numberOfRows, fetchFields } = parameters;
      return { firstRow, numberOfRows, fetchFields };
    },
  },
  NEW: {
    schema,
    endpointInterface: new EndpointInterface(code, "POST", "NEW", model),
    getEndpointConfig: () => {
      return {
        OVERRIDE_URL: `${baseUrl}/api/rest/default/persistence`,
      };
    },
    decorateProperties: ({ props }) => {
      return [
        {
          name: `${toPascalName(code)} (${generateHash()})`,
          type: code,
          properties: {
            ...props,
          },
        },
      ];
    },
  },
  UPDATE: {
    schema,
    endpointInterface: new EndpointInterface(code, "PUT", "UPDATE", model),
    getEndpointConfig: ({ parameters }) => {
      const { uuid } = parameters;
      return {
        OVERRIDE_URL: `${baseUrl}/api/rest/default/persistence/${code}/${uuid}`,
      };
    },
  },
  DELETE: {
    schema,
    endpointInterface: new EndpointInterface(code, "DELETE", "DELETE", model),
    getEndpointConfig: ({ parameters }) => {
      const { uuid } = parameters;
      return {
        OVERRIDE_URL: `${baseUrl}/api/rest/default/persistence/${code}/${uuid}`,
      };
    },
  },
}};

const REGEX_PATTERN = /(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|_|\\s|-/gm;
const EMPTY = "";
const SPACE = " ";
const DASH = "-";
const UNDERSCORE = "_";
const TITLE_CASE = (word) =>
  !word ? word : word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
const UPPER_CASE = (word) => (!word ? word : word.toUpperCase());
const LOWER_CASE = (word) => (!word ? word : word.toLowerCase());

const convert = (input, mapper, joinCharacter) => {
  if (!input) {
    return "";
  }
  return input
    .replaceAll(REGEX_PATTERN, SPACE)
    .split(SPACE)
    .map(mapper)
    .join(joinCharacter);
};

export const toTitleName = (input) => {
  return convert(input, TITLE_CASE, SPACE);
};

export const toConstantName = (input) => {
  return convert(input, UPPER_CASE, UNDERSCORE);
};

export const toVariableName = (input) => {
  const name = convert(input, TITLE_CASE, EMPTY);
  return Character.toLowerCase(name.charAt(0)) + name.substring(1);
};

export const toPascalName = (input) => {
  return convert(input, TITLE_CASE, EMPTY);
};

export const toTagName = (input) => {
  return convert(input, LOWER_CASE, DASH);
};

export const generateHash = () => {
  const seed = new Uint8Array(8);
  return (window.crypto || window.msCrypto)
    .getRandomValues(seed)
    .reduce((currentHash, value) => {
      const nextHash = `${currentHash}${value.toString(16)}`;
      return nextHash;
    }, "");
};
