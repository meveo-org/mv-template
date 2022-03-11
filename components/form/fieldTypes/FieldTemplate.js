import { LitElement, html, css } from "lit";
import { matchError } from "@meveo-org/mv-form/utils/index.js";
import "@meveo-org/mv-button";
import "@meveo-org/mv-font-awesome";
import "@meveo-org/mv-form/mv-form-field.js";
import "@meveo-org/mv-input";

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
        --mv-dropdown-trigger-padding: 0;
      }

      mv-button {
        --mv-button-margin: 0 0 0 5px;
        --mv-button-padding: 3px 4px;
        --mv-button-min-width: var(--button-size);
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
      <mv-form-field/mv-form-field.js
        name="${code}"
        label-position="none"
        .error="${this.hideError ? null : error}"
      >
        <div slot="field">
          <div class="field-template">
            ${this.renderLabel(this.field, errorClass)}
            <div class="input">${this.renderInput()}</div>
            ${this.renderDeleteButton()}
          </div>
        </div>
      </mv-form-field/mv-form-field.js>
    `;
  }

  renderLabel(field, errorClass) {
    return this.hideLabel
      ? html``
      : html`
          <label for="${field.code}" class="label${errorClass}">
            ${field.label}
          </label>
        `;
  }

  renderDeleteButton() {
    return this.removable
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

customElements.define("field-template", FieldTemplate);
