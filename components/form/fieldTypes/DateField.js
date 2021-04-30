import { LitElement, html, css } from "lit-element";
import { matchError } from "mv-form-utils";
import { EMPTY_DATE, parseDate, isEmpty } from "mv-calendar-utils";
import "mv-button";
import "mv-font-awesome";
import "mv-form-field";
import "mv-calendar";

export default class DateField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      selected: { type: Object, attribute: false, reflect: true },
      value: { type: String, attribute: true, reflect: true },
      removable: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        --button-size: 24px;
      }
      mv-button {
        --mv-button-margin: 0 0 0 5px;
        --mv-button-padding: 3px 4px;
        --mv-button-min-width: var(--button-size);
      }
      .field {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .input {
        width: calc(100% - var(--button-size));
        padding-top: 3px;
      }
      .button {
        height: var(--button-size);
      }
    `;
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
        <div slot="field" class="field">
          <div class="input">
            <mv-calendar
              dropdown
              slot="field"
              name="${code}"
              placeholder="${label}"
              .selected="${this.selected}"
              @select-date="${this.change}"
            ></mv-calendar>
          </div>
          <div class="button">
            <mv-button
              type="outline"
              button-style="error"
              class="small-button"
              .visible="${!!this.removable}"
              @button-clicked="${this.remove}"
            >
              <mv-fa icon="minus"></mv-fa>
            </mv-button>
          </div>
        </div>
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

  remove = (originalEvent) => {
    this.dispatchEvent(
      new CustomEvent("remove", { detail: { originalEvent } })
    );
  };
}

customElements.define("date-field", DateField);
