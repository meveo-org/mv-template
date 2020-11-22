import { css } from "lit-element";
import * as config from "config";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../../components/layout/PageLayout.js";
import "../../components/page_templates/ListPageTemplate.js";
import ListPageTemplate from "../../components/page_templates/ListPageTemplate.js";
import EndpointInterface from "../../service/EndpointInterface.js";

export default class DemoListPage extends ListPageTemplate {
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
    const endpointInterface = new EndpointInterface("Demo", "GET", "LIST");
    endpointInterface.executeApiCall(
      this,
      {
        noAuth: true,
        config,
        firstRow: 0,
        numberOfRows: 20,
        fetchFields: this.columns,
      },
      this.submitSuccess,
      this.submitFailed
    );
  };

  submitSuccess = (event) => {
    const {
      detail: { result },
    } = event;
    this.rows = result;
  };

  submitFailed = (event) => {
    const {
      detail: { error },
    } = event;
    console.log("error: ", error);
  };
}

customElements.define("demo-list-page", DemoListPage);
