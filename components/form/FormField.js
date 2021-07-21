import { LitElement, html, css } from "lit-element";
import { changeField } from "mv-form-utils";
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
            @update-value="${this.updateValue}"
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
        const field = `Field: ${this.field.description || this.field.code}`;
        const type = `Storage Type: ${this.field.storageType}`;
        const error = `Unsupported Storage Type:\n\t${field}\n\t${type}`;
        console.error(error);
        return html``;
    }
  }

  updateValue = (event) => {
    const { code } = this.field;
    changeField(event.target, {
      ...event.detail,
      name: code,
      originalEvent: event,
    });
  };
}

customElements.define("form-field", FormField);
