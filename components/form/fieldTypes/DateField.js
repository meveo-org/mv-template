import { html } from "lit-element";
import { EMPTY_DATE, parseDate, isEmpty } from "mv-calendar-utils";
import FieldTemplate from "./FieldTemplate.js";
import "mv-button";
import "mv-font-awesome";
import "mv-form-field";
import "mv-calendar";

export default class DateField extends FieldTemplate {
  static get properties() {
    return {
      selected: { type: Object, attribute: false, reflect: true },
      value: { type: String, attribute: true, reflect: true },
    };
  }

  constructor() {
    super();
    this.selected = { ...EMPTY_DATE };
    this.value = "";
  }

  renderInput() {
    const { code, label } = this.field;
    return html`
      <mv-calendar
        dropdown
        slot="field"
        name="${code}"
        placeholder="${label}"
        .selected="${this.selected}"
        @select-date="${this.change}"
      ></mv-calendar>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      const date = new Date(newValue);
      this.selected = !!date.getTime()
        ? parseDate({ date })
        : { ...EMPTY_DATE };
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  change = (originalEvent) => {
    const { detail } = originalEvent;
    const { selected } = detail;
    this.selected = selected;
    const value = isEmpty(this.selected)
      ? ""
      : moment(selected.date).toISOString();
    this.dispatchEvent(
      new CustomEvent("change", { detail: { value, originalEvent } })
    );
  };
}

customElements.define("date-field", DateField);
