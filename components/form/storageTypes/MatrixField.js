import { LitElement, html, css } from "lit-element";
import "../fieldTypes/BooleanField.js";
import "../fieldTypes/DateField.js";
import "../fieldTypes/EntityField.js";
import "../fieldTypes/TextField.js";
import "../fieldTypes/SelectField.js";

export default class MatrixField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      value: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css``;
  }

  render() {
    switch (this.field.fieldType) {
      case "BOOLEAN":
        return html`
          <boolean-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
          ></boolean-field>
        `;
      case "STRING":
        return html`
          <input-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
          ></input-field>
        `;
      case "DATE":
        return html`
          <date-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
          ></date-field>
        `;
      case "LIST":
        return html`
          <select-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
          ></select-field>
        `;
      case "ENTITY":
        return html`
          <entity-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
          ></entity-field>
        `;
      default:
        // console.error("Unsupported field");
        // console.error(`Field: ${this.field.description || this.field.code}`);
        // console.error(`Type: ${this.field.fieldType}`);
        return html``;
    }
  }
}

customElements.define("matrix-field", MatrixField);
