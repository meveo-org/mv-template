import { html, css } from "lit-element";
import { MvElement } from "mv-element";
import * as config from "config";
import { validate, clearForm } from "mv-form-utils";
import { EMPTY_DIALOG, toTagName } from "utils";
import { modelInterfaces } from "../../../service/EndpointInterface.js";
import "mv-button";
import "mv-container";
import "mv-dialog";
import "mv-font-awesome";
import "mv-form";
import "mv-form-field";
import "mv-tab";
import "mv-tooltip";
import "../../form/FormField.js";

export default class UpdateContent extends MvElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      entity: { type: Object, attribute: false },
      errors: { type: Array, attribute: false },
      parameters: { type: Object, attribute: false },
      formValues: { type: Object, attribute: false },
      schema: { type: Object, attribute: false },
      refSchemas: { type: Array, attribute: false },
      dialog: { type: Object, attribute: false },
      fields: { type: Array, attribute: false },
    };
  }

  static get styles() {
    return css`
      .form-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-column-gap: 20px;
      }

      @media screen and (min-width: 980px) {
        .form-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media screen and (min-width: 1440px) {
        .form-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media screen and (min-width: 1920px) {
        .form-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      @media screen and (min-width: 2600px) {
        .form-grid {
          grid-template-columns: repeat(5, 1fr);
        }
      }

      .form-content {
        width: 100%;
      }

      .dialog-size {
        --mv-dialog-width: 500px;
        --mv-dialog-max-height: 300px;
      }
    `;
  }

  constructor() {
    super();
    this.auth = null;
    this.dialog = { ...EMPTY_DIALOG };
    this.fields=[];
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
          <div class="form-content">
            ${hasMultipleTabs
              ? this.renderGroup(formFields, schema)
              : this.renderFields(formFields[0], schema)}

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
        const { properties = {} } = schema || {};
        const schemaProp = properties[formField.code] || {};
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
    const { formFields } = this.entity;
    this.fields = formFields.reduce(
      (allFields, group) => [...allFields, ...group.fields],
      []
    );
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
        config,
        token: this.auth.token,
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
      const property = this.fields.find((field) => field.code === name);
      const fieldValue = result[name];
      const value =
        property.fieldType === "DATE" && fieldValue
          ? new Date(parseInt(fieldValue, 10))
          : fieldValue;
      this.store.updateValue(name, value);
    });
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
      const { parameters, formValues } = this;
      const { pathParameters = {} } = parameters || {};
      const { id } = pathParameters;
      const item = store.state;
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
    const { detail } = event;
    this.dialog = {
      title: "Success",
      message: html`<span>Item updated.</span>`,
      open: true,
    };
    this.successCallback(new CustomEvent("submitted", { detail }));
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

customElements.define("update-content", UpdateContent);
