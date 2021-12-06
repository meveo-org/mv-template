import { LitElement, html, css } from "lit-element";
import { NULL_ENTITY, EMPTY_DIALOG } from "utils";
import "mv-container";
import "./content/ListContent.js";
import "../../components/layout/PageLayout.js";

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
      entity: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
      auth: { type: Object, attribute: false },
      selectedRows: { type: Array, attribute: false },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.auth = null;
    this.entity = { ...NULL_ENTITY };
    this.pages = 1;
    this.currentPage = 1;
    this.rowsPerPage = DEFAULT_FILTER.rowsPerPage;
    this.rows = [];
    this.messageDialog = { ...EMPTY_DIALOG };
    this.confirmDialog = { ...EMPTY_DIALOG };
    this.filter = { DEFAULT_FILTER };
    this.selectedRows = [];
  }

  render() {
    return html`
      <page-layout>
        <mv-container>
          <list-content
            selectable
            with-checkbox
            .auth="${this.auth}"
            .entity="${this.entity}"
            .entities="${this.entities}"
            .selected-rows="${this.selectedRows}"
            @new-item="${this.newItem}"
            @edit-item="${this.editRow}"
            @row-click="${this.selectRow}"
          ></list-content>
        </mv-container>
      </page-layout>
    `;
  }

  newItem = () => {
    history.pushState(null, "", `./${this.entity.code}/new`);
  };

  editRow = (event) => {
    const {
      detail: { row },
    } = event;
    history.pushState(null, "", `./${this.entity.code}/update/${row.uuid}`);
  };

  selectRow = (event) => {
    const {
      detail: { added, removed },
    } = event;
    this.selectedRows = [
      ...this.selectedRows.filter(
        (row) =>
          !(removed || []).some((removedRow) => removedRow.uuid === row.uuid)
      ),
      ...(added || []),
    ];
  };
}

customElements.define("list-page-template", ListPageTemplate);
