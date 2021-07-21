import { LitElement, html, css } from "lit-element";
import { matchError } from "mv-form-utils";
import "mv-button";
import "mv-font-awesome";
import "mv-form-field";
import "mv-spinner";

export default class NumberField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      value: { type: Number },
      step: { type: Number },
      min: { type: Number },
      max: { type: Number },
      precision: { type: Number },
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
    this.step = 1;
    this.precision = 0;
    this.min = undefined;
    this.max = undefined;
  }

  render() {
    const { field, value, step, min, max, precision } = this;
    const { code, label, valueRequired, disabled } = field || {};
    const error = matchError(this.errors, code);

    return html`
      <mv-form-field name="${code}" label-position="none" .error="${error}">
        <div slot="field" class="field">
          <div class="input">
            <mv-spinner
              name="${code}"
              step="${step}"
              min="${min}"
              max="${max}"
              precision="${precision}"
              placeholder="${label}"
              .value="${value}"
              ?hasError="${error}"
              ?disabled="${disabled}"
              ?required="${valueRequired}"
              @spinner-change="${this.change}"
            ></mv-spinner>
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

  change = (originalEvent) => {
    const { detail } = originalEvent;
    this.dispatchEvent(
      new CustomEvent("change", { detail: { ...detail, originalEvent } })
    );
  };

  remove = (originalEvent) => {
    this.dispatchEvent(
      new CustomEvent("remove", { detail: { originalEvent } })
    );
  };
}

customElements.define("number-field", NumberField);
