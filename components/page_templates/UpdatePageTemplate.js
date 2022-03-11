import { html } from "lit";
import "@meveo-org/mv-container";
import "../layout/PageLayout.js";
import UpdateContent from "./content/UpdateContent.js";

export default class UpdatePageTemplate extends UpdateContent {
  render() {
    return html`<mv-container>${super.render()}</mv-container>`;
  }

  cancelCallback = () => {
    history.pushState(null, "", `./${this.entity.code}/list`);
  };
}

customElements.define("update-page-template", UpdatePageTemplate);
