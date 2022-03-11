import { LitElement, html, css } from "lit";
import { changeField } from "@meveo-org/mv-form/utils/index.js";
import "./storageTypes/ArrayField.js";
import "./storageTypes/SingleField.js";
import "./storageTypes/MapField.js";
import "./storageTypes/MatrixField.js";

export default class FormField extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      entity: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
      field: { type: Object, attribute: false },
      value: { type: Object, attribute: false },
      errors: { type: Array, attribute: false },
    };
  }

  static get styles() {
    return css``;
  }

  render() {
    const { auth, entity, entities, field, value, errors } = this;
    switch (field.storageType) {
      case "SINGLE":
        return html`
          <single-field
            .auth=${auth}
            .entity="${entity}"
            .entities="${entities}"
            .field="${field}"
            .value="${value}"
            .errors="${errors}"
            @update-value="${this.updateValue}"
          ></single-field>
        `;
      case "LIST":
        return html`
          <array-field
            .auth=${auth}
            .entity="${entity}"
            .entities="${entities}"
            .field="${field}"
            .value="${value}"
            .errors="${errors}"
          ></array-field>
        `;
      case "MAP":
        return html`
          <map-field
            .auth=${auth}
            .entity="${entity}"
            .entities="${entities}"
            .field="${field}"
            .value="${value}"
            .errors="${errors}"
          ></map-field>
        `;
      case "MATRIX":
        return html`
          <matrix-field
            .auth=${auth}
            .entity="${entity}"
            .entities="${entities}"
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
