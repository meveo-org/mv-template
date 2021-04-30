import { LitElement, html, css } from "lit-element";
import { changeField, matchError } from "mv-form-utils";
import "mv-button";
import "mv-font-awesome";
import "mv-form-field";
import "mv-select";

export default class SelectField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Object, attribute: false, reflect: true },
      options: { type: Array, attribute: false, reflect: true },
      selected: { type: Object, attribute: false, reflect: true },
      value: { type: String, attribute: true, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        --button-size: 24px;
      }

      mv-select {
        --mv-select-width: 100%;
        --mv-select-font-size: 16px;
        --mv-select-input-padding: 6.25px;
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
        --mv-select-width: calc(100% - var(--button-size));
        width: calc(100% - var(--button-size));
        padding-top: 3px;
      }
      .button {
        border: 2px solid red;
        height: var(--button-size);
      }
    `;
  }

  constructor() {
    super();
    this.field = {};
    this.selected = {};
    this.options = [];
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
            <mv-select
              slot="field"
              placeholder="${label}"
              .value="${this.selected}"
              .options="${this.options}"
              @select-option="${this.change}"
              @on-clear="${this.clearValue}"
            ></mv-select>
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
      </mv-form-field>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const { listValues } = this.field;
    this.options = Object.keys(listValues).map((key) => ({
      label: listValues[key],
      value: key,
    }));
    if (this.value) {
      this.selected = this.options.find(
        (option) => option.value === this.value
      );
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      if (!!newValue) {
        this.selected = this.options.find(
          (option) => option.value === this.value
        );
      } else {
        this.selected = {};
      }
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  clearValue = (event) => {
    const { code } = this.field;
    const {
      detail: { originalEvent },
    } = event;
    changeField(originalEvent.target, {
      name: code,
      value: null,
      originalEvent: event,
    });
  };

  change = (originalEvent) => {
    const {
      detail: {
        option: { value },
      },
    } = originalEvent;
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

customElements.define("select-field", SelectField);
