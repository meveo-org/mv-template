import { LitElement, html, css } from "lit-element";
import { matchError } from "mv-form-utils";
import "mv-form-field";

export default class EntityField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Object, attribute: false, reflect: true },
      value: { type: Object, attribute: false, reflect: true },
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
      <div>Entity Field: ${label}</div>
    `;
  }
}

customElements.define("entity-field", EntityField);
