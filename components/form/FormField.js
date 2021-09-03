import { LitElement, html, css } from "lit-element";
import { changeField } from "mv-form-utils";
import "./storageTypes/ArrayField.js";
import "./storageTypes/SingleField.js";
import "./storageTypes/MapField.js";
import "./storageTypes/MatrixField.js";

export default class FormField extends LitElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false },
      field: { type: Object, attribute: false },
      value: { type: Object, attribute: false },
      errors: { type: Array, attribute: false },
    };
  }

  static get styles() {
    return css``;
  }

  render() {
    const { field, value, errors } = this;
    switch (field.storageType) {
      case "SINGLE":
        return html`
          <single-field
            .entity="${this.entity}"
            .field="${field}"
            .value="${value}"
            .errors="${errors}"
            @update-value="${this.updateValue}"
          ></single-field>
        `;
      case "LIST":
        return html`
          <array-field
            .entity="${this.entity}"
            .field="${field}"
            .value="${value}"
            .errors="${errors}"
          ></array-field>
        `;
      case "MAP":
        return html`
          <map-field
            .entity="${this.entity}"
            .field="${field}"
            .value="${value}"
            .errors="${errors}"
          ></map-field>
        `;
      case "MATRIX":
        return html`
          <matrix-field
            .entity="${this.entity}"
            .field="${field}"
            .value="${value}"
            .errors="${errors}"
          ></matrix-field>
        `;
      default:
        console.error("Unsupported field: ", field);
        return html`
          <div>
            <div>Field: ${field.code}</div>
            <div>Field Type: ${field.fieldType}</div>
            <div>Storage Type: ${field.storageType}</div>
          </div>
        `;
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
