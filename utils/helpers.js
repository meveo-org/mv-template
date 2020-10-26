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

export const buildProperties = (entity) => {
  return (entity.formFields || []).reduce(
    (properties, field) => ({
      ...properties,
      [field.code]: {
        type: toJSType(field.fieldType),
        attribute: false,
        reflect: true,
      },
    }),
    {}
  );
};

export const buildModelFields = (entity) => {
  return (entity.formFields || []).reduce(
    (modelFields, field) => [
      ...modelFields,
      { property: field.code, value: field.code },
    ],
    []
  );
};
