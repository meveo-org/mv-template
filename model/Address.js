import * as config from "config";
import { ADDRESS_SCHEMA } from "./Schema.js";

export default class AddressEntity {
  code = "Address";
  label = "Address";
  schema = ADDRESS_SCHEMA;
  refSchemas = [];
  formFields = [
    {
      label: "Address",
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
      schema: ADDRESS_SCHEMA,
      getEndpointConfig: ({ parameters }) => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/${parameters.uuid}.json`,
      }),
    },
    LIST: {
      schema: ADDRESS_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    NEW: {
      schema: ADDRESS_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    UPDATE: {
      schema: ADDRESS_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    DELETE: {
      schema: ADDRESS_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
  };
}
