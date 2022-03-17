import { LitElement, html } from "lit";
import "@meveo-org/mv-router";

// component paths are relative to /web_modules/mv-router
const PAGES_PATH = "../../pages";
import MainDashboard from "./pages/MainDashboard.js";

class PageRoutes extends LitElement {
  static get properties() {
    return {
      entities: { type: Object, attribute: false },
      permissions: { type: Object, attribute: false },
      auth: { type: Object, attribute: false },
    };
  }

  constructor() {
    super();
    this.entities = null;
    this.permissions = null;
    this.auth = null;
  }

  render() {
    return html`
      <mv-router>
        <mv-router
          default
          route
          path="dashboard"
          .auth="${this.auth}"
          .entities="${this.entities}"
          .permissions="${this.permissions}"
          .componentClass="${MainDashboard}"
        ></mv-router>
        ${this.renderDynamicRoutes()}
      </mv-router>
    `;
  }

  renderDynamicRoutes = () => {
    return Object.keys(this.entities).map((key) => {
      const entity = this.entities[key];
      return html`
        <mv-router
          route
          path="${entity.code}/new"
          name="${entity.code}"
          .auth="${this.auth}"
          .entity="${entity}"
          .entities="${this.entities}"
          .permissions="${this.permissions}"
          storage-modes="local"
          component="${PAGES_PATH}/${entity.code}/NewPage.js"
        ></mv-router>
        <mv-router
          route
          path="${entity.code}/update/:id"
          name="${entity.code}"
          .auth="${this.auth}"
          .entity="${entity}"
          .entities="${this.entities}"
          .permissions="${this.permissions}"
          storage-modes="local"
          component="${PAGES_PATH}/${entity.code}/UpdatePage.js"
        ></mv-router>
        <mv-router
          route
          path="${entity.code}/list"
          .auth="${this.auth}"
          .entity="${entity}"
          .entities="${this.entities}"
          .permissions="${this.permissions}"
          component="${PAGES_PATH}/${entity.code}/ListPage.js"
        ></mv-router>
      `;
    });
  };
}

customElements.define("page-routes", PageRoutes);
