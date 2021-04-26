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
import "../../../components/form/FormField.js";

export default class UpdateContent extends MvElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      parameters: { type: Object, attribute: false, reflect: true },
      formValues: { type: Object, attribute: false, reflect: true },
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
    `;
  }

  constructor() {
    super();
    this.dialog = EMPTY_DIALOG;
  }

  render() {
    const { schema, refSchemas, formFields } = this.entity;
    const hasMultipleTabs = (formFields || []).length > 1;
    return html`
      <mv-container>
        <mv-form
          .store="${this.store}"
          .schema="${schema}"
          .refSchemas="${refSchemas}"
        >
          ${hasMultipleTabs
            ? this.renderGroup(formFields, schema)
            : this.renderFields(formFields[0], schema)}

          <div class="button-grid">
            <mv-button @button-clicked="${clearForm(null)}" button-style="info">
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

  renderGroup = (formFields, schema) =>
    html`
      <mv-tab group type="rounded">
        ${(formFields || []).map((group) => {
          const key = toTagName(group.label);
          return html`
            <mv-tab tab key="${key}">${group.label}</mv-tab>
            <mv-tab content key="${key}">
              ${this.renderFields(group, schema)}
            </mv-tab>
          `;
        })}
      </mv-tab>
    `;

  renderFields = (group, schema) => html`
    <div class="form-grid">
      ${(group.fields || []).map((formField) => {
        const value = this[formField.code];
        const schemaProp = schema.properties[formField.code];
        return html`
          <form-field
            .field="${formField}"
            .schemaProp="${schemaProp}"
            .value="${value}"
            .errors="${this.errors}"
          ></form-field>
        `;
      })}
    </div>
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("update-errors", this.handleErrors);
    this.addEventListener("clear-errors", this.clearErrors);
    this.loadFormData();
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

  loadFormData = () => {
    const { entity, parameters, formValues } = this;
    const { pathParameters } = parameters || {};
    const { id } = pathParameters || {};
    const endpointInterface = modelInterfaces(entity).DETAIL;
    const entityValue = formValues || {};
    const uuid = entityValue.uuid || id;
    endpointInterface.executeApiCall(
      {
        noAuth: true,
        config,
        uuid,
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
  };

  clearErrors = () => {
    this.errors = null;
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
      const { entity, parameters, formValues } = this;
      const { pathParameters = {} } = parameters || {};
      const { id } = pathParameters;
      const item = this.store.state;
      const endpointInterface = modelInterfaces(entity).UPDATE;
      const uuid = formValues.uuid || id;
      endpointInterface.executeApiCall(
        {
          noAuth: true,
          config,
          uuid,
          ...item,
        },
        this.submitSuccess,
        this.handleErrors
      );
    }
  };

  cancel = (event) => {
    this.errors = null;
    clearForm(null)(event);
    this.cancelCallback(new CustomEvent("cancel"));
  };

  submitSuccess = () => {
    this.dialog = {
      title: "Success",
      message: html`<span>Item updated.</span>`,
      open: true,
    };
    this.successCallback(new CustomEvent("submitted"));
  };

  closeDialog = () => {
    this.dialog = EMPTY_DIALOG;
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
}

customElements.define("update-content", UpdateContent);
