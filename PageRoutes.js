import { LitElement, html } from "lit-element";
import * as config from "config";
import { extractEntities } from "utils";
import "mv-router";

// component paths are relative to /web_modules/mv-router
const PAGES_PATH = "../../pages";

class PageRoutes extends LitElement {
  render() {
    const entityList = extractEntities(config);
    return html`
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
              name="${entity.code}"
              .entity="${entity}"
              storage-modes="local"
              component="${PAGES_PATH}/${entity.code}/NewPage.js"
            ></mv-router>
            <mv-router
              route
              path="${entity.code}/update"
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
    `;
  }
}

customElements.define("page-routes", PageRoutes);
