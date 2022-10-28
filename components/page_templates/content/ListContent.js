import { LitElement, html, css } from "lit";
import { modelEndpoints } from "../../../service/Endpoint.js";
import * as config from "../../../config.js";
import { NULL_ENTITY, EMPTY_DIALOG, toTitleName } from "../../../utils/index.js";
import "@meveo-org/mv-button";
import "@meveo-org/mv-dialog";
import "@meveo-org/mv-dropdown";
import "@meveo-org/mv-font-awesome";
import "@meveo-org/mv-pagination";
import "@meveo-org/mv-table";
import "@meveo-org/mv-tooltip";
import "@meveo-org/mv-select";
import "../../../components/TableActions.js";

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
      noListActions: { type: Boolean, attribute: "no-list-actions" },
      selectOne: { type: Boolean, attribute: "select-one" },
      "selected-rows": { type: Array, attribute: false },
      withCheckbox: { type: Boolean, attribute: "with-checkbox" },
      noNewButton: { type: Boolean, attribute: "no-new-button" },
      noRowsPerPage: { type: Boolean, attribute: "no-rows-per-page" },
      entity: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
      permissions: { type: Object, attribute: false },
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
      sortOrder: { type: Object },
      rowActions: { type: Array, attribute: false },
      listActions: { type: Array, attribute: false },
    };
  }

  static get styles() {
    return css`
      h1 {
        margin-top: 0;
      }

      mv-table {
        --mv-table-row-cursor: pointer;
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

      .action-loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .action-loader .message {
        margin-bottom: 2rem;
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

      .custom-actions mv-dropdown {
        --mv-dropdown-trigger-height: 4rem;
      }

      .custom-actions ul {
        padding: 0;
        margin: 0.3rem 0;
      }

      .custom-actions li {
        display: block;
        width: calc(100% - 2rem);
        padding: 1rem;
        white-space: nowrap;
        cursor: pointer;
      }

      .custom-actions li:hover {
        list-style: none;
        display: block;
        background: #1d9bc9;
        color: #ffffff;
      }

      .table-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }

  constructor() {
    super();
    this.config = config;
    this.auth = null;
    this.selectable = false;
    this.selectOne = false;
    this.noListActions = false;
    this.noNewButton = false;
    this.noRowsPerPage = false;
    this.entity = { ...NULL_ENTITY };
    this.entities = {};
    this.pages = 1;
    this.currentPage = 1;
    this.rowsPerPage = ROWS_PER_PAGE[0].value;
    this.selectedRowsPerPage = ROWS_PER_PAGE[0];
    this.rows = [];
    this.fields = [];
    this.columnOrder = [];
    this.visibleFilters = false;
    this.messageDialog = { ...EMPTY_DIALOG };
    this.confirmDialog = { ...EMPTY_DIALOG };
    this.filters = {};
    this.actionColumn = {
      getActionComponent: (row, rowActions) => html`
        <table-actions
          .row="${row}"
          .row-actions="${rowActions}"
          @edit="${this.editRow}"
          @delete="${this.confirmDelete}"
          @run-action="${this.runAction}"
        ></table-actions>
      `,
    };
    this.rowActions = [];
    this.listActions = [];
    this["selected-rows"] = [];
  }

  render() {
    const { entity, rowActions } = this;
    const { formFields } = entity;

    return html`
      <div>
        <h1>${this.entity.label}</h1>
        <div class="action-section">
          <div>${this.renderNewButton()}</div>
          <div class="right">
            ${this.renderRowsPerPage()}
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
          sortable
          .columns="${this.columns || []}"
          .rows="${this.rows}"
          .action-column="${this.actionColumn}"
          .row-actions="${rowActions}"
          .sort-order="${this.sortOrder}"
          .selected-rows="${this["selected-rows"]}"
          ?selectable="${this.selectable}"
          ?select-one="${this.selectOne}"
          ?with-checkbox="${this.withCheckbox}"
          @select-row="${this.selectRow}"
          @column-sort="${this.sortTable}"
        ></mv-table>
        <div class="table-actions">
          <div class="custom-actions">
            ${this.noListActions ? null : this.renderListCustomActions()}
          </div>
          <div class="pagination-actions">
            <mv-pagination
              type="text"
              .page="${this.currentPage}"
              .pages="${this.pages}"
              @change-page="${this.gotoPage}"
            ></mv-pagination>
          </div>
        </div>
      </div>
      <mv-dialog
        class="message-dialog dialog-size"
        header-label="${this.messageDialog.title}"
        ?open="${this.messageDialog.open}"
        ?closeable="${this.messageDialog.closable}"
        ?no-right-button="${this.messageDialog.noButtons}"
        @ok-dialog="${this.closeDialog("messageDialog")}"
        no-left-button
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

  renderNewButton = () =>
    this.noNewButton
      ? null
      : html`
          <mv-button type="rounded" @button-clicked="${this.newItem}">
            <mv-fa icon="plus"></mv-fa>New
          </mv-button>
        `;

  renderRowsPerPage = () =>
    this.noRowsPerPage
      ? null
      : html`
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
        `;

  renderListCustomActions = () => {
    const { listActions } = this;
    if (listActions && listActions.length > 0) {
      return html`
        <mv-dropdown
          container
          toggle
          justify="left"
          position="bottom"
          theme="light"
        >
          <mv-dropdown trigger>
            <mv-button>
              More actions <mv-fa icon="chevron-down"></mv-fa>
            </mv-button>
          </mv-dropdown>
          <mv-dropdown content theme="light">
            <ul>
              ${this.renderCustomAction(listActions)}
            </ul>
          </mv-dropdown>
        </mv-dropdown>
      `;
    }
    return html``;
  };

  renderCustomAction = (listActions) =>
    listActions.map(
      (action) => html`
        <li @click="${this.runListAction(action)}">${action.label}</li>
      `
    );

  connectedCallback() {
    super.connectedCallback();
    const { formFields, schema, actions } = this.entity;
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
    this.rowActions = actions.filter(
      (action) => action.applicableToEntityInstance
    );
    this.listActions = actions.filter(
      (action) => action.applicableToEntityList
    );
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
    return columnOrder.reduce((columnList, columnCode) => {
      const column = this.fields.find((field) => field.code === columnCode);
      if (column) {
        const description = column.description || toTitleName(columnCode);
        const hasListValues =
          column.listValues && Object.keys(column.listValues).length > 0;
        const hasMatrixColumns =
          column.matrixColumns && column.matrixColumns.length > 0;
        const columnProperties = {
          name: column.code,
          code: column.code,
          title: description,
          tooltip: description,
          type: column.fieldType,
          fieldType: column.fieldType,
          storageType: column.storageType,
          filter: column.filter,
          disabled: column.disabled,
        };
        if (hasListValues) {
          columnProperties.options = Object.keys(column.listValues).map(
            (key) => ({
              label: column.listValues[key],
              value: key,
            })
          );
        }
        if (hasMatrixColumns) {
          columnProperties.options = column.matrixColumns;
        }

        columnList.push(columnProperties);
      }
      return columnList;
    }, []);
  };

  loadList = (page) => {
    const { filters, sortOrder, entity, rowsPerPage, columnOrder } = this;
    this.currentPage = page < 1 ? 1 : page;
    const firstRow = (this.currentPage - 1) * rowsPerPage;
    const endpoint = modelEndpoints(entity).LIST;
    const context = {
      config,
      firstRow,
      token: this.auth.token,
      numberOfRows: rowsPerPage,
      fetchFields: columnOrder,
    };
    if (filters && Object.keys(filters).length > 0) {
      context.filters = filters;
    }
    if (sortOrder) {
      const [sortField] = Object.keys(this.sortOrder);
      context.sortField = sortField;
      context.ordering = this.sortOrder[sortField];
    }
    endpoint.executeApiCall(context, this.retrieveSuccess, this.handleErrors);
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
    const { name, message } = error;
    let messageContent = null;
    if (Array.isArray(message)) {
      const [messageText, statusCode] = message;
      messageContent = html`
        <span>${messageText}</span><br />
        <small>${statusCode}</small>
      `;
    } else {
      messageContent = html`<span>${message}</span>`;
    }

    this.messageDialog = {
      title: name || "Error",
      message: messageContent,
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
    const endpoint = modelEndpoints(this.entity).DELETE;
    endpoint.executeApiCall(
      {
        token: this.auth.token,
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
    const { detail } = event;
    this.dispatchEvent(new CustomEvent("row-click", { detail }));
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

  selectColumn = (_, field) => () => {
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

  sortTable = (event) => {
    const {
      detail: { column, order },
    } = event;
    this.sortOrder = { [column.name]: order };
    this.loadList(this.currentPage);
  };

  runAction = (event) => {
    const {
      detail: { row, action },
    } = event;
    const { uuid } = row;
    this.showLoader(action);
    const endpoint = modelEndpoints(this.entity).CUSTOM_ACTION;
    endpoint.executeApiCall(
      {
        token: this.auth.token,
        config,
        actionCode: action.code,
        runWith: { entities: [{ code: this.entity.code, uuid }] },
      },
      this.actionSuccess(action),
      this.handleErrors
    );
  };

  runListAction = (action) => () => {
    this.showLoader(action);
    const { code } = this.entity;
    const endpoint = modelEndpoints(this.entity).CUSTOM_ACTION;
    const entities =
      this["selected-rows"].map(({ uuid }) => ({ code, uuid })) || [];
    if (entities.length > 0) {
      endpoint.executeApiCall(
        {
          token: this.auth.token,
          config,
          actionCode: action.code,
          runWith: { entities },
        },
        this.actionSuccess(action),
        this.handleErrors
      );
    } else {
      this.messageDialog = {
        title: "Error",
        message: html`
          <span> Cannot run custom action. No items selected. </span>
        `,
        open: true,
      };
    }
  };

  actionSuccess = (action) => () => {
    this.messageDialog = {
      title: "Action Success",
      message: html`<span>${action.label} successfully executed.</span>`,
      open: true,
    };
    this.loadList(this.currentPage);
    this.dispatchEvent(new CustomEvent("clear-selected"));
  };

  showLoader = (action) => {
    this.messageDialog = {
      title: "Loading",
      message: html`
        <div class="action-loader">
          <div class="message">Invoking ${action.label} action.</div>
          <mv-fa icon="spinner" icon-props="fa-2x fa-pulse"></mv-fa>
        </div>
      `,
      open: true,
      closable: false,
      noButtons: true,
    };
  };
}

customElements.define("list-content", ListContent);
