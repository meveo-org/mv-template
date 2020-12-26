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
      ],
    },
  ];
  endpoints = {
    DETAIL: {
      endpointInterface: new EndpointInterface("Demo", "GET", "DETAIL", this),
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    LIST: {
      endpointInterface: new EndpointInterface("Demo", "GET", "LIST", this),
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    NEW: {
      endpointInterface: new EndpointInterface("Demo", "POST", "NEW", this),
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    UPDATE: {
      endpointInterface: new EndpointInterface("Demo", "PUT", "UPDATE", this),
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    DELETE: {
      endpointInterface: new EndpointInterface(
        "DemoEntity",
        "DELETE",
        "DELETE",
        this
      ),
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
  };
}
