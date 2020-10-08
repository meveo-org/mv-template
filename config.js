const URL = window.location;
const BASE_URL = URL.protocol + "//" + URL.host;
const CONTEXT_PATH = "/investigation-core";
const APP_PATH = `${BASE_URL}${CONTEXT_PATH}`;

export const ENTITIES = {
  DEMO: {
    code: "demo_entity",
    name: "demo-entity",
    label: "Demo",
    schema: {},
    refSchemas: {},
    endpoints: {
      DETAIL: {
        schema: null,
        override: null,
      },
      LIST: {
        schema: null,
        override: null,
      },
      NEW: {
        schema: null,
        override: ({ endpoint, parameters }) => {
          const { mission = {} } = parameters || {};
          return {
            // declare an override url if the endpoint is not a meveo endpoint
            URL: `${APP_PATH}/services/missions/${mission.code}/investigations/start`,
            // declare a PROPERTIES function if the request properties
            // are not declared in the request schema, most likely when the endpoint
            // is not a meveo endpoint
            PROPERTIES: (properties, parameters, endpoint) => {
              const { templateCode, valueKey, investName } = parameters;
              return {
                templateCode,
                investName,
                [valueKey]: [{ ...properties }],
              };
            },
          };
        },
      },
      UPDATE: {
        schema: null,
        override: null,
      },
    },
  },
};
