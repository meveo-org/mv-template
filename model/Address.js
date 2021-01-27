import * as config from "config";
import { AddressSchema } from "./Schema.js";

export default class AddressEntity {
  code = "Address";
  name = "AddressEntity";
  label = "Address";
  schema = AddressSchema;
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
      schema: AddressSchema,
      getEndpointConfig: ({ parameters }) => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/${parameters.uuid}.json`,
      }),
    },
    LIST: {
      schema: AddressSchema,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    NEW: {
      schema: AddressSchema,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    UPDATE: {
      schema: AddressSchema,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    DELETE: {
      schema: AddressSchema,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
  };
}
