import { LitElement, html, css } from "lit-element";
import "mv-container";
import "./BooleanFilter.js";
import "./DateFilter.js";
import "./ListFilter.js";
import "./TextFilter.js";

export default class TableFilters extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean },
      fields: { type: Array, attribute: false },
      filterValues: { type: Object, attribute: false },
    };
  }

  static get styles() {
    return css`
      mv-dropdown {
        --mv-dropdown-trigger-height: 60px;
        --mv-dropdown-min-width: 40rem;
      }

      .filter-section {
        display: none;
      }

      .filter-section.open {
        display: block;
      }

      .filter-groups {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
      }

      .filters {
        padding: 0.5rem;
      }

      .action-buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        place-content: space-around space-between;
        align-items: center;
        justify-content: flex-end;
      }

      .small-button {
        --mv-button-min-width: 20px;
        --mv-button-padding: 10px;
      }
    `;
  }

  constructor() {
    super();
    this.open = false;
    this.fields = [];
    this.filterValues = {};
  }

  render = () => {
    const open = this.open ? " open" : "";
    const sectionClass = `filter-section${open}`;
    return html`
      <mv-container class="${sectionClass}">
        <div class="filter-groups">
          ${this.fields.map((group) => this.renderFilterGroup(group))}
        </div>
        <div class="action-buttons">
          <mv-button class="small-button" button-style="info">Clear</mv-button>
          <mv-button
            class="small-button"
            button-style="error"
            @button-clicked="${this.closeFilters}"
          >
            Cancel
          </mv-button>
          <mv-button class="small-button">Apply</mv-button>
        </div>
      </mv-container>
    `;
  };

  renderFilterGroup = (group) => {
    const { fields, label } = group;
    console.log("fields: ", fields);
    const hasFilters = fields.some((field) => field.filter);
    return hasFilters
      ? html`
          <fieldset>
            <legend>${label}</legend>
            <div class="filters">
              ${fields.map((field) => this.renderFilterItem(group, field))}
            </div>
          </fieldset>
        `
      : html``;
  };

  renderFilterItem = (group, field) => {
    const value = this.filterValues[field.code];
    if (field.filter) {
      switch (field.fieldType) {
        case "BOOLEAN":
          return html`
            <boolean-filter
              .field="${field}"
              .value="${value}"
              @update-value="${this.updateValue}"
            ></boolean-filter>
          `;
        case "DATE":
          return html`
            <date-filter
              .field="${field}"
              .value="${value}"
              @update-value="${this.updateValue}"
            ></date-filter>
          `;
        case "LIST":
          return html`
            <list-filter
              .field="${field}"
              .value="${value}"
              @update-value="${this.updateValue}"
            ></list-filter>
          `;
        case "BINARY":
        case "CHILD_ENTITY":
        case "DOUBLE":
        case "EMBEDDED_ENTITY":
        case "ENTITY":
        case "EXPRESSION":
        case "LONG":
        case "LONG_TEXT":
        case "SECRET":
        case "STRING":
        case "TEXT_AREA":
          return html`
            <text-filter
              .field="${field}"
              .value="${value}"
              @update-value="${this.updateValue}"
            ></text-filter>
          `;
        default:
          console.error("Unsupported field: ", field);
          return html`
            <div>
              <div>Filter: ${field.code}</div>
              <div>Filter Type: ${field.fieldType}</div>
              <div>Storage Type: ${field.storageType}</div>
            </div>
          `;
      }
    }
  };

  updateValue = (event) => {
    const { code } = this.field;
    const {
      detail: { value },
    } = event;
    this.filterValues = {
      ...this.filterValues,
      [code]: value,
    };
    this.dispatchEvent(
      new CustomEvent("update-filters", {
        detail: { filterValues: this.filterVAlues },
        bubbles: true,
        composed: true,
      })
    );
  };

  closeFilters = () => {
    this.dispatchEvent(new CustomEvent("close-filters"));
  };
}

customElements.define("table-filters", TableFilters);
