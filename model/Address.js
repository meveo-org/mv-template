import * as config from "config";

const ADDRESS_SCHEMA = {
  storages: [],
  default: "Address for generating Web App from module",
  $schema: "http://json-schema.org/draft-07/schema",
  id: "Address",
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
      id: "CE_Address_city",
      title: "Address.city",
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
      id: "CE_Address_state",
      title: "Address.state",
      type: "string",
      maxLength: 255,
    },
    country: {
      storages: [],
      nullable: true,
      description: "Country",
      readOnly: false,
      versionable: false,
      id: "CE_Address_country",
      title: "Address.country",
      enum: ["here", "there", "everywhere"],
    },
  },
  required: ["city", "country"],
};

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
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    NEW: {
      schema: ADDRESS_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    UPDATE: {
      schema: ADDRESS_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
    DELETE: {
      schema: ADDRESS_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/address-data.json`,
      }),
    },
  };
}
