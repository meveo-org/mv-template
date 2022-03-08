import { LitElement, html, css } from "lit";
import "../fieldTypes/BinaryField.js";
import "../fieldTypes/BooleanField.js";
import "../fieldTypes/DateField.js";
import "../fieldTypes/EntityField.js";
import "../fieldTypes/TextField.js";
import "../fieldTypes/TextareaField.js";
import "../fieldTypes/SelectField.js";
import "../fieldTypes/NumberField.js";

export default class SingleField extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      entity: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
      field: { type: Object, attribute: false },
      value: { type: Object, attribute: false },
      errors: { type: Array, attribute: false },
      removable: { type: Boolean },
      hideLabel: { type: Boolean, attribute: "hide-label" },
      hidePlaceholder: { type: Boolean, attribute: "hide-placeholder" },
      hideError: { type: Boolean, attribute: "hide-error" },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.removable = false;
    this.hideLabel = false;
    this.hideError = false;
    this.hidePlaceholder = false;
    this.entity = null;
    this.entities = {};
  }

  render() {
    switch (this.field.fieldType) {
      case "BINARY":
        return html`
          <binary-field
            hide-placeholder
            .auth=${this.auth}
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            ?hide-label="${this.hideLabel}"
            ?hide-error="${this.hideError}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></binary-field>
        `;
      case "BOOLEAN":
        return html`
          <boolean-field
            hide-label
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            ?hide-error="${this.hideError}"
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
            ?hide-label="${this.hideLabel}"
            ?hide-placeholder="${this.hidePlaceholder}"
            ?hide-error="${this.hideError}"
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
            ?hide-label="${this.hideLabel}"
            ?hide-placeholder="${this.hidePlaceholder}"
            ?hide-error="${this.hideError}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></date-field>
        `;
      case "DOUBLE":
        return html`
          <number-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            precision="2"
            step="0.01"
            ?removable="${this.removable}"
            ?hide-label="${this.hideLabel}"
            ?hide-placeholder="${this.hidePlaceholder}"
            ?hide-error="${this.hideError}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></number-field>
        `;
      case "LIST":
        return html`
          <select-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            ?hide-label="${this.hideLabel}"
            ?hide-placeholder="${this.hidePlaceholder}"
            ?hide-error="${this.hideError}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></select-field>
        `;
      case "LONG":
        return html`
          <number-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            ?hide-label="${this.hideLabel}"
            ?hide-placeholder="${this.hidePlaceholder}"
            ?hide-error="${this.hideError}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></number-field>
        `;
      case "ENTITY":
      case "CHILD_ENTITY":
        const entity = this.entities[this.field.name];
        return html`
          <entity-field
            .auth=${this.auth}
            .entity="${entity}"
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            ?hide-label="${this.hideLabel}"
            ?hide-placeholder="${this.hidePlaceholder}"
            ?hide-error="${this.hideError}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></entity-field>
        `;
      case "LONG_TEXT":
      case "TEXT_AREA":
        return html`
          <textarea-field
            .field="${this.field}"
            .value="${this.value}"
            .errors="${this.errors}"
            ?removable="${this.removable}"
            ?hide-label="${this.hideLabel}"
            ?hide-placeholder="${this.hidePlaceholder}"
            ?hide-error="${this.hideError}"
            @change="${this.updateValue}"
            @remove="${this.removeValue}"
          ></textarea-field>
        `;
      default:
        const field = `Field: ${this.field.description || this.field.code}`;
        const type = `Type: ${this.field.fieldType}`;
        const error = `Unsupported Single Field:\n\t${field}\n\t${type}`;
        console.error(error);
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
