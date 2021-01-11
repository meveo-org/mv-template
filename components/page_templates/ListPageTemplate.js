import { LitElement, html, css } from "lit-element";
import { modelInterfaces } from "../../service/EndpointInterface.js";
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
import "./content/ListContent.js";
import "../../components/TableActions.js";
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
      entity: { type: Object, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
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
      <page-layout>
        <list-content
          .entity="${this.entity}"
          @new-item="${this.newItem}"
          @edit-item="${this.editRow}"
        ></list-content>
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
}

customElements.define("list-page-template", ListPageTemplate);
