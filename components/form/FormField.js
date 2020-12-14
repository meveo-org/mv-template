import { LitElement, html, css } from "lit-element";
import "./DateField.js";
import "./EntityField.js";
import "./InputField.js";
import "./SelectField.js";

export default class FormField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      value: { type: Object, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css``;
  }

  render() {
    switch (this.field.type) {
      case "STRING":
        return html`<input-field
          .field="${this.field}"
          .value="${this.value}"
        ></input-field>`;
      case "DATE":
        return html`<date-field
          .field="${this.field}"
          .value="${this.value}"
        ></date-field>`;
      case "LIST":
        return html`<select-field
          .field="${this.field}"
          .value="${this.value}"
        ></select-field>`;
      case "ENTITY":
        return html`<entity-field
          .field="${this.field}"
          .value="${this.value}"
        ></entity-field>`;
      default:
        console.error("Unsupported field");
        console.error(`Field: ${this.field.description || this.field.code}`);
        console.error(`Type: ${this.field.type}`);
        return html``;
    }
  }
}

customElements.define("form-field", FormField);
