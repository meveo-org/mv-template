import { LitElement, html, css } from "lit-element";
import "mv-container";
import "../components/layout/PageLayout.js";

export default class PageTemplate extends LitElement {
  static get styles() {
    return css`
      :host {
        --container-padding: 40px;
        --container-total-padding: calc(var(--container-padding) * 2);
        --container-dimensions: calc(100% - var(----container-total-padding));
        --mv-container-min-width: var(--container-dimensions);
        --mv-container-max-width: 100%;
        --mv-container-margin: 0 0 20px 0;
      }
    `;
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
