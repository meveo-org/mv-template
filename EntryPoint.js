import { LitElement, html, css } from "lit-element";
import "mv-router";

// component paths are relative to /web_modules/mv-router
const COMPONENT_PATH = "../../pages";

class EntryPoint extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <mv-router>
        <mv-router
          default
          route
          path="dashboard"
          component="${COMPONENT_PATH}/PageTemplate.js"
        ></mv-router>
      </mv-router>
    `;
  }
}

customElements.define("entry-point", EntryPoint);
