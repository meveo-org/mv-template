import { html, css } from "lit-element";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-pagination";
import "mv-table";
import "mv-tooltip";
import "../../components/layout/PageLayout.js";
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

  render() {
    return html`<page-layout> ${super.render()} </page-layout>`;
  }
}

customElements.define("demo-list-page", DemoListPage);
