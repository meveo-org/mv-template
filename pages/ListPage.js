import { LitElement, html, css } from "lit-element";
import * as config from "config";
import { findEntity } from "utils";
import { parseColumns } from "mv-table-utils";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../../components/layout/PageLayout.js";

export default class ListPage extends LitElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      pages: { type: Number },
      currentPage: { type: Number },
      columns: { type: Array },
      items: { type: Array },
      code: { type: String },
    };
  }

  static get styles() {
    return css`
      h1 {
        margin-top: 0;
      }
    `;
  }

  constructor() {
    super();
    this.pages = 1;
    this.currentPage = 1;
    this.items = [];
  }

  render() {
    return html`
      <page-layout>
        <mv-container>
          <h1>Demos</h1>
          <mv-button type="rounded" @button-clicked="${this.newItem}">
            <mv-fa icon="plus"></mv-fa>New
          </mv-button>
          <mv-table
            .columns="${this.columns || []}"
            .rows="${this.items}"
            with-checkbox
            .action-column="${this.actionColumn}"
          ></mv-table>
          <mv-pagination
            type="text"
            .page="${this.currentPage}"
            .pages="${this.pages}"
            @change-page="${this.gotoPage}"
          ></mv-pagination>
        </mv-container>
      </page-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const entity = findEntity(config, this.entity.code || this.code);
    const { properties } = entity.schema;
    const columnOrder = Object.keys(properties || {});

    this.columns = this.columns || parseColumns(properties, columnOrder);
  }

  gotoPage = (event) => {
    const { detail = {} } = event || {};
    this.currentPage = detail.page || 1;
  };

  newItem = () => {
    history.pushState(null, "", `./new/${this.entity.code}`);
  };
}

customElements.define("list-page", ListPage);