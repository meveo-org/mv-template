import { html, css } from "lit-element";
import { MvElement } from "mv-element";
import * as config from "config";
import { validate, clearForm } from "mv-form-utils";
import { EMPTY_DIALOG } from "utils";
import { modelInterfaces } from "../../../service/EndpointInterface.js";
import "mv-button";
import "mv-container";
import "mv-dialog";
import "mv-font-awesome";
import "mv-form";
import "mv-form-field";
import "mv-tooltip";
import "../../form/FormField.js";

export default class NewContent extends MvElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      schema: { type: Object, attribute: false, reflect: true },
      refSchemas: { type: Array, attribute: false, reflect: true },
      dialog: { type: Object, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css`
      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 20px;
      }

      .dialog-size {
        --mv-dialog-width: 500px;
        --mv-dialog-max-height: 300px;
      }
    `;
  }

  constructor() {
    super();
    this.dialog = { ...EMPTY_DIALOG };
  }

  render() {
    const { schema, refSchemas, formFields } = this.entity;
    return html`
      <mv-container>
        <mv-form
          .store="${this.store}"
          .schema="${schema}"
          .refSchemas="${refSchemas}"
        >
          <div class="form-grid">
            ${(formFields || []).map((group) => {
              return (group.fields || []).map((formField) => {
                const value = this[formField.code];
                return html`
                  <form-field
                    .field="${formField}"
                    .value="${value}"
                    .errors="${this.errors}"
                  ></form-field>
                `;
              });
            })}
          </div>

          <div class="button-grid">
            <mv-button @button-clicked="${clearForm()}" button-style="info">
              <mv-fa icon="undo"></mv-fa>Clear
            </mv-button>
            <mv-button @button-clicked="${this.cancel}" button-style="cancel">
              <mv-fa icon="ban"></mv-fa>Cancel
            </mv-button>
            <mv-button @button-clicked="${this.save}">
              <mv-fa icon="save"></mv-fa>Save
            </mv-button>
          </div>
        </mv-form>
      </mv-container>
      <mv-dialog
        class="dialog-size"
        header-label="${this.dialog.title}"
        ?open="${this.dialog.open}"
        @close-dialog="${this.closeDialog}"
        no-left-button
        closeable
      >
        <p>${this.dialog.message}</p>
        <span slot="footer">
          <mv-button @button-clicked="${this.closeDialog}"> Close </mv-button>
        </span>
      </mv-dialog>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("update-errors", this.handleErrors);
    this.addEventListener("clear-errors", this.clearErrors);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.store.resetState(true);
  }

  // override this in child class if extending this class
  // instead of using component directly
  cancelCallback = (event) => {
    this.dispatchEvent(event);
  };

  // override this in child class if extending this class
  // instead of using component directly
  successCallback = (event) => {
    this.dispatchEvent(event);
  };

  // override this in child class if extending this class
  // instead of using component directly
  failCallback = (event) => {
    this.dispatchEvent(event);
  };

  clearErrors = () => {
    this.errors = null;
  };

  handleErrors = (event) => {
    this.errors = event.detail.errors;
  };

  save = () => {
    const { store, entity } = this;
    const errors = validate(
      entity.schema,
      store.state,
      null,
      null,
      entity.refSchemas
    );
    const hasError = errors && Object.keys(errors).some((key) => !!errors[key]);
    if (hasError) {
      this.errors = errors;
      console.error("errors :", errors);
    } else {
      const item = store.state;
      const endpointInterface = modelInterfaces(entity).NEW;
      endpointInterface.executeApiCall(
        {
          noAuth: true,
          config,
          ...item,
        },
        this.submitSuccess,
        this.submitFailed
      );
    }
  };

  cancel = (event) => {
    this.errors = null;
    clearForm()(event);
    this.cancelCallback(new CustomEvent("cancel"));
  };

  submitSuccess = (event) => {
    const {
      detail: { result },
    } = event;
    this.dialog = {
      title: "Success",
      message: html`<span>Item saved.</span>`,
      open: true,
    };
    this.successCallback(
      new CustomEvent("submitted", {
        detail: { result },
      })
    );
  };

  submitFailed = (event) => {
    const {
      detail: { error },
    } = event;
    console.error("error: ", error);
    const [message, statusCode] = error;
    this.dialog = {
      title: "Error",
      message: html`<span>${message}</span><br /><small>${statusCode}</small>`,
      open: true,
    };
    this.failCallback(
      new CustomEvent("failed", {
        detail: { error },
      })
    );
  };

  closeDialog = () => {
    this.dialog = { ...EMPTY_DIALOG };
  };
}

customElements.define("new-content", NewContent);
