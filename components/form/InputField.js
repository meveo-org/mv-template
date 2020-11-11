import { LitElement, html, css } from "lit-element";
import { matchError } from "mv-form-utils";
import "mv-form-field";
export default class InputField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Object, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.field = {};
  }

  render() {
    const { code, label, valueRequired } = this.field || {};
    return html`
      <mv-form-field
        name="${code}"
        placeholder="${label || ""}"
        label-position="none"
        ?required="${valueRequired}"
        .value="${this.value}"
        .error="${matchError(this.errors, code)}"
      ></mv-form-field>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const { value } = this.field;
    if (value) {
      this.value = value;
    }
  }
}

customElements.define("input-field", InputField);
