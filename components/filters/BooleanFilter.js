import { html, css } from "lit-element";
import FilterTemplate from "./FilterTemplate.js";
import "mv-select";

const BOOLEAN_OPTIONS = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];

export default class BooleanFilter extends FilterTemplate {
  static get styles() {
    return css``;
  }

  renderInput = () => html`
    <mv-select
      .value="${this.value}"
      .options="${BOOLEAN_OPTIONS}"
      @select-option="${this.updateValue}"
      has-empty-option
    ></mv-select>
  `;
}

customElements.define("boolean-filter", BooleanFilter);
