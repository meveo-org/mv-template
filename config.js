import * as models from "./model/index.js";

const URL = window.location;
export const BASE_URL = URL.protocol + "//" + URL.host;

export const ENTITIES = Object.keys(models).reduce(
  (list, key) => ({
    ...list,
    [key]: models[key],
  }),
  {}
);
