export const extractEntities = (config) => {
  const { ENTITIES } = config || {};
  return Object.keys(ENTITIES || {}).map((key) => ENTITIES[key]);
};

export const findEntity = (config, code) => {
  return extractEntities(config).find((item) => item.code === code);
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
