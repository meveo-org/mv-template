import { LitElement, html, css } from "lit";
import { changeField } from "@meveo-org/mv-form/utils/index.js";
import "@meveo-org/mv-button";
import "@meveo-org/mv-form/mv-form-group.js";
import "@meveo-org/mv-input";
import "../storageTypes/SingleField.js";

export default class MapField extends LitElement {
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

      table {
        width: 100%;
      }

      .inline-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
      }

      .small-button {
        --mv-button-circle-button-size: 28px;
      }

      .key {
        padding-bottom: 10px;
        width: 30%;
      }

      .field {
        width: 60%;
      }
    `;
  }

  constructor() {
    super();
    this.field = {};
    this.value = [];
    this.entity = null;
    this.entities = {}
  }

  mapFields = (item, index) => html`
    <tr>
      <td class="key">
        <mv-input
          immediate
          .value="${item.key}"
          @input-change="${this.changeKey(index)}"
        ></mv-input>
      </td>
      <td class="field">
        <single-field
          removable
          hide-label
          hide-placeholder
          .auth="${this.auth}"
          .entity="${this.entity}"
          .entities="${this.entities}"
          .field="${this.field}"
          .value="${item.value}"
          .errors="${this.errors}"
          @update-value="${this.updateItem(index)}"
          @remove-value="${this.removeItem(index)}"
        ></single-field>
      </td>
    </tr>
  `;

  requiredIndicator = (field) => {
    const { valueRequired } = field || {};
    return valueRequired ? html`<i class="required"> *</i>` : null;
  };

  renderFieldMap = (value) => {
    const hasItems = value && value.length > 0;
    return hasItems
      ? html`
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${(value || []).map(this.mapFields)}
            </tbody>
          </table>
        `
      : html``;
  };

  render() {
    const { value, field } = this;
    const { label } = field || {};
    return html`
      <fieldset>
        <legend>
          <label>
            ${label}${this.requiredIndicator(field)}
            <mv-button
              type="circle"
              class="small-button"
              @button-clicked="${this.addItem}"
            >
              <mv-fa icon="plus"></mv-fa>
            </mv-button>
          </label>
        </legend>
        ${this.renderFieldMap(value)}
      </fieldset>
    `;
  }

  changeKey = (index) => (event) => {
    const {
      detail: { value },
    } = event;
    console.log("index: ", index);
    console.log("value: ", value);
  };

  addItem = (event) => {
    const value = [...this.value, { key: null, value: null }];
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
    const currentItem = this.value[index];
    const value = [
      ...[...this.value.slice(0, index)],
      { ...currentItem, value: detail.value },
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

customElements.define("map-field", MapField);
