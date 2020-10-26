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
import "../../components/page_templates/ListPageTemplate.js";
import ListPageTemplate from "../../components/page_templates/ListPageTemplate.js";

export default class ListPage extends ListPageTemplate {
  static get properties() {
    return {
      ...super.properties,
    };
  }

  static get styles() {
    return [super.styles, css``];
  }

  constructor() {
    super();
  }

  loadList = (page) => {
    this.rows = [];
    this.pages = 1;
    this.currentPage = page;
  };
}

customElements.define("demo-list-page", ListPage);
