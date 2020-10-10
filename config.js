import * as models from "./model/index.js";

const URL = window.location;
const BASE_URL = URL.protocol + "//" + URL.host;
const CONTEXT_PATH = "meveo";
const appPath = `${BASE_URL}/${CONTEXT_PATH}`;
/* DECLARE OTHER PARAMETERS */

export const ENTITIES = Object.keys(models).reduce(
  (list, key) => ({
    ...list,
    [key]: models[key](appPath /* PASS OTHER PARAMETERS */),
  }),
  {}
);
