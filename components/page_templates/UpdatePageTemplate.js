import { html } from "lit-element";
import "mv-container";
import "../layout/PageLayout.js";
import UpdateContent from "./content/UpdateContent.js";

export default class UpdatePageTemplate extends UpdateContent {
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
}

customElements.define("update-page-template", UpdatePageTemplate);
