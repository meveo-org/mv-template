import { html } from "lit-element";
import { MvElement } from "mv-element";
import * as config from "config";
import { extractEntities } from "utils";
import "mv-keycloak";
import "mv-router";

// component paths are relative to /web_modules/mv-router
const PAGES_PATH = "../../pages";

const APP_SCHEMA = {
  storages: [],
  default: "Secure Page data schema",
  $schema: "http://json-schema.org/draft-07/schema",
  id: "SecurePage",
  title: "Secure Page Schema",
  type: "object",
  properties: {
    auth: {
      minLength: 1,
      description: "Authorization object",
      id: "auth",
      title: "Authorization",
      type: "object",
    },
  },
};

class PageRoutes extends MvElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false, reflect: true },
    };
  }

  static get model() {
    return {
      modelClass: APP_SCHEMA,
      auth: { property: "token", value: "token" },
    };
  }

  render() {
    console.log("this.auth: ", this.auth);
    console.log("config.OFFLINE: ", config.OFFLINE);
    const entityList = extractEntities(config);
    return html`
      <mv-keycloak
        settingsPath="./keycloak.json"
        .auth="${this.auth}"
        ?offline="${config.OFFLINE}"
        @auth-success="${this.login}"
        @auth-fail="${this.loginFailed}"
        @auth-init-fail="${this.loginFailed}"
      >
        <mv-router>
          <mv-router
            default
            route
            path="dashboard"
            .entities="${entityList}"
            component="${PAGES_PATH}/MainDashboard.js"
          ></mv-router>
          ${entityList.map(
            (entity) => html`
              <mv-router
                route
                path="${entity.code}/view"
                .entity="${entity}"
                component="${PAGES_PATH}/${entity.code}/ViewPage.js"
              ></mv-router>
              <mv-router
                route
                path="${entity.code}/new"
                name="${`${config.APP_NAME}_${entity.code}_new`}"
                .entity="${entity}"
                storage-modes="local"
                component="${PAGES_PATH}/${entity.code}/NewPage.js"
              ></mv-router>
              <mv-router
                route
                path="${entity.code}/update/:id"
                name="${`${config.APP_NAME}_${entity.code}_update`}"
                .entity="${entity}"
                storage-modes="local"
                component="${PAGES_PATH}/${entity.code}/UpdatePage.js"
              ></mv-router>
              <mv-router
                route
                path="${entity.code}/list"
                .entity="${entity}"
                component="${PAGES_PATH}/${entity.code}/ListPage.js"
              ></mv-router>
            `
          )}
        </mv-router>
      </mv-keycloak>
    `;
  }

  login = (event) => {
    console.log(">>>>>>>>>>>login");
    if (!config.OFFLINE) {
      const { detail } = event;
      const { auth } = detail;
      this.auth = auth;
      this.store.updateValue("auth", auth);
    }
  };

  loginFailed = (event) => {
    const { detail } = event;
    console.log("login failed detail: ", detail);
  };
}

customElements.define("page-routes", PageRoutes);
