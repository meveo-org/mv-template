import { html, css } from "lit";
import ListPageTemplate from "../../components/page_templates/ListPageTemplate.js";

export default class ChildEntityListPage extends ListPageTemplate {
  static get properties() {
    return {
      ...super.properties,
    };
  }

  static get styles() {
    return [super.styles, css``];
  }
}

customElements.define("child-entity-list-page", ChildEntityListPage);
