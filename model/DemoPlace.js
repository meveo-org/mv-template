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
      endpointInterface: new EndpointInterface("DemoPlace", "GET", "DETAIL", this),
      schema: DEMO_PLACE_SCHEMA,
      getEndpointConfig: ({ parameters }) => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/${parameters.uuid}.json`,
      }),
    },
    LIST: {
      endpointInterface: new EndpointInterface("DemoPlace", "GET", "LIST", this),
      schema: DEMO_PLACE_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-place-data.json`,
      }),
    },
    NEW: {
      endpointInterface: new EndpointInterface("DemoPlace", "POST", "NEW", this),
      schema: DEMO_PLACE_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-place-data.json`,
      }),
    },
    UPDATE: {
      endpointInterface: new EndpointInterface("DemoPlace", "PUT", "UPDATE", this),
      schema: DEMO_PLACE_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-place-data.json`,
      }),
    },
    DELETE: {
      endpointInterface: new EndpointInterface(
        "DemoEntity",
        "DELETE",
        "DELETE",
        this
      ),
      schema: DEMO_PLACE_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-place-data.json`,
      }),
    },
  };
}
