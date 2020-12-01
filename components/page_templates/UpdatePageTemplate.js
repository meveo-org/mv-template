import { html, css } from "lit-element";
import { MvElement } from "mv-element";
import * as config from "config";
import { validate, clearForm } from "mv-form-utils";
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

const EMPTY_DIALOG = {
  title: "",
  message: "",
  open: false,
};

export default class UpdatePageTemplate extends MvElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      formFields: { type: Array, attribute: false, reflect: true },
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
    `;
  }

  constructor() {
    super();
    this.dialog = EMPTY_DIALOG;
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
            <mv-button
              no-left-button
              @button-clicked="${this.closeDialog}"
              button-style="error"
              >Close</mv-button
            >
          </span>
        </mv-dialog>
      </page-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("update-errors", this.handleErrors);
    this.addEventListener("clear-errors", this.clearErrors);

    this.loadFormData();
  }

  loadFormData = () => {
    const {
      parameters: { pathParameters },
    } = this;
    const { id } = pathParameters;

    const endpointInterface = new EndpointInterface(
      this.entity.code,
      "GET",
      "DETAIL"
    );
    endpointInterface.executeApiCall(
      this,
      {
        noAuth: true,
        config,
        uuid: id,
      },
      this.detailRetrieved,
      this.handleErrors
    );
  };

  detailRetrieved = (event) => {
    const {
      detail: { result },
    } = event;
    const { schema } = this.entity;

    const { properties } = schema;
    Object.getOwnPropertyNames(properties).forEach((name) => {
      const value = result[name];
      this.store.updateValue(name, value);
    });
    this.store.dispatch("");
  };

  clearErrors = () => {
    this.errors = null;
  };

  handleErrors = (event) => {
    const {
      detail: { error },
    } = event;
    console.log("error: ", error);
    const [message, statusCode] = error;
    this.dialog = {
      title: "Error",
      message: html`<span>${message}</span><br /><small>${statusCode}</small>`,
      open: true,
    };
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
      console.log("errors :", errors);
    } else {
      const {
        parameters: { pathParameters },
      } = this;
      const { id } = pathParameters;
      const item = this.store.state;
      const endpointInterface = new EndpointInterface(
        this.entity.code,
        "PUT",
        "UPDATE"
      );
      endpointInterface.executeApiCall(
        this,
        {
          noAuth: true,
          config,
          uuid: id,
          ...item,
        },
        this.submitSuccess,
        this.handleErrors
      );
    }
  };

  submitSuccess = (event) => {
    const {
      detail: { result },
    } = event;
    this.dialog = {
      title: "Success",
      message: html`<span>Item updated.</small>`,
      open: true,
    };
  };

  closeDialog = () => {
    this.dialog = EMPTY_DIALOG;
  };
}

customElements.define("update-page-template", UpdatePageTemplate);
