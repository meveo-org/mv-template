import { LitElement, html, css } from "lit-element";
import { modelInterfaces } from "../../../service/EndpointInterface.js";
import * as config from "config";
import { NULL_ENTITY, EMPTY_DIALOG, toTitleName } from "utils";
import "mv-button";
import "mv-container";
import "mv-dialog";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "mv-select";
import "../../../components/TableActions.js";
import "../../filters/TableFilters.js";

const ROWS_PER_PAGE = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

export default class ListContent extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      code: { type: String },
      selectable: { type: Boolean },
      selectOne: { type: Boolean, attribute: "select-one", reflect: true },
      withCheckbox: {
        type: Boolean,
        attribute: "with-checkbox",
        reflect: true,
      },
      entity: { type: Object, attribute: false },
      filters: { type: Object, attribute: false },
      fields: { type: Array, attribute: false },
      messageDialog: { type: Object, attribute: false },
      confirmDialog: { type: Object, attribute: false },
      columns: { type: Array, attribute: false },
      columnOrder: { type: Array, attribute: false },
      rows: { type: Array, attribute: false },
      pages: { type: Number },
      currentPage: { type: Number },
      rowsPerPage: { type: Number },
      visibleFilters: { type: Boolean },
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

      .action-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .text-with-selection {
        display: flex;
        align-items: center;
      }

      .text-with-selection mv-select {
        --mv-select-width: 3rem;
        margin: 0 5px;
      }

      .action-section .right {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .action-section .right mv-dropdown {
        --mv-dropdown-trigger-height: 60px;
        --mv-container-min-width: 50rem;
        --mv-container-max-width: 50rem;
      }

      .action-section .right mv-dropdown ul {
        padding: 0;
      }

      .action-section .right mv-dropdown li {
        display: block;
        width: calc(100% - 10px);
        padding: 5px;
      }

      .action-section .right mv-dropdown li:hover {
        list-style: none;
        display: block;
        background: #1d9bc9;
        color: #ffffff;
        --mv-checkbox-label-color: #ffffff;
      }
    `;
  }

  constructor() {
    super();
    this.auth = null;
    this.selectable = false;
    this.selectOne = false;
    this.entity = { ...NULL_ENTITY };
    this.pages = 1;
    this.currentPage = 1;
    this.rowsPerPage = ROWS_PER_PAGE[1].value;
    this.selectedRowsPerPage = ROWS_PER_PAGE[1];
    this.rows = [];
    this.fields = [];
    this.columnOrder = [];
    this.visibleFilters = false;
    this.messageDialog = { ...EMPTY_DIALOG };
    this.confirmDialog = { ...EMPTY_DIALOG };
    this.filters = {};
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
    const { formFields } = this.entity;
    return html`
      <mv-container>
        <h1>${this.entity.label}</h1>
        <div class="action-section">
          <div>
            <mv-button type="rounded" @button-clicked="${this.newItem}">
              <mv-fa icon="plus"></mv-fa>New
            </mv-button>
          </div>
          <div class="right">
            <div class="text-with-selection">
              <span>Show</span>
              <mv-select
                .value="${this.selectedRowsPerPage}"
                .options="${ROWS_PER_PAGE}"
                @select-option="${this.changeRowsPerPage}"
                no-clear-button
              ></mv-select>
              <span>rows</span>
            </div>
            <mv-dropdown
              container
              justify="right"
              position="bottom"
              theme="light"
            >
              <mv-dropdown trigger>
                <mv-button type="rounded">Show Columns</mv-button>
              </mv-dropdown>
              ${formFields.map((group) => this.renderFieldGroup(group))}
            </mv-dropdown>
            <mv-button type="rounded" @button-clicked="${this.toggleFilters}">
              Filters
            </mv-button>
          </div>
        </div>
        <table-filters
          ?open="${this.visibleFilters}"
          .fields="${formFields}"
          @apply-filters="${this.applyFilters}"
          @clear-filters="${this.clearFilters}"
          @close-filters="${this.toggleFilters}"
        ></table-filters>
        <mv-table
          .columns="${this.columns || []}"
          .rows="${this.rows}"
          .action-column="${this.actionColumn}"
          ?selectable="${this.selectable}"
          ?select-one="${this.selectOne}"
          ?with-checkbox="${this.withCheckbox}"
          @select-row="${this.selectRow}"
        ></mv-table>
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
    const { formFields, schema } = this.entity;
    const { properties = {} } = schema || {};
    const activeColumns = formFields.reduce(
      (fieldColumns, group) => [
        ...fieldColumns,
        ...group.fields.reduce(
          (activeFields, field) =>
            field.summary ? [...activeFields, field.code] : activeFields,
          []
        ),
      ],
      []
    );
    this.fields = formFields.reduce(
      (allFields, group) => [...allFields, ...group.fields],
      []
    );
    this.columnOrder =
      activeColumns.length > 0 ? activeColumns : Object.keys(properties);
    this.columns = this.columns || this.parseColumns(this.columnOrder);
    this.loadList(1);
  }

  renderFieldGroup = (group) => {
    const { fields, label } = group;
    return html`
      <mv-dropdown header theme="light">${label}</mv-dropdown>
      <mv-dropdown content theme="light">
        <ul>
          ${fields.map((item) => this.renderFieldItem(group, item))}
        </ul>
      </mv-dropdown>
    `;
  };

  renderFieldItem = (group, item) => {
    const { summary, label } = item;
    return html`
      <li>
        <mv-checkbox
          .checked="${summary}"
          @click-checkbox="${this.selectColumn(group, item)}"
          label="${label}"
        >
        </mv-checkbox>
      </li>
    `;
  };

  parseColumns = (columnOrder) => {
    return columnOrder.reduce((columnList, key) => {
      const column = this.fields.find((field) => field.code === key);
      const description = column.description || toTitleName(column.code);
      columnList.push({
        name: column.code,
        title: description,
        tooltip: description,
        type: column.fieldType,
      });
      return columnList;
    }, []);
  };

  loadList = (page) => {
    const { entity, rowsPerPage } = this;
    this.currentPage = page < 1 ? 1 : page;
    const firstRow = (this.currentPage - 1) * rowsPerPage;
    const endpointInterface = modelInterfaces(entity).LIST;
    const context = {
      config,
      firstRow,
      token: this.auth.token,
      numberOfRows: this.rowsPerPage,
      fetchFields: this.columnOrder,
      filters: this.filters,
    };
    endpointInterface.executeApiCall(
      context,
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

  newItem = (event) => {
    this.dispatchEvent(new CustomEvent("new-item"));
  };

  editRow = (event) => {
    const {
      detail: { row },
    } = event;
    this.dispatchEvent(new CustomEvent("edit-item", { detail: { row } }));
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
    this.dispatchEvent(new CustomEvent("clear-selected"));
  };

  selectRow = (event) => {
    const {
      detail: { selected },
    } = event;
    const [row] = selected || [];
    this.dispatchEvent(new CustomEvent("row-click", { detail: { row } }));
  };

  closeDialog = (name) => () => {
    this[name] = { ...EMPTY_DIALOG };
  };

  changeRowsPerPage = (event) => {
    const {
      detail: { option },
    } = event;
    this.selectedRowsPerPage = option;
    this.rowsPerPage = option.value;
    this.loadList(this.currentPage);
  };

  selectColumn = (group, field) => () => {
    const index = this.columnOrder.findIndex((column) => column === field.code);
    this.columnOrder =
      index > -1
        ? [
            ...this.columnOrder.slice(0, index),
            ...this.columnOrder.slice(index + 1),
          ]
        : [...this.columnOrder, field.code];
    const columns = this.parseColumns(this.columnOrder);
    this.columns = columns.map((column) => ({
      ...column,
      title: toTitleName(column.title),
    }));
    this.loadList(this.currentPage);
  };

  toggleFilters = () => {
    this.visibleFilters = !this.visibleFilters;
  };

  clearFilters = () => {
    this.filters = {};
    this.loadList(1);
  };

  applyFilters = (event) => {
    const {
      detail: { filters },
    } = event;
    this.filters = { ...filters };
    this.loadList(1);
  };
}

customElements.define("list-content", ListContent);
