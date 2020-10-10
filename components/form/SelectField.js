import { LitElement, html, css } from "lit-element";

export default class SelectField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
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
    return html`<div>Select</div>`;
  }
}

customElements.define("select-field", SelectField);
