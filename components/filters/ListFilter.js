import { html, css } from "lit-element";
import FilterTemplate from "./FilterTemplate.js";
import "mv-select";

export default class ListFilter extends FilterTemplate {
  static get properties() {
    return {
      ...super.properties,
      options: { type: Array, attribute: false },
    };
  }
  static get styles() {
    return css``;
  }

  constructor(){
    super();
    this.options = [];
  }
  
  connectedCallback() {
    super.connectedCallback();
    const {listValues} = this.field;
    this.options = Object
    .keys(this.field.listValues || {})
    .map(key => ({label: key, value: listValues[key]}));
    console.log('this.options: ', this.options);
  }

  renderInput = () => html`
    <mv-select
      .value="${this.value}"
      .options="${this.options}"
      @select-option="${this.updateValue}"
      has-empty-option
    ></mv-select>
  `;
}

customElements.define("list-filter", ListFilter);
