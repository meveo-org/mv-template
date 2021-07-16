import { LitElement, html, css } from "lit-element";
import "./storageTypes/ArrayField.js";
import "./storageTypes/SingleField.js";
// import "./storageTypes/MapField.js";
// import "./storageTypes/MatrixField.js";

export default class FormField extends LitElement {
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
    switch (this.field.storageType) {
      case "SINGLE":
        return html`
          <single-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
          ></single-field>
        `;
      case "LIST":
        return html`
          <array-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
          ></array-field>
        `;
      // case "MAP":
      //   return html`
      //     <map-field
      //       .field="${this.field}"
      //       .value="${this.value}"
      //       .errors="${this.errors}"
      //     ></map-field>
      //   `;
      // case "MATRIX":
      //   return html`
      //     <matrix-field
      //       .field="${this.field}"
      //       .value="${this.value}"
      //       .errors="${this.errors}"
      //     ></matrix-field>
      //   `;
      default:
        console.error("Unsupported field");
        console.error(`Field: ${this.field.description || this.field.code}`);
        console.error(`Type: ${this.field.fieldType}`);
        return html``;
    }
  }
}

customElements.define("form-field", FormField);
