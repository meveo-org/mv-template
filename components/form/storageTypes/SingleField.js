import { LitElement, html, css } from "lit-element";
import "../fieldTypes/BooleanField.js";
import "../fieldTypes/DateField.js";
// import "../fieldTypes/EntityField.js";
import "../fieldTypes/TextField.js";
import "../fieldTypes/SelectField.js";

export default class SingleField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      value: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      removable: { type: Boolean },
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
            ?removable="${this.removable}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></boolean-field>
        `;
      case "STRING":
        return html`
          <text-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></text-field>
        `;
      case "DATE":
        return html`
          <date-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></date-field>
        `;
      case "LIST":
        return html`
          <select-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></select-field>
        `;
      // case "ENTITY":
      //   return html`
      //     <entity-field
      //       .field="${this.field}"
      //       .value="${this.value}"
      //       .errors="${this.errors}"
      //       ?removable="${this.removable}"
      //       @change="${this.updateValue}"
      //       @remove="${this.removeValue}"
      //     ></entity-field>
      //   `;
      default:
        console.error("Unsupported field");
        console.error(`Field: ${this.field.description || this.field.code}`);
        console.error(`Type: ${this.field.fieldType}`);
        return html``;
    }
  }

  updateValue = (event) => {
    const { detail } = event;
    const { value, originalEvent } = detail || {};
    this.dispatchEvent(
      new CustomEvent("update-value", { detail: { value, originalEvent } })
    );
  };

  removeValue = () => {
    this.dispatchEvent(new CustomEvent("remove-value"));
  };
}

customElements.define("single-field", SingleField);
