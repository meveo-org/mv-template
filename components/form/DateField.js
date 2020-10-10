import { LitElement, html, css } from "lit-element";

export default class DateField extends LitElement {
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
    return html`<div>DateField</div>`;
  }
}

customElements.define("date-field", DateField);
