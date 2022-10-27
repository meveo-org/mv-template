import { getEndpoints, getSchema, getRefSchemas } from "/utils/index.js";

export default class Model {
  constructor(auth, schemaCode) {
    this.auth = auth;
    this._schema = null;
    this._refSchemas = null;
    this._endpoints = null;
    this.schemaCode = schemaCode;

    // Initialize the schema
    this.schema;
  }

  get schema() {
    if (!this._schema) {
      getSchema(this.auth, this.schemaCode).then((schema) => {
        this._schema = schema;
        if (!this._schema.properties) {
          this._schema.properties = {};
        }
      });
    }
    return this._schema;
  }

  get refSchemas() {
    if (!this._refSchemas) {
      getRefSchemas(this.auth, this.refSchemaCodes).then((schemas) => {
        this._refSchemas = schemas;
      });
    }
    return this._refSchemas;
  }

  get endpoints() {
    if (!this._endpoints) {
      this._endpoints = getEndpoints(this.schema);
    }
    return this._endpoints;
  }
}
