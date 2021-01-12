import { LitElement, html, css } from "lit-element";
import { modelInterfaces } from "../../../service/EndpointInterface.js";
import * as config from "config";
import { NULL_ENTITY, EMPTY_DIALOG, findEntity, toTitleName } from "utils";
import { parseColumns } from "mv-table-utils";
import "mv-button";
import "mv-container";
import "mv-dialog";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../../../components/TableActions.js";

const DEFAULT_FILTER = {
  rowsPerPage: 10,
  sortFields: [],
  search: {
    field: null,
    value: null,
  },
};

export default class ListContent extends LitElement {
  static get properties() {
    return {
      code: { type: String },
      selectable: { type: Boolean },
      selectOne: { type: Boolean, attribute: "select-one", reflect: true },
      entity: { type: Object, attribute: false, reflect: true },
      filter: { type: Object, attribute: false, reflect: true },
      messageDialog: { type: Object, attribute: false, reflect: true },
      confirmDialog: { type: Object, attribute: false, reflect: true },
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
    this.selectable = false;
    this.selectOne = false;
    this.entity = { ...NULL_ENTITY };
    this.pages = 1;
    this.currentPage = 1;
    this.rowsPerPage = 5;
    this.rows = [];
    this.messageDialog = { ...EMPTY_DIALOG };
    this.confirmDialog = { ...EMPTY_DIALOG };
    this.filter = { DEFAULT_FILTER };
    this.actionColumn = {
      getActionComponent: (row) => html`
        <table-actions
          .row="${row}"
          @edit="${this.editRow}"
          @delete="${this.confirmDelete}"
        ></table-actions>
      `,
    };
  }

  render() {
    return html`
      <mv-container>
        <h1>${this.entity.label}</h1>
        <mv-button type="rounded" @button-clicked="${this.newItem}">
          <mv-fa icon="plus"></mv-fa>New
        </mv-button>
        <mv-table
          .columns="${this.columns || []}"
          .rows="${this.rows}"
          .action-column="${this.actionColumn}"
          ?selectable="${this.selectable}"
          ?select-one="${this.selectOne}"
          @row-click="${this.selectRow}"
        >
          ></mv-table
        >
        <mv-pagination
          type="text"
          .page="${this.currentPage}"
          .pages="${this.pages}"
          @change-page="${this.gotoPage}"
        ></mv-pagination>
      </mv-container>
      <mv-dialog
        class="message-dialog dialog-size"
        header-label="${this.messageDialog.title}"
        ?open="${this.messageDialog.open}"
        @ok-dialog="${this.closeDialog("messageDialog")}"
        no-left-button
        closeable
      >
        <p>${this.messageDialog.message}</p>
      </mv-dialog>
      <mv-dialog
        class="confirm dialog dialog-size"
        header-label="${this.confirmDialog.title}"
        ?open="${this.confirmDialog.open}"
        @close-dialog="${this.closeDialog("confirmDialog")}"
        @ok-dialog="${this.confirmDialog.okAction}"
        closeable
      >
        <p>${this.confirmDialog.message}</p>
      </mv-dialog>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const code = (this.entity || {}).code || this.code;
    const entity =
      !!this.entity && this.entity.code
        ? this.entity
        : findEntity(config, code);
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
    const { entity, rowsPerPage } = this;
    this.currentPage = page < 1 ? 1 : page;
    const firstRow = (this.currentPage - 1) * rowsPerPage;
    const endpointInterface = modelInterfaces(entity).LIST;
    endpointInterface.executeApiCall(
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
        result: { result = [], count = 0 },
      },
    } = event;

    if (count > 0 && result.length < 1 && this.currentPage > 1) {
      this.loadList(this.currentPage - 1);
    } else {
      this.rows = result;
      this.pages =
        this.rowsPerPage > 0 ? Math.ceil(count / this.rowsPerPage) : 1;
    }
  };

  handleErrors = (event) => {
    const {
      detail: { error },
    } = event;
    console.error("error: ", error);
    const [message, statusCode] = error;
    this.messageDialog = {
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
    this.dispatchEvent(new CustomEvent("new-item"));
  };

  editRow = (event) => {
    const {
      detail: { row },
    } = event;
    this.dispatchEvent(
      new CustomEvent("edit-item", {
        detail: {
          row,
        },
      })
    );
  };

  confirmDelete = (event) => {
    const {
      detail: { row },
    } = event;
    this.confirmDialog = {
      title: "Confirm delete",
      message: html`<span>Delete item?</span>`,
      open: true,
      okAction: this.deleteRow(row),
    };
  };

  deleteRow = (row) => () => {
    const { uuid } = row;
    const endpointInterface = modelInterfaces(this.entity).DELETE;
    endpointInterface.executeApiCall(
      {
        noAuth: true,
        config,
        uuid,
      },
      this.deleteSuccess,
      this.handleErrors
    );
  };

  deleteSuccess = () => {
    this.confirmDialog = { ...EMPTY_DIALOG };
    this.messageDialog = {
      title: "Success",
      message: html`<span>Item deleted.</span>`,
      open: true,
    };
    this.loadList(this.currentPage);
  };

  selectRow = (event) => {
    const {
      detail: { row },
    } = event;
    this.dispatchEvent(
      new CustomEvent("row-click", {
        detail: { row },
      })
    );
  };

  closeDialog = (name) => () => {
    this[name] = { ...EMPTY_DIALOG };
  };
}

customElements.define("list-content", ListContent);
