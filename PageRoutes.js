import { LitElement, html } from "lit-element";
import * as config from "config";
import { extractEntities } from "utils";
import "mv-container";
import "mv-keycloak";
import "mv-progress-bar";
import "mv-router";
import "./components/layout/PageLayout.js";

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
        settings-path="./keycloak.json"
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

        ${this.shadowTemplate("loading", this.loading())}
        ${this.shadowTemplate("authenticating", this.loading())}
        ${this.shadowTemplate("failed", "Authentication failed.")}
      </mv-keycloak>
    `;
  }

  shadowTemplate = (slot, content) => html`
    <mv-main slot="${slot}">
      <mv-header slot="header">
        <mv-header item>${" "}</mv-header>
      </mv-header>
      <mv-menu-panel menu showLabel slot="menu">
        <mv-menu-panel label>${" "}</mv-menu-panel>
        <mv-menu-panel item>${" "}</mv-menu-panel>
      </mv-menu-panel>
      <mv-container>${content}</mv-container>
      <mv-footer slot="footer">
        <mv-footer item>${" "}</mv-footer>
      </mv-footer>
    </mv-main>
  `;

  loading = () => html`
    <mv-progressbar type="infinite" theme="light"></mv-progressbar>
  `;

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
