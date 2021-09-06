import { html } from "lit-element";
import "../layout/PageLayout.js";
import NewContent from "./content/NewContent.js";

export default class NewPageTemplate extends NewContent {
  render() {
    return html`
      <page-layout>${super.render()}</page-layout>
    `;
  }

  cancelCallback = () => {
    history.pushState(null, "", `./${this.entity.code}/list`);
  };

  successCallback = (event) => {
    const {
      detail: { result },
    } = event;
    const [{ uuid }] = result;
    history.pushState(null, "", `./${this.entity.code}/update/${uuid}`);
  };
}

customElements.define("new-page-template", NewPageTemplate);
