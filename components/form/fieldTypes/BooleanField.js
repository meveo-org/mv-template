import { html } from "lit";
import { toBoolean } from "../../../utils/index.js";
import FieldTemplate from "./FieldTemplate.js";
import "@meveo-org/mv-button";
import "@meveo-org/mv-checkbox";
import "@meveo-org/mv-font-awesome";
import "@meveo-org/mv-form/mv-form-field.js";

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
