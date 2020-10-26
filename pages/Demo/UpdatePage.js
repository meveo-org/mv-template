import { LitElement, html, css } from "lit-element";
import "mv-container";
import "../../components/layout/PageLayout.js";

export default class UpdatePage extends LitElement {
  static properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
    };
  }
  static get styles() {
    return css``;
  }

  render() {
    return html`
      <page-layout>
        <mv-container>Update Demo</mv-container>
      </page-layout>
    `;
  }
}

customElements.define("demo-update-page", UpdatePage);
