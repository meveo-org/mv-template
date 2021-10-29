import { html, css } from "lit-element";
import FilterTemplate from "./FilterTemplate.js";
import { EMPTY_DATE } from "mv-calendar-utils";
import "mv-calendar";

export default class DateFilter extends FilterTemplate {
  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.value = {
      start: EMPTY_DATE,
      end: EMPTY_DATE,
    };
  }

  render = () => {
    const { start, end } = this.value || {};
    return html`
      <mv-calendar
        range-calendar
        allow-partial
        inline-input
        .start="${start}"
        .end="${end}"
        @select-date="${this.changeDate}"
      ></mv-calendar>
    `;
  };

  formatDate = (value) => {
    const { date, year, month, day } = value;
    return { date, year, month, day };
  };

  changeDate = (event) => {
    const {
      detail: { selected },
    } = event;

    this.updateValue({
      start: this.formatDate(selected.start.selected),
      end: this.formatDate(selected.end.selected),
    });
  };
}

customElements.define("date-filter", DateFilter);
