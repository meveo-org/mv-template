import { html } from "lit";
import "@meveo-org/mv-container";
import "../layout/PageLayout.js";
import NewContent from "./content/NewContent.js";

export default class NewPageTemplate extends NewContent {
  render() {
    return html`
      <page-layout
        .entities="${this.entities}"
        .permissions="${this.permissions}"
      >
        <mv-container>${super.render()}</mv-container>
      </page-layout>
    `;
  }

  cancelCallback = () => {
    history.pushState(null, "", `./${this.entity.code}/list`);
  };

  successCallback = (event) => {
    history.pushState(null, "", `./${this.entity.code}/list`);
  };
}

customElements.define("new-page-template", NewPageTemplate);
