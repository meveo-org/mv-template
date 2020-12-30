import * as config from "config";
import EndpointInterface from "../service/EndpointInterface.js";

const DEMO_SCHEMA = {
  storages: [],
  default: "Demo for generating Web App from module",
  $schema: "http://json-schema.org/draft-07/schema",
  id: "Demo",
  title: "Demo",
  type: "object",
  properties: {
    firstName: {
      storages: [],
      nullable: false,
      minLength: 1,
      description: "First name",
      readOnly: false,
      versionable: false,
      id: "CE_Demo_firstName",
      title: "Demo.firstName",
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
      id: "CE_Demo_lastName",
      title: "Demo.lastName",
      type: "string",
      maxLength: 255,
    },
    gender: {
      storages: [],
      nullable: true,
      description: "Gender",
      readOnly: false,
      versionable: false,
      id: "CE_Demo_gender",
      title: "Demo.gender",
      enum: ["other", "female", "male"],
    },
    birthDate: {
      storages: [],
      nullable: true,
      format: "date-time",
      description: "Birth date",
      readOnly: false,
      versionable: false,
      id: "CE_Demo_birthDate",
      title: "Demo.birthDate",
      type: "string",
    },
  },
  required: ["firstName", "lastName"],
};

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

export default class DemoEntity {
  code = "Demo";
  label = "Demo";
  schema = DEMO_SCHEMA;
  refSchemas = [];
  formFields = [
    {
      label: "Demo",
      fields: [
        {
          code: "firstName",
          label: "First Name",
          description: "First name",
          type: "STRING",
        },
        {
          code: "lastName",
          label: "Last Name",
          description: "Last name",
          type: "STRING",
        },
        {
          code: "birthDate",
          label: "Birth Date",
          description: "Birth date",
          type: "DATE",
        },
        {
          code: "gender",
          label: "Gender",
          description: "Gender",
          type: "LIST",
          listValues: {
            female: "Female",
            male: "Male",
            other: "Other",
          },
        },
        {
          code: "place",
          label: "Place",
          description: "Place",
          type: "ENTITY",
          editable: true,
          hideOnNew: false,
          entitySchema: DEMO_PLACE_SCHEMA,
        },
      ],
    },
  ];
  endpoints = {
    DETAIL: {
      schema: DEMO_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "GET", "DETAIL", model),
      getEndpointConfig: ({ parameters }) => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/${parameters.uuid}.json`,
      }),
    },
    LIST: {
      schema: DEMO_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "GET", "LIST", model),
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    NEW: {
      schema: DEMO_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "POST", "NEW", model),
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    UPDATE: {
      schema: DEMO_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "PUT", "UPDATE", model),
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    DELETE: {
      schema: DEMO_SCHEMA,
      getEndpointInterface: (model) =>
        new EndpointInterface(model.code, "DELETE", "DELETE", model),
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
  };
}
