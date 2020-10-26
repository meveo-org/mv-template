import { LitElement, html, css } from "lit-element";
import { changeField, matchError } from "mv-form-utils";
import { EMPTY_DATE, parseDate } from "mv-calendar-utils";
import "mv-form-field";
import "mv-calendar";

export default class DateField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      selected: { type: Object, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.field = {};
    this.selected = EMPTY_DATE;
  }

  render() {
    const { code, description } = this.field;
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
          placeholder="${description}"
          .selected="${this.selected}"
          @select-date="${this.changeDate}"
        ></mv-calendar>
      </mv-form-field>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.field.value) {
      const date = new Date(this.field.value);
      this.selected = parseDate({ date });
    }
  }

  changeDate = (event) => {
    const { target, detail } = event;
    const { selected } = detail;
    const { code } = this.field;
    this.selected = selected;
    const value = moment(selected.date).format("YYYY/MM/DD");
    changeField(target, {
      name: code,
      value,
      originalEvent: event,
    });
  };
}

customElements.define("date-field", DateField);
