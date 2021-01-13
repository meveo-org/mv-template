import { LitElement, html, css } from "lit-element";
import { changeField, matchError } from "mv-form-utils";
import "mv-form-field";
import "mv-select";

export default class SelectField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      options: { type: Array, attribute: false, reflect: true },
      selected: { type: Object, attribute: false, reflect: true },
      value: { type: Object, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css`
      mv-select {
        --mv-select-width: 100%;
        --mv-select-font-size: 16px;
        --mv-select-input-padding: 6.25px;
      }
    `;
  }

  constructor() {
    super();
    this.field = {};
    this.selected = {};
    this.options = [];
  }

  render() {
    const { code, label } = this.field;

    return html`
      <mv-form-field
        name="${code}"
        label-position="none"
        .error="${matchError(this.errors, code)}"
      >
        <mv-select
          slot="field"
          placeholder="${label}"
          .value="${this.selected}"
          .options="${this.options}"
          @select-option="${this.changeSelected}"
          @on-clear="${this.clearValue}"
        ></mv-select>
      </mv-form-field>
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

  changeSelected = (event) => {
    const { code } = this.field;
    const {
      target,
      detail: {
        option: { value },
      },
    } = event;
    changeField(target, { name: code, value, originalEvent: event });
    this.selected = this.options.find((option) => option.value === value);
  };

  clearValue = (event) => {
    const { code } = this.field;
    const {
      detail: { originalEvent },
    } = event;
    changeField(originalEvent.target, {
      name: code,
      value: null,
      originalEvent: event,
    });
  };
}

customElements.define("select-field", SelectField);
