import { LitElement, html, css } from "lit-element";
import * as config from "config";
import { NULL_ENTITY, findEntity } from "utils";
import { parseColumns } from "mv-table-utils";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../../components/layout/PageLayout.js";

export default class ListPageTemplate extends LitElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      filter: { type: Object, attribute: false, reflect: true },
      pages: { type: Number },
      currentPage: { type: Number },
      columns: { type: Array },
      rows: { type: Array },
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
    this.entity = { ...NULL_ENTITY };
    this.pages = 1;
    this.currentPage = 1;
    this.rows = [];
    this.filter = {
      rowsPerPage: 10,
      sortFields: [],
      search: {
        field: null,
        value: null,
      },
    };
  }

  render() {
    return html`
      <page-layout>
        <mv-container>
          <h1>${this.entity.label}</h1>
          <mv-button type="rounded" @button-clicked="${this.newItem}">
            <mv-fa icon="plus"></mv-fa>New
          </mv-button>
          <mv-table
            .columns="${this.columns || []}"
            .rows="${this.rows}"
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
    const code = (this.entity || {}).code || this.code;
    const entity = this.entity || findEntity(config, code);
    this.entity = entity;
    const { properties } = entity.schema;
    const columnOrder = Object.keys(properties || {});
    this.columns = this.columns || parseColumns(properties, columnOrder);
    this.loadList(1);
  }

  // override this in child component
  loadList = (page) => {
    this.rows = [];
    this.pages = 1;
    this.currentPage = page;
  };

  gotoPage = (event) => {
    const { detail = {} } = event || {};
    this.loadList(detail.page || 1);
  };

  newItem = () => {
    history.pushState(null, "", `./${this.entity.code}/new`);
  };

  updateRows = (event) => {
    const { detail } = event;
    const { list, count } = detail;
    this.rows = list;
    // TODO - do calculation for pages using count
  };
}

customElements.define("list-page-template", ListPageTemplate);
