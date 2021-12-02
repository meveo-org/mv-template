import { html } from "lit-element";
import "../layout/PageLayout.js";
import UpdateContent from "./content/UpdateContent.js";

export default class UpdatePageTemplate extends UpdateContent {
  render() {
    return html`<page-layout>${super.render()}</page-layout>`;
  }

  cancelCallback = () => {
    history.pushState(null, "", `./${this.entity.code}/list`);
  };
}

customElements.define("update-page-template", UpdatePageTemplate);
