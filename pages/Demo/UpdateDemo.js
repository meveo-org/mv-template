import { LitElement, html, css } from "lit-element";
import "mv-container";
import "../../components/layout/PageLayout.js";

export default class UpdateDemo extends LitElement {
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

customElements.define("update-demo", UpdateDemo);
