import { LitElement, html, css } from "lit-element";
import "mv-container";
import "../components/layout/PageLayout.js";

export default class PageTemplate extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html`
      <page-layout>
        <mv-container>Template Contents</mv-container>
      </page-layout>
    `;
  }
}

customElements.define("page-template", PageTemplate);
