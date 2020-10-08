export const extractEntities = (config) => {
  const { ENTITIES } = config || {};
  return Object.keys(ENTITIES || {}).map((key) => ENTITIES[key]);
};

export const findEntity = (config, code) => {
  return extractEntities(config).find((item) => item.code === code);
};
