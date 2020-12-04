import { LitElement, html, css } from "lit-element";
import * as config from "config";
import { NULL_ENTITY, EMPTY_DIALOG, findEntity, toTitleName } from "utils";
import { parseColumns } from "mv-table-utils";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../../components/layout/PageLayout.js";
import "../../components/TableActions.js";
import EndpointInterface from "../../service/EndpointInterface.js";

const DEFAULT_FILTER = {
  rowsPerPage: 10,
  sortFields: [],
  search: {
    field: null,
    value: null,
  },
};

export default class ListPageTemplate extends LitElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      filter: { type: Object, attribute: false, reflect: true },
      dialog: { type: Object, attribute: false, reflect: true },
      pages: { type: Number },
      currentPage: { type: Number },
      rowsPerPage: { type: Number },
      columns: { type: Array },
      rows: { type: Array },
    };
  }

  static get styles() {
    return css`
      h1 {
        margin-top: 0;
      }

      .dialog-size {
        --mv-dialog-width: 500px;
        --mv-dialog-max-height: 300px;
      }
    `;
  }

  constructor() {
    super();
    this.entity = { ...NULL_ENTITY };
    this.pages = 1;
    this.currentPage = 1;
    this.rowsPerPage = 5;
    this.rows = [];
    this.dialog = { ...EMPTY_DIALOG };
    this.filter = { DEFAULT_FILTER };
    this.actionColumn = {
      getActionComponent: (row) => html`
        <table-actions
          .row="${row}"
          @edit="${this.editRow}"
          @delete="${this.deleteRow}"
        ></table-actions>
      `,
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
          ></mv-table>
          <mv-pagination
            type="text"
            .page="${this.currentPage}"
            .pages="${this.pages}"
            @change-page="${this.gotoPage}"
          ></mv-pagination>
        </mv-container>
        <mv-dialog
          class="dialog-size"
          header-label="${this.dialog.title}"
          ?open="${this.dialog.open}"
          @close-dialog="${this.closeDialog}"
          no-left-button
          closeable
        >
          <p>${this.dialog.message}</p>
          <span slot="footer">
            <mv-button no-left-button @button-clicked="${this.closeDialog}">
              Close
            </mv-button>
          </span>
        </mv-dialog>
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
        fetchFields: this.columns.map((column) => column.name),
      },
      this.retrieveSuccess,
      this.handleErrors
    );
  };

  retrieveSuccess = (event) => {
    const {
      detail: {
        result: { result, count },
      },
    } = event;

    console.log("result: ", result);

    this.rows = result;
    this.pages = this.rowsPerPage > 0 ? Math.ceil(count / this.rowsPerPage) : 1;
  };

  handleErrors = (event) => {
    const {
      detail: { error },
    } = event;
    console.error("error: ", error);
    const [message, statusCode] = error;
    this.dialog = {
      title: "Error",
      message: html`<span>${message}</span><br /><small>${statusCode}</small>`,
      open: true,
    };
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

  deleteRow = (event) => {
    const {
      detail: { row },
    } = event;
    const { uuid } = row;
    const endpointInterface = new EndpointInterface(
      this.entity.code,
      "DELETE",
      "DELETE"
    );
    endpointInterface.executeApiCall(
      this,
      {
        noAuth: true,
        config,
        uuid,
      },
      this.retrieveSuccess,
      this.handleErrors
    );
  };

  deleteSuccess = () => {
    this.dialog = {
      title: "Success",
      message: html`<span>Item deleted.</span>`,
      open: true,
    };
  };

  closeDialog = () => {
    this.dialog = { ...EMPTY_DIALOG };
  };
}

customElements.define("list-page-template", ListPageTemplate);
