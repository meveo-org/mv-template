import { LitElement, html, css } from "lit-element";
import { matchError } from "mv-form-utils";
import "mv-button";
import "mv-font-awesome";
import "mv-form-field";
import "mv-input";

export default class FieldTemplate extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false },
      errors: { type: Object, attribute: false },
      value: { type: Object, attribute: false },
      hasError: { type: Boolean, attribute: "has-error", reflect: true },
      removable: { type: Boolean },
      hideLabel: { type: Boolean, attribute: "hide-label" },
      hidePlaceholder: { type: Boolean, attribute: "hide-placeholder" },
      hideError: { type: Boolean, attribute: "hide-error" },
    };
  }

  static get styles() {
    return css`
      :host {
        --button-size: 24px;
        --padding-size: 0.5rem;
        --mv-dropdown-trigger-padding: 0;
      }

      mv-button {
        --mv-button-margin: 0 0 0 5px;
        --mv-button-padding: 3px 4px;
        --mv-button-min-width: var(--button-size);
      }

      .field {
        display: flex;
        justify-content: space-between;
        align-items: start;
      }

      .label {
        padding-top: var(--padding-size);
      }

      .input {
        width: calc(100% - var(--button-size));
        padding: var(--padding-size);
        position: relative;
      }

      .small-button {
        height: var(--button-size);
      }

      .label.error {
        color: #ad4444 !important;
      }
    `;
  }

  constructor() {
    super();
    this.field = {};
    this.removable = false;
    this.hideLabel = false;
    this.hidePlaceholder = false;
    this.hideError = false;
  }

  render() {
    const { code } = this.field || {};
    const error = matchError(this.errors, code);
    const hasError = !!error;
    const errorClass = hasError ? " error" : "";
    return html`
      <mv-form-field
        name="${code}"
        label-position="none"
        .error="${this.hideError ? null : error}"
      >
        <div slot="field" class="field">
          ${this.renderLabel(this.field, errorClass)}
          <div class="input">${this.renderInput()}</div>
          ${this.renderDeleteButton()}
        </div>
      </mv-form-field>
    `;
  }

  renderLabel = (field, errorClass) =>
    this.hideLabel
      ? html``
      : html`
          <label for="${field.code}" class="label${errorClass}">
            ${field.label}
          </label>
        `;

  renderDeleteButton = () =>
    this.removable
      ? html`
          <div class="button">
            <mv-button
              button-style="error"
              class="small-button"
              @button-clicked="${this.remove}"
            >
              <mv-fa icon="minus"></mv-fa>
            </mv-button>
          </div>
        `
      : html``;

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

customElements.define("field-template", FieldTemplate);
