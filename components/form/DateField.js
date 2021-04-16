import { LitElement, html, css } from "lit-element";
import { changeField, matchError } from "mv-form-utils";
import { EMPTY_DATE, parseDate, isEmpty } from "mv-calendar-utils";
import "mv-form-field";
import "mv-calendar";

export default class DateField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      selected: { type: Object, attribute: false, reflect: true },
      value: { type: String, attribute: true, reflect: true },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.field = {};
    this.selected = { ...EMPTY_DATE };
    this.value = "";
  }

  render() {
    const { code, label } = this.field;
    return html`
      <mv-form-field
        name="${code}"
        label-position="none"
        .error="${matchError(this.errors, code)}"
      >
        <mv-calendar
          dropdown
          slot="field"
          name="${code}"
          placeholder="${label}"
          .selected="${this.selected}"
          @select-date="${this.changeDate}"
        ></mv-calendar>
      </mv-form-field>
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

  changeDate = (event) => {
    const { target, detail } = event;
    const { selected } = detail;
    const { code } = this.field;
    this.selected = selected;
    const value = isEmpty(this.selected)
      ? ""
      : moment(selected.date).toISOString();
    changeField(target, {
      name: code,
      value,
      originalEvent: event,
    });
  };
}

customElements.define("date-field", DateField);
