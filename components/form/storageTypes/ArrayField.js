import { LitElement, html, css } from "lit-element";
import { changeField, matchError } from "mv-form-utils";
import "mv-form-field";
import "mv-tags";

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
    this.field = {};
    this.value = [];
  }

  render() {
    const { label, code } = this.field || {};
    return html`
      <mv-form-field
        name="${code}"
        label-position="none"
        .error="${matchError(this.errors, code)}"
      >
        <mv-tags
          slot="field"
          placeholder="${label}"
          .tags="${this.value}"
          @add-tag="${this.updateTags}"
          @remove-tag="${this.updateTags}"
        ></mv-tags>
      </mv-form-field>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      console.log("newValue: ", newValue);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  updateTags = (event) => {
    const { target, detail } = event;
    const { code } = this.field;
    const value = detail.tags;
    changeField(target, {
      name: code,
      value,
      originalEvent: event,
    });
  };
}

customElements.define("array-field", ArrayField);
