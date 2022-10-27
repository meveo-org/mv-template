import { html } from "lit";
import "@meveo-org/mv-container";
import "../layout/PageLayout.js";
import UpdateContent from "./content/UpdateContent.js";

export default class UpdatePageTemplate extends UpdateContent {
  render() {
    return html`<mv-container>${super.render()}</mv-container>`;
  }

  cancelCallback = () => {
    window.goto(`${config.BASE_PATH}/${this.entity.code}/list`)
    history.pushState(null, "", `${config.BASE_PATH}/${this.entity.code}/list`);
  };
}

customElements.define("update-page-template", UpdatePageTemplate);
