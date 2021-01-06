import { html } from "lit-element";
import { MvElement } from "mv-element";
import * as config from "config";

const SCHEMA = {
  storages: [],
  default: "Secure Page data schema",
  $schema: "http://json-schema.org/draft-07/schema",
  id: "SecurePage",
  title: "Secure Page Schema",
  type: "object",
  properties: {
    token: {
      minLength: 1,
      description: "Token",
      id: "token",
      title: "Token",
      type: "string",
    },
  },
};

export class SecurePageTemplate extends MvElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false, reflect: true },
      token: { type: String },
    };
  }

  static get model() {
    return {
      modelClass: SCHEMA,
      token: [{ property: "token", value: "token" }],
    };
  }

  constructor() {
    super();
    this.token = "";
  }

  login = (event) => {
    const { detail } = event;
    console.log("login detail: ", detail);
  };

  loginFailed = (event) => {
    const { detail } = event;
    console.log("login failed detail: ", detail);
  };
}
