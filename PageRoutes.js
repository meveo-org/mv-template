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
              path="view/:code"
              .entity="${entity}"
              component="${PAGES_PATH}/ViewPage.js"
            ></mv-router>
            <mv-router
              route
              path="new/:code"
              name="${entity.code}"
              .entity="${entity}"
              storage-modes="local"
              component="${PAGES_PATH}/NewPage.js"
            ></mv-router>
            <mv-router
              route
              path="update/:code"
              .entity="${entity}"
              component="${PAGES_PATH}/UpdatePage.js"
            ></mv-router>
            <mv-router
              route
              path="list/:code"
              .entity="${entity}"
              component="${PAGES_PATH}/ListPage.js"
            ></mv-router>
          `
        )}
      </mv-router>
    `;
  }
}

customElements.define("page-routes", PageRoutes);
