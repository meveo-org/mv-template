import { LitElement, html, css } from "lit-element";
import { matchError } from "mv-form-utils";
import "mv-button"
import "mv-font-awesome"
import "mv-form-field";
import "mv-input";

export default class TextField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Object, attribute: false, reflect: true },
      value: { type: Object, attribute: false, reflect: true },
      hasError: { type: Boolean, attribute: "has-error", reflect: true },
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
  }

  render() {
    const { code, label, disabled, valueRequired } = this.field || {};
    return html`
      <mv-form-field
        name="${code}"
        label-position="none"
        .error="${matchError(this.errors, code)}"
      >
        <div slot="field" class="field">
          <div class="input">
            <mv-input
              type="text"
              .placeholder="${label}"
              .value="${this.value}"
              ?has-error="${this.hasError}"
              @input-change="${this.change}"
              ?disabled="${disabled}"
              ?required="${valueRequired}"
            ></mv-input>
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
      new CustomEvent("change", {
        detail: { ...detail, originalEvent },
      })
    );
  };

  remove = (originalEvent) => {
    this.dispatchEvent(
      new CustomEvent("remove", { detail: { originalEvent } })
    );
  };
}

customElements.define("text-field", TextField);
