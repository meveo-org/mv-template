import { html, css } from "lit-element";
import FilterTemplate from "./FilterTemplate.js";
import { EMPTY_DATE } from "mv-calendar-utils";
import "mv-calendar";

export default class DateFilter extends FilterTemplate {
  static get properties() {
    return {
      ...super.properties,
      start: { type: String },
      end: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        --mv-input-min-width: 8rem;
        --mv-dropdown-trigger-padding: 0;
      }

      .date-range {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: space-around;
        justify-content: start;
        align-items: center;
        gap: 0.5rem;
      }
    `;
  }

  parseDate = (value) => {
    if (value) {
      const [year, month, day] = value.split("-");
      const monthOffset = Number(month) - 1;
      const newValue = {
        date: new Date(`${year}-${month}-${day}`),
        day: Number(day),
        month: monthOffset,
        year: Number(year),
      };
      return newValue;
    }
    return EMPTY_DATE;
  };

  renderInput = () => {
    return html`
      <div class="date-range">
        <mv-calendar
          name="start"
          dropdown
          .selected="${this.parseDate(this.start)}"
          @select-date="${this.changeDate}"
        ></mv-calendar>
        <span> - </span>
        <mv-calendar
          name="end"
          dropdown
          .selected="${this.parseDate(this.end)}"
          @select-date="${this.changeDate}"
        ></mv-calendar>
      </div>
    `;
  };

  formatDate = (value) => {
    const hasDate = value && value.year && value.month && value.day;
    if (hasDate) {
      const monthOffset = value.month + 1;
      const month =
        monthOffset && monthOffset < 10 ? `0${monthOffset}` : monthOffset;
      const day = value.day && value.day < 10 ? `0${value.day}` : value.day;
      return `${value.year}-${month}-${day}`;
    }
    return undefined;
  };

  changeDate = (event) => {
    const {
      detail: { name, selected },
    } = event;

    this.updateValue({
      start: this.start,
      end: this.end,
      [name]: this.formatDate(selected),
    });
  };
}

customElements.define("date-filter", DateFilter);
