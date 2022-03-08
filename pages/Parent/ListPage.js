import { css } from "lit";
import ListPageTemplate from "../../components/page_templates/ListPageTemplate.js";

export default class ParentEntityListPage extends ListPageTemplate {
  static get properties() {
    return {
      ...super.properties,
    };
  }

  static get styles() {
    return [super.styles, css``];
  }
}

customElements.define("parent-entity-list-page", ParentEntityListPage);
