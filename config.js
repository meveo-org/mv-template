const URL = window.location;
const BASE_URL = URL.protocol + "//" + URL.host;
const CONTEXT_PATH = "/investigation-core";
const APP_PATH = `${BASE_URL}${CONTEXT_PATH}`;

export const ENTITIES = {
  DEMO: {
    code: "demo_entity",
    name: "demo-entity",
    label: "Demo",
    schema: {
      storages: [],
      default: "Test Entity for generating Web App from module",
      $schema: "http://json-schema.org/draft-07/schema",
      id: "WebAppTestEntity",
      title: "Test Entity",
      type: "object",
      properties: {
        firstName: {
          storages: [],
          nullable: false,
          minLength: 1,
          description: "First name",
          readOnly: false,
          versionable: false,
          id: "CE_WebAppTestEntity_firstName",
          title: "WebAppTestEntity.firstName",
          type: "string",
          maxLength: 255,
        },
        lastName: {
          storages: [],
          nullable: false,
          minLength: 1,
          description: "Last name",
          readOnly: false,
          versionable: false,
          id: "CE_WebAppTestEntity_lastName",
          title: "WebAppTestEntity.lastName",
          type: "string",
          maxLength: 255,
        },
        gender: {
          storages: [],
          nullable: true,
          description: "Gender",
          readOnly: false,
          versionable: false,
          id: "CE_WebAppTestEntity_gender",
          title: "WebAppTestEntity.gender",
          enum: ["other", "female", "male"],
        },
        birthDate: {
          storages: [],
          nullable: true,
          format: "date-time",
          description: "Birth date",
          readOnly: false,
          versionable: false,
          id: "CE_WebAppTestEntity_birthDate",
          title: "WebAppTestEntity.birthDate",
          type: "string",
        },
      },
      required: ["firstName", "lastName"],
    },
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
