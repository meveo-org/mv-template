import * as config from "config";
import { DEMO_SCHEMA, ADDRESS_SCHEMA } from "./Schema.js";

export default class DemoEntity {
  code = "Demo";
  label = "Demo";
  schema = DEMO_SCHEMA;
  refSchemas = [ADDRESS_SCHEMA];
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
          code: "address",
          label: "Address",
          description: "Address",
          type: "ENTITY",
          editable: true,
          hideOnNew: false,
          entitySchema: ADDRESS_SCHEMA,
        },
      ],
    },
  ];
  endpoints = {
    DETAIL: {
      schema: DEMO_SCHEMA,
      getEndpointConfig: ({ parameters }) => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/${parameters.uuid}.json`,
      }),
    },
    LIST: {
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    NEW: {
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    UPDATE: {
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    DELETE: {
      schema: DEMO_SCHEMA,
      getEndpointConfig: () => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
  };
}
