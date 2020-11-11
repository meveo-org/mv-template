export default class DemoEntity {
  code = "Demo";
  label = "Demo";
  schema = {
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
      schema: null,
      override: null,
    },
    LIST: {
      schema: null,
      override: null,
    },
    NEW: {
      schema: null,
      override: null,
    },
    UPDATE: {
      schema: null,
      override: null,
    },
  };
}
