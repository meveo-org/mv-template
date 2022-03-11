import { LitElement, html, css } from "lit";
import { changeField, matchError } from "@meveo-org/mv-form/utils/index.js";
import "@meveo-org/mv-button";
import "@meveo-org/mv-form/mv-form-group.js";
import "../storageTypes/SingleField.js";

export default class ArrayField extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      entity: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
      field: { type: Object, attribute: false },
      errors: { type: Array, attribute: false },
      value: { type: Array, attribute: false },
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
    this.entity = null;
    this.entities = {};
    this.errors = null;
    this.field = {};
    this.value = [];
  }

  render = () => {
    const { field } = this;
    const { label } = field || {};
    return html`
      <label>
        ${label}${this.renderRequired(field)}
        <mv-button
          type="circle"
          class="small-button"
          @button-clicked="${this.addItem}"
        >
          <mv-fa icon="plus"></mv-fa>
        </mv-button>
      </label>
      ${this.renderFieldGroup()}
    `;
  };

  renderRequired = ({ valueRequired }) =>
    valueRequired ? html`<i class="required"> *</i>` : null;

  renderFieldGroup = () => html`
    <mv-form-group/mv-form-group.js
      name="${this.field.code}"
      .values="${this.value}"
      .error="${matchError(this.errors, this.field.code)}"
    >
      ${this.renderFields()}
    </mv-form-group/mv-form-group.js>
  `;

  renderFields = () =>
    (this.value || []).map(
      (itemValue, index) => html`
        <single-field
          removable
          hide-label
          hide-error
          .auth="${this.auth}"
          .entity="${this.entity}"
          .entities="${this.entities}"
          .field="${this.field}"
          .value="${itemValue}"
          .errors="${this.errors}"
          @update-value="${this.updateItem(index)}"
          @remove-value="${this.removeItem(index)}"
        ></single-field>
      `
    );

  addItem = (event) => {
    const { value = [] } = this;
    const newValue = [...value, null];
    changeField(event.target, {
      name: this.field.code,
      originalEvent: event,
      value: newValue,
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

customElements.define("array-field", ArrayField);
