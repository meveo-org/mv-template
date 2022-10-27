import {
  PERSISTENCE_PATH,
  SCHEMA_PATH,
  CUSTOM_ACTION_PATH,
  MODEL_PATH,
} from "../config.js";

export const findEntity = (entities, code) => {
  return entities.find((entity) => entity.code === code) || {};
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

export const buildProperties = (formFields) =>
  (formFields || []).reduce(
    (properties, group) =>
      (group.fields || []).reduce(
        (fields, field) => ({
          ...fields,
          [field.code]: {
            type: toJSType(field.fieldType),
            attribute: false,
            reflect: true,
          },
        }),
        properties
      ),
    {}
  );

export const buildModelFields = (formFields) =>
  (formFields || []).reduce(
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

export const parseModelDetails = (entityCode, models) => {
  const model = models.find((modelItem) => modelItem.code === entityCode);
  const { formFields } = model;
  const properties = buildProperties(formFields);
  const mappings = buildModelFields(formFields);
  return { properties, mappings };
};

export const retrieveSchema = async (auth, url, method = "GET") => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${auth.token}`);

  try {
    const response = await fetch(url, { method, headers });
    if (!response.ok) {
      throw new Error({
        name: "Schema Error",
        message: [
          `Encountered error retrieving schema: ${url}`,
          `Status code: ${response.status} [${response.statusText}]`,
        ],
      });
    }
    const type = response.headers.get("Content-Type") || "";
    if (type.includes("application/json")) {
      return await response.json();
    }
    return { statusCode: response.status, status: response.statusText };
  } catch (error) {
    console.error("error: ", error);
    return { detail: { error } };
  }
};

export const loadModels = async (auth) => {
  try {
    return await (await fetch(MODEL_PATH, { 
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${auth.token}`
      }
    })).json()
    // return await import(MODEL_PATH);
  } catch (error) {
    console.error("error: ", error);
    return { detail: { error } };
  }
};

export const getSchema = (auth, code) => {
  return retrieveSchema(auth, `${SCHEMA_PATH}/${code}`);
};

export const getRefSchemas = async (auth, codes) => {
  const requests = (codes || []).map((code) => getSchema(auth, code));
  return Promise.all(requests);
};

export const getEndpoints = (schema) => {
  return {
    DETAIL: {
      schema,
      getEndpointConfig: ({ entity, parameters }) => {
        const { uuid } = parameters;
        return {
          OVERRIDE_URL: `${PERSISTENCE_PATH}/${entity.code}/${uuid}`,
        };
      },
    },
    LIST: {
      schema,
      getEndpointConfig: ({ entity }) => {
        return {
          OVERRIDE_URL: `${PERSISTENCE_PATH}/${entity.code}/list?withCount=true`,
        };
      },
      decorateProperties: ({ parameters }) => {
        const {
          firstRow,
          numberOfRows,
          fetchFields,
          filters,
          sortField,
          ordering,
        } = parameters;
        return {
          firstRow,
          numberOfRows,
          fetchFields,
          filters,
          sortField,
          ordering,
        };
      },
    },
    NEW: {
      schema,
      getEndpointConfig: () => {
        return {
          OVERRIDE_URL: PERSISTENCE_PATH,
        };
      },
      decorateProperties: ({ entity, props }) => {
        return [
          {
            name: `${toPascalName(entity.code)} (${generateHash()})`,
            type: entity.code,
            properties: {
              ...props,
            },
          },
        ];
      },
    },
    UPDATE: {
      schema,
      getEndpointConfig: ({ entity, parameters }) => {
        const { uuid } = parameters;
        return {
          OVERRIDE_URL: `${PERSISTENCE_PATH}/${entity.code}/${uuid}`,
        };
      },
    },
    DELETE: {
      schema,
      getEndpointConfig: ({ entity, parameters }) => {
        const { uuid } = parameters;
        return {
          OVERRIDE_URL: `${PERSISTENCE_PATH}/${entity.code}/${uuid}`,
        };
      },
    },
    CUSTOM_ACTION: {
      schema,
      getEndpointConfig: () => {
        return {
          OVERRIDE_URL: CUSTOM_ACTION_PATH,
        };
      },
      decorateProperties: ({ parameters }) => {
        const { uuid, runWith, actionCode } = parameters;
        return { uuid, runWith, actionCode };
      },
    },
  };
};

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

export const toBoolean = (value, defaultValue) =>
  (["true", "false", true, false].includes(value) && JSON.parse(value)) ||
  defaultValue;

export const generateHash = () => {
  const seed = new Uint8Array(8);
  return (window.crypto || window.msCrypto)
    .getRandomValues(seed)
    .reduce((currentHash, value) => {
      const nextHash = `${currentHash}${value.toString(16)}`;
      return nextHash;
    }, "");
};
