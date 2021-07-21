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
      <div>
        <b>Code</b>: <i>${code}</i><br />
        <b>Label</b>: <i>${label}</i><br />
      </div>
    `;
  }

  handleClick = (originalEvent) => {
    const { code } = this.field;
    const { target } = originalEvent;
    changeField(target, { name: code, value: !this.value, originalEvent });
  };
}

customElements.define("binary-field", BinaryField);
