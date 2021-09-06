import { getEndpoints, getSchema, getRefSchemas } from "utils";

export default class Model {
  constructor(auth) {
    this.auth = auth;
    this._schema = null;
    this._refSchemas = null;
    this._endpoints = null;
  }

  get schema() {
    if (!this._schema) {
      getSchema(this.auth, this.schemaCode).then((schema) => {
        this._schema = schema;
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
