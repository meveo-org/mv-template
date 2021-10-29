import { html, css } from "lit-element";
import FilterTemplate from "./FilterTemplate.js";
import "mv-input";

export default class TextFilter extends FilterTemplate {
  static get styles() {
    return css``;
  }

  renderInput = () => html`
    <mv-input
      name="${this.field.code}"
      placeholder="${this.field.description}"
      @input-change="${this.inputChange}"
    ></mv-input>
  `;

  inputChange = (event) => {
    const {
      detail: { value },
    } = event;
    this.updateValue(value);
  };
}

customElements.define("text-filter", TextFilter);
