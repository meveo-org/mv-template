import { html, css } from "lit";
import FieldTemplate from "./FieldTemplate.js";
import "@meveo-org/mv-select";

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
      mv-select {
        --mv-select-font-size: 16px;
        --mv-select-input-padding: 6.25px;
        --mv-select-width: calc(100% - 15px);
      }

      mv-button {
        --mv-button-margin: 0 0 0 5px;
        --mv-button-padding: 3px 4px;
        --mv-button-min-width: 24px;
      }
    `;
  }

  constructor() {
    super();
    this.selected = {};
    this.options = [];
  }

  renderInput() {
    return html`
      <mv-select
        slot="field"
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
