import { LitElement, html, css } from "lit-element";
import { changeField, matchError } from "mv-form-utils";
import "mv-form-field";
import "mv-checkbox";

export default class BinaryField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      value: { type: Boolean, attribute: true, reflect: true },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.field = {};
    this.value = false;
  }

  render() {
    const { code, label } = this.field || {};
    return html`
      <mv-form-field
        name="${code}"
        label-position="none"
        .error="${matchError(this.errors, code)}"
      >
        <mv-checkbox
          slot="field"
          ?checked="${this.value}"
          @click-checkbox="${this.handleClick}"
          label="${label}"
        ></mv-checkbox>
      </mv-form-field>
    `;
  }

  handleClick = (originalEvent) => {
    const { code } = this.field;
    const { target } = originalEvent;
    changeField(target, { name: code, value: !this.value, originalEvent });
  };
}

customElements.define("binary-field", BinaryField);
