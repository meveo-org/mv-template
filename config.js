import * as models from "./model/index.js";

export const ENTITIES = Object.keys(models).reduce(
  (list, key) => ({
    ...list,
    [key]: models[key],
  }),
  {}
);

export const OFFLINE = true;
export const APP_NAME = "CUSTOM_ENTITIES";

const URL = window.location;
export const BASE_URL =
  URL.protocol + "//" + URL.host + "/meveo/rest/webapp/mv-template";
