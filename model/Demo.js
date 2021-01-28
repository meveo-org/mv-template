import * as config from "config";
import { DemoSchema, AddressSchema } from "./Schema.js";

export default class DemoEntity {
  code = "Demo";
  name = "DemoEntity";
  label = "Demo";
  schema = DemoSchema;
  refSchemas = [AddressSchema];
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
					code: "isHuman",
					label: "Is Human",
					description: "Is Human",
					type: "BOOLEAN",
					editable: true,
					hideOnNew: false,
					default: "false",
				},
        {
          code: "address",
          name: "AddressEntity",
          label: "Address",
          description: "Address",
          type: "ENTITY",
          editable: true,
          hideOnNew: false,
          entitySchema: AddressSchema,
        },
      ],
    },
  ];
  endpoints = {
    DETAIL: {
      schema: DemoSchema,
      getEndpointConfig: ({ parameters }) => ({
        OVERRIDE_URL: `${config.BASE_URL}/model/${parameters.uuid}.json`,
      }),
    },
    LIST: {
      schema: DemoSchema,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    NEW: {
      schema: DemoSchema,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    UPDATE: {
      schema: DemoSchema,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
    DELETE: {
      schema: DemoSchema,
      getEndpointConfig: () => ({
        OVERRIDE_METHOD: "GET",
        OVERRIDE_URL: `${config.BASE_URL}/model/demo-data.json`,
      }),
    },
  };
}
