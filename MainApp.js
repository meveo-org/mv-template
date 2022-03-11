import { LitElement, html, css } from "lit";
import { loadModels } from "utils";
import "@meveo-org/mv-container";
import "@meveo-org/mv-footer";
import "@meveo-org/mv-header";
import "@meveo-org/mv-keycloak";
import "@meveo-org/mv-main";
import "@meveo-org/mv-menu-panel";
import "@meveo-org/mv-progress-bar";

class MainApp extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
    };
  }

  constructor() {
    super();
    this.auth = null;
    this.entities = null;
    this.permissions = null;
  }

  static get styles() {
    return css`
      :host {
        --font-size-m: 0.825rem;
        --mv-button-padding: 0.825rem;
        --mv-table-row-height: 2.5rem;
      }

      @media screen and (min-width: 1440px) {
        :host {
          --font-size-m: 1rem;
          --mv-button-padding: 1rem;
          --mv-table-row-height: 3rem;
        }
      }
    `;
  }

  render() {
    return html`
      <mv-keycloak
        settings-path="./keycloak.json"
        @auth-success="${this.loginSuccess}"
        @auth-fail="${this.loginFailed}"
        @auth-init-fail="${this.loginFailed}"
      >
        ${this.auth && this.entities ? this.loadRoutes() : null}
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

  loadRoutes = () => {
    import("./PageRoutes.js");
    return html`
      <page-layout
        .entities="${this.entities}"
        .permissions="${this.permissions}"
      >
        <page-routes
          .entities="${this.entities}"
          .permissions="${this.permissions}"
          .auth="${this.auth}"
        ></page-routes>
      </page-layout>
    `;
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("logout", this.logout);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("logout", this.logout);
  }

  loginSuccess = async (event) => {
    const {
      detail: { auth },
    } = event;
    this.auth = auth;
    const { MODELS, ENTITY_PERMISSIONS } = await loadModels();
    this.permissions = ENTITY_PERMISSIONS;
    this.entities = (MODELS || []).reduce(
      (entities, model) => ({
        ...entities,
        [model.code]: new model.ModelClass(auth),
      }),
      {}
    );
  };

  loginFailed = () => {
    this.auth = null;
  };

  logout = () => {
    this.auth.logout();
    this.auth = null;
  };
}

customElements.define("main-app", MainApp);
