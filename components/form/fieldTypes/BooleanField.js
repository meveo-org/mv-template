import { html } from "lit-element";
import { toBoolean } from "utils";
import FieldTemplate from "./FieldTemplate.js";
import "mv-button";
import "mv-checkbox";
import "mv-font-awesome";
import "mv-form-field";
export default class BooleanField extends FieldTemplate {
  static get properties() {
    return {
      value: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.value = false;
  }

  renderInput() {
    const { code, label } = this.field || {};
    const value = toBoolean(this.value);
    return html`
      <mv-checkbox
        slot="field"
        ?checked="${value}"
        @click-checkbox="${this.change}"
        label="${label}"
      ></mv-checkbox>
    `;
  }

  change = (originalEvent) => {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: !this.value + "", originalEvent },
      })
    );
  };
}

customElements.define("boolean-field", BooleanField);
