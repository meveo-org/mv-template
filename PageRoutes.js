import { LitElement, html } from "lit-element";
import * as config from "config";
import { extractEntities } from "utils";
import "mv-keycloak";
import "mv-router";

// component paths are relative to /web_modules/mv-router
const PAGES_PATH = "../../pages";

class PageRoutes extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false, reflect: true },
    };
  }

  constructor() {
    super();
    this.auth = null;
  }

  render() {
    const entityList = extractEntities(config);
    return html`
      <mv-keycloak
        settings-path="./web_modules/mv-keycloak/keycloak.json"
        @auth-success="${this.loginSuccess}"
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
                path="${entity.code}/new"
                name="${entity.code}"
                .entity="${entity}"
                storage-modes="local"
                component="${PAGES_PATH}/${entity.code}/NewPage.js"
              ></mv-router>
              <mv-router
                route
                path="${entity.code}/update/:id"
                name="${entity.code}"
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
        <div slot="loading">
        <mv-main><mv-container>Loading...<mv-container></mv-main>
        </div>
        <div slot="authenticating">
          Authenticating...
        </div>
        <div slot="failed">This message is shown when authentication fails</div>
      </mv-keycloak>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("logout", this.logout);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("logout", this.logout);
  }

  loginSuccess = (event) => {
    const {
      detail: { auth },
    } = event;
    this.auth = auth;
  };

  loginFailed = () => {
    this.auth = null;
  };

  logout = () => {
    this.auth.logout();
    this.auth = null;
  };
}

customElements.define("page-routes", PageRoutes);
