import * as config from "config";
import EndpointInterface from "../service/EndpointInterface.js";

const DEMO_PLACE_SCHEMA = {
  storages: [],
  default: "Demo Place for generating Web App from module",
  $schema: "http://json-schema.org/draft-07/schema",
  id: "DemoPlace",
  title: "Demo Place",
  type: "object",
  properties: {
    city: {
      storages: [],
      nullable: false,
      minLength: 1,
      description: "City",
      readOnly: false,
      versionable: false,
      id: "CE_DemoPlace_city",
      title: "DemoPlace.city",
      type: "string",
      maxLength: 255,
    },
    state: {
      storages: [],
      nullable: false,
      minLength: 1,
      description: "State",
      readOnly: false,
      versionable: false,
      id: "CE_DemoPlace_state",
      title: "DemoPlace.state",
      type: "string",
      maxLength: 255,
    },
    country: {
      storages: [],
      nullable: true,
      description: "Country",
      readOnly: false,
      versionable: false,
      id: "CE_DemoPlace_country",
      title: "DemoPlace.country",
      enum: ["here", "there", "everywhere"],
    },
  },
  required: ["city", "country"],
};

export default class DemoPlaceEntity {
  code = "DemoPlace";
  label = "DemoPlace";
  schema = DEMO_PLACE_SCHEMA;
  refSchemas = [];
  formFields = [
    {
      label: "DemoPlace",
      fields: [
        {
          code: "city",
          label: "City",
          description: "City",
          type: "STRING",
        },
        {
          code: "state",
          label: "State",
          description: "State",
          type: "STRING",
        },
        {
          code: "country",
          label: "Country",
          description: "Country",
          type: "LIST",
          listValues: {
            here: "Here",
            there: "There",
            everywhere: "Everywhere",
          },
        },
      ],
    },
  ];
  endpoints = {
    DETAIL: {
      schema: DEMO_PLACE_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "GET", "DETAIL", model),
      getEndpointConfig: ({ parameters }) => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/${parameters.uuid}.json`,
      }),
    },
    LIST: {
      schema: DEMO_PLACE_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "GET", "LIST", model),
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-place-data.json`,
      }),
    },
    NEW: {
      schema: DEMO_PLACE_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "POST", "NEW", model),
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-place-data.json`,
      }),
    },
    UPDATE: {
      schema: DEMO_PLACE_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "PUT", "UPDATE", model),
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-place-data.json`,
      }),
    },
    DELETE: {
      schema: DEMO_PLACE_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "DELETE", "DELETE", model),
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-place-data.json`,
      }),
    },
  };
}
