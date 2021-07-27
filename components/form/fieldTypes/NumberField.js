import { html } from "lit-element";
import { matchError } from "mv-form-utils";
import FieldTemplate from "./FieldTemplate.js";
import "mv-button";
import "mv-font-awesome";
import "mv-form-field";
import "mv-spinner";

export default class NumberField extends FieldTemplate {
  static get properties() {
    return {
      value: { type: Number },
      step: { type: Number },
      min: { type: Number },
      max: { type: Number },
      precision: { type: Number },
    };
  }

  constructor() {
    super();
    this.step = 1;
    this.precision = 0;
    this.min = undefined;
    this.max = undefined;
  }

  renderInput() {
    const { field, value, step, min, max, precision } = this;
    const { code, label, valueRequired, disabled } = field || {};
    const error = matchError(this.errors, code);

    return html`
      <mv-spinner
        name="${code}"
        step="${step}"
        min="${min}"
        max="${max}"
        precision="${precision}"
        placeholder="${label}"
        .value="${value}"
        ?hasError="${error}"
        ?disabled="${disabled}"
        ?required="${valueRequired}"
        @spinner-change="${this.change}"
      ></mv-spinner>
    `;
  }
}

customElements.define("number-field", NumberField);
