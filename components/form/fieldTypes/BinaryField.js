import { html } from "lit-element";
import "mv-file-upload";
import FieldTemplate from "./FieldTemplate.js";

export default class BinaryField extends FieldTemplate {
  static get properties() {
    return {
      ...super.properties,
      multiple: { type: Boolean },
      buttonLabel: { type: String, attribute: "button-label" },
    };
  }

  constructor() {
    super();
    this.multiple = false;
    this.buttonLabel = "Add File";
  }

  renderInput() {
    const { multiple, buttonLabel, field } = this;
    const { label, contentTypes, disabled, valueRequired } = field || {};
    console.log("field: ", field);
    return html`
      <mv-file-upload
        ?multiple="${multiple}"
        file-types="${contentTypes || "*"}"
        label="${label}"
        button-label="${buttonLabel}"
        @update-files="${this.change}"
      >
      </mv-file-upload>
    `;
  }

  change = (originalEvent) => {
    const { detail } = originalEvent;
    console.log("detail: ", detail);
    const value =
      (this.multiple ? detail.files : (detail.files || [])[0]) || null;
    console.log("value: ", value);
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value, originalEvent },
      })
    );
  };
}

customElements.define("binary-field", BinaryField);
