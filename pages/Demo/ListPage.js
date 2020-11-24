import { css } from "lit-element";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../../components/layout/PageLayout.js";
import "../../components/page_templates/ListPageTemplate.js";
import ListPageTemplate from "../../components/page_templates/ListPageTemplate.js";

export default class DemoListPage extends ListPageTemplate {
  static get properties() {
    return {
      ...super.properties,
    };
  }

  static get styles() {
    return [super.styles, css``];
  }
}

customElements.define("demo-list-page", DemoListPage);
