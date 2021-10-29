import { LitElement, html, css } from "lit-element";

export default class FilterTemplate extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false },
      value: { type: Object, attribute: false },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.field = {};
    this.value = {};
  }

  render = () => html`
    <div class="field">
      <label>${this.field.label}</label>
      ${this.renderInput()}
    </div>
  `;

  updateValue = (value) => {
    this.dispatchEvent(
      new CustomEvent("update-value", {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  };
}
