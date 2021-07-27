import { LitElement, html, css } from "lit-element";
import "mv-button";
import "mv-form-group";
import { changeField } from "mv-form-utils";
import "../storageTypes/SingleField.js";

export default class MatrixField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      value: { type: Array, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      mv-container {
        --mv-container-min-width: 620px;
        --mv-container-max-width: 620px;
        --mv-container-margin: 50px auto;
        --mv-container-padding: 20px 30px;
      }

      mv-container.location {
        --mv-container-min-width: 560px;
        --mv-container-max-width: 620px;
        --mv-container-margin: 0;
        --mv-container-padding: 20px 30px;
      }

      textarea {
        width: 80%;
        min-height: 50px;
        border: 1px solid black;
        margin: 0;
        padding: 5px;
        border-radius: 5px;
        resize: none;
      }

      button,
      label {
        font-size: 1em;
        font-weight: bold;
        color: #4e686d;
      }

      label .required {
        font-style: normal;
        color: #ff0000;
      }

      fieldset {
        margin: 0 auto 10px auto;
        border-radius: 5px;
      }

      .inline-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
      }

      .small-button {
        --mv-button-circle-button-size: 28px;
      }
    `;
  }

  constructor() {
    super();
    this.field = {};
    this.value = [];
  }

  render() {
    const { value, field } = this;
    const { label, valueRequired } = field || {};
    return html`
      <fieldset>
        <legend>
          <label>
            ${label}${valueRequired ? html`<i class="required"> *</i>` : null}
            <mv-button
              type="circle"
              class="small-button"
              @button-clicked="${this.addItem}"
            >
              <mv-fa icon="plus"></mv-fa>
            </mv-button>
          </label>
        </legend>
        ${(value || []).map(
          (itemValue, index) => html`
            <single-field
              removable
              .field="${this.field}"
              .value="${itemValue}"
              .errors="${this.errors}"
              @update-value="${this.updateItem(index)}"
              @remove-value="${this.removeItem(index)}"
            ></single-field>
          `
        )}
      </fieldset>
    `;
  }

  addItem = (event) => {
    const value = [...this.value, null];
    changeField(event.target, {
      name: this.field.code,
      originalEvent: event,
      value,
    });
  };

  removeItem = (index) => (event) => {
    const { target } = event;
    const value = [
      ...[...this.value.slice(0, index)],
      ...[...this.value.slice(index + 1)],
    ];
    changeField(target, {
      name: this.field.code,
      validateGroup: true,
      originalEvent: event,
      value,
    });
  };

  updateItem = (index) => (event) => {
    const { detail } = event;
    const value = [
      ...[...this.value.slice(0, index)],
      detail.value,
      ...[...this.value.slice(index + 1)],
    ];
    changeField(detail.originalEvent.target, {
      name: this.field.code,
      validateGroup: true,
      originalEvent: event,
      value,
    });
  };
}

customElements.define("matrix-field", MatrixField);
