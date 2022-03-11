import { html } from "lit";
import "@meveo-org/mv-container";
import "../layout/PageLayout.js";
import NewContent from "./content/NewContent.js";

export default class NewPageTemplate extends NewContent {
  render() {
    return html`<mv-container>${super.render()}</mv-container>`;
  }

  cancelCallback = () => {
    history.pushState(null, "", `./${this.entity.code}/list`);
  };

  successCallback = (event) => {
    history.pushState(null, "", `./${this.entity.code}/list`);
  };
}

customElements.define("new-page-template", NewPageTemplate);
