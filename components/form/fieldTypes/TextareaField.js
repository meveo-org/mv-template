import { html } from "lit-element";
import FieldTemplate from "./FieldTemplate.js";
import "mv-textarea";

export default class TextareaField extends FieldTemplate {
  renderInput() {
    const { label, disabled, valueRequired } = this.field || {};
    return html`
      <mv-textarea
        .placeholder="${label}"
        .value="${this.value}"
        ?has-error="${this.hasError}"
        ?required="${valueRequired}"
        ?disabled="${disabled}"
        @textarea-change="${this.change}"
      ></mv-textarea>
    `;
  }
}

customElements.define("textarea-field", TextareaField);
