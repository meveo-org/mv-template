import { LitElement, html, css } from "lit-element";
import "mv-router";

// component paths are relative to /web_modules/mv-router
const COMPONENT_PATH = "../../pages";

class EntryPoint extends LitElement {
  render() {
    return html`
      <mv-router>
        <mv-router
          default
          route
          path="dashboard"
          component="${COMPONENT_PATH}/DemoDashboard.js"
        ></mv-router>
        <mv-router
          route
          path="demo/view"
          component="${COMPONENT_PATH}/Demo/ViewDemo.js"
        ></mv-router>
        <mv-router
          route
          path="demo/new"
          name="demo-page"
          storage-modes="local"
          component="${COMPONENT_PATH}/Demo/NewDemo.js"
        ></mv-router>
        <mv-router
          route
          path="demo/update"
          component="${COMPONENT_PATH}/Demo/UpdateDemo.js"
        ></mv-router>
        <mv-router
          route
          path="demo/list"
          component="${COMPONENT_PATH}/Demo/ListDemo.js"
        ></mv-router>
      </mv-router>
    `;
  }
}

customElements.define("entry-point", EntryPoint);
