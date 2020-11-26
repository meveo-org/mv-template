import { LitElement, html, css } from "lit-element";
import * as config from "config";
import { NULL_ENTITY, findEntity, toTitleName } from "utils";
import { parseColumns } from "mv-table-utils";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../../components/layout/PageLayout.js";
import EndpointInterface from "../../service/EndpointInterface.js";

export default class ListPageTemplate extends LitElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      filter: { type: Object, attribute: false, reflect: true },
      pages: { type: Number },
      currentPage: { type: Number },
      rowsPerPage: {type: Number},
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
    this.rowsPerPage = 20;
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
            with-checkbox
            .columns="${this.columns || []}"
            .rows="${this.rows}"
            .action-column="${this.actionColumn}"
            @row-click="${this.editRow}"
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
    const columns = this.columns || parseColumns(properties, columnOrder);
    this.columns = columns.map((column) => ({
      ...column,
      title: toTitleName(column.title),
    }));
    this.loadList(1);
  }

  loadList = (page) => {    
    this.currentPage = page < 1 ? 1 : page;
    const firstRow = (this.currentPage - 1) * this.rowsPerPage;
    const endpointInterface = new EndpointInterface(
      this.entity.code,
      "POST",
      "LIST"
    );
    endpointInterface.executeApiCall(
      this,
      {
        noAuth: true,
        config,
        firstRow,
        numberOfRows: this.rowsPerPage,
        fetchFields: this.columns,
      },
      this.retrieveSuccess,
      this.retrieveFailed
    );
  };

  retrieveSuccess = (event) => {
    const {
      detail: {
        result: { result, count },
      },
    } = event;

    this.rows = result;
    this.pages = this.rowsPerPage > 0 ? Math.ceil(count / this.rowsPerPage) : 1;
  };

  retrieveFailed = (event) => {
    const {
      detail: { error },
    } = event;
    console.log("error: ", error);
  };

  gotoPage = (event) => {
    const { detail = {} } = event || {};
    this.loadList(detail.page || 1);
  };

  newItem = () => {
    history.pushState(null, "", `./${this.entity.code}/new`);
  };

  editRow = (event) => {
    const {
      detail: { row },
    } = event;
    history.pushState(null, "", `./${this.entity.code}/update/${row.uuid}`);
  };
}

customElements.define("list-page-template", ListPageTemplate);
