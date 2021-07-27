import { html, css } from "lit-element";
import FieldTemplate from "./FieldTemplate.js";
import "mv-select";

export default class SelectField extends FieldTemplate {
  static get properties() {
    return {
      options: { type: Array, attribute: false, reflect: true },
      selected: { type: Object, attribute: false, reflect: true },
      value: { type: String, attribute: true, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        --button-size: 24px;
      }

      mv-select {
        --mv-select-width: 100%;
        --mv-select-font-size: 16px;
        --mv-select-input-padding: 6.25px;
        --mv-select-width: calc(100% - var(--button-size));
      }

      mv-button {
        --mv-button-margin: 0 0 0 5px;
        --mv-button-padding: 3px 4px;
        --mv-button-min-width: var(--button-size);
      }

      .field {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .input {
        --mv-select-width: calc(100% - var(--button-size));
        width: calc(100% - var(--button-size));
        padding-top: 3px;
        position: relative;
      }
      .button {
        height: var(--button-size);
      }
    `;
  }

  constructor() {
    super();
    this.selected = {};
    this.options = [];
  }

  renderInput() {
    const { label } = this.field;
    return html`
      <mv-select
        slot="field"
        placeholder="${label}"
        .value="${this.selected}"
        .options="${this.options}"
        @select-option="${this.change}"
        @on-clear="${this.clearValue}"
      ></mv-select>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const { listValues } = this.field;
    this.options = Object.keys(listValues).map((key) => ({
      label: listValues[key],
      value: key,
    }));
    if (this.value) {
      this.selected = this.options.find(
        (option) => option.value === this.value
      );
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      if (!!newValue) {
        this.selected = this.options.find(
          (option) => option.value === this.value
        );
      } else {
        this.selected = {};
      }
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  clearValue = (event) => {
    const {
      detail: { originalEvent },
    } = event;
    this.dispatchEvent(
      new CustomEvent("change", { detail: { value: null, originalEvent } })
    );
  };

  change = (originalEvent) => {
    const {
      detail: {
        option: { value },
      },
    } = originalEvent;
    this.dispatchEvent(
      new CustomEvent("change", { detail: { value, originalEvent } })
    );
  };
}

customElements.define("select-field", SelectField);
