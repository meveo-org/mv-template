import { html, css } from "lit-element";
import { MvElement } from "mv-element";
import * as config from "config";
import { validate, clearForm } from "mv-form-utils";
import { EMPTY_DIALOG } from "utils";
import "mv-button";
import "mv-container";
import "mv-dialog";
import "mv-font-awesome";
import "mv-form";
import "mv-form-field";
import "mv-tooltip";
import "../../components/form/FormField.js";
import "../../components/layout/PageLayout.js";
import EndpointInterface from "../../service/EndpointInterface.js";

export default class NewPageTemplate extends MvElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      schema: { type: Object, attribute: false, reflect: true },
      refSchemas: { type: Array, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
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
      <page-layout>
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
                      .field="${{ ...formField, value }}"
                    ></form-field>
                  `;
                });
              })}
            </div>

            <div class="button-grid">
              <mv-button
                @button-clicked="${clearForm(null)}"
                button-style="info"
              >
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
      </page-layout>
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

  clearErrors = () => {
    this.errors = null;
  };

  handleErrors = (event) => {
    this.errors = event.detail.errors;
  };

  cancel = (event) => {
    this.errors = null;
    clearForm(null)(event);
    history.pushState(null, "", `./${this.entity.code}/list`);
  };

  save = () => {
    const errors = validate(
      this.entity.schema,
      this.store.state,
      null,
      null,
      this.entity.refSchemas
    );
    const hasError = errors && Object.keys(errors).some((key) => !!errors[key]);
    if (hasError) {
      this.errors = errors;
      console.error("errors :", errors);
    } else {
      const item = this.store.state;
      const { endpoints } = this.entity;
      const { endpointInterface } = endpoints.NEW;
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

  submitSuccess = (event) => {
    const {
      detail: { result },
    } = event;
    const [{ uuid }] = result;
    this.dialog = {
      title: "Success",
      message: html`<span>Item saved.</span>`,
      open: true,
    };
    history.pushState(null, "", `./${this.entity.code}/update/${uuid}`);
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
  };

  closeDialog = () => {
    this.dialog = { ...EMPTY_DIALOG };
  };
}

customElements.define("new-page-template", NewPageTemplate);
