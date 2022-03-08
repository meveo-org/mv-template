import { html, css } from "lit";
import FieldTemplate from "./FieldTemplate.js";
import "@meveo-org/mv-textarea";

export default class TextareaField extends FieldTemplate {
  static get styles() {
    return css`
      :host {
        --mv-textarea-width: calc(100% - 18px);
      }
    `;
  }
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
