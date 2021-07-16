import { LitElement, html } from "lit-element";
import { ENTITIES } from "models";
import "mv-router";

// component paths are relative to /web_modules/mv-router
const PAGES_PATH = "../../pages";

class PageRoutes extends LitElement {
  render() {
    return html`
      <mv-router>
        <mv-router
          default
          route
          path="dashboard"
          component="${PAGES_PATH}/MainDashboard.js"
        ></mv-router>
        ${this.renderDynamicRoutes()}
      </mv-router>
    `;
  }

  renderDynamicRoutes = () =>
    ENTITIES.map(
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
    );
}

customElements.define("page-routes", PageRoutes);
