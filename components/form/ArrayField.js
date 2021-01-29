import { LitElement, html, css } from "lit-element";

export default class ArrayField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      value: { type: Array, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.field = [];
    this.value = false;
  }

  render() {
    const { label } = this.field || {};
    console.log("this.field: ", this.field);
    console.log("this.errors: ", this.errors);
    console.log("this.value: ", this.value);
    return html`
      <div>
        <div><label>${label}: </label></div>
        <div>${this.value}</div>
      </div>
    `;
  }
}

customElements.define("array-field", ArrayField);
