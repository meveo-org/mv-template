import { LitElement, html, css } from "lit-element";
import "mv-container";
import "mv-dialog";
import "mv-font-awesome";
import "mv-tab";
import "mv-tooltip";
import "../components/layout/PageLayout.js";

export default class PageTemplate extends LitElement {
  static get styles() {
    return css`
      .main-container {
        background: var(--light-9-background);
        height: calc(100% - 40px);
        width: calc(100% - 80px);
        min-width: 600px;
        overflow: auto;
        padding: 40px 40px 0 40px;
        margin: 0;
      }
    `;
  }

  render() {
    return html`
      <page-layout>
        <div class="main-container">Template Contents</div>
      </page-layout>
    `;
  }
}

customElements.define("page-template", PageTemplate);
