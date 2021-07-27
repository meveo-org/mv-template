import { html } from "lit-element";
import FieldTemplate from "./FieldTemplate.js";
import "mv-input";

export default class TextField extends FieldTemplate {
  renderInput() {
    const { label, disabled, valueRequired } = this.field || {};
    return html`
      <mv-input
        type="text"
        .placeholder="${label}"
        .value="${this.value}"
        ?has-error="${this.hasError}"
        @input-change="${this.change}"
        ?disabled="${disabled}"
        ?required="${valueRequired}"
      ></mv-input>
    `;
  }
}

customElements.define("text-field", TextField);
