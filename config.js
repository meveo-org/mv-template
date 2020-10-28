import * as models from "./model/index.js";

const URL = window.location;
export const BASE_URL = URL.protocol + "//" + URL.host;
export const CONTEXT_PATH = "meveo";
export const BASE_PATH = `${BASE_URL}/${CONTEXT_PATH}`;
export const SCHEMA_PATH = `${BASE_URL}/api/rest/entityCustomization/entity/schema`;

export const ENTITIES = Object.keys(models).reduce(
  (list, key) => ({
    ...list,
    [key]: models[key],
  }),
  {}
);
