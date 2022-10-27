import { html, css } from "lit";
import * as config from "../../../config.js";
import { validate, clearForm } from "@meveo-org/mv-form/utils/index.js";
import { EMPTY_DIALOG, toTagName } from "../../../utils/index.js";
import { modelEndpoints } from "../../../service/Endpoint.js";
import { MvElement } from "@meveo-org/mv-element";
import "@meveo-org/mv-button";
import "@meveo-org/mv-dialog";
import "@meveo-org/mv-font-awesome";
import "@meveo-org/mv-form";
import "@meveo-org/mv-form/mv-form-field.js";
import "@meveo-org/mv-tab";
import "@meveo-org/mv-tooltip";
import "../../form/FormField.js";

export default class NewContent extends MvElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      entity: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
      permissions: { type: Object, attribute: false },
      errors: { type: Array, attribute: false },
      dialog: { type: Object, attribute: false },
    };
  }

  static get styles() {
    return css`
      .form-grid {
        display: flex;
        flex-direction: column;
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
    this.config = config;
    this.auth = null;
    this.dialog = { ...EMPTY_DIALOG };
  }

  render() {
    const { schema, refSchemas, formFields } = this.entity;
    const hasMultipleTabs = (formFields || []).length > 1;
    return html`
      <div>
        <div class="form-container">
          <mv-form
            .store="${this.store}"
            .schema="${schema}"
            .refSchemas="${refSchemas}"
          >
            <div class="form-content">
              ${hasMultipleTabs
                ? this.renderGroup(formFields, schema)
                : (formFields && this.renderFields(formFields[0], schema))}

              <div class="button-grid">
                <mv-button
                  @button-clicked="${this.clearAll}"
                  button-style="info"
                >
                  <mv-fa icon="undo"></mv-fa>Clear
                </mv-button>
                <mv-button
                  @button-clicked="${this.cancel}"
                  button-style="cancel"
                >
                  <mv-fa icon="ban"></mv-fa>Cancel
                </mv-button>
                <mv-button @button-clicked="${this.save}">
                  <mv-fa icon="save"></mv-fa>Save
                </mv-button>
              </div>
            </div>
          </mv-form>
        </div>
      </div>
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

  renderTabGroup = (schema) => (group) => {
    const key = toTagName(group.label);
    return html`
      <mv-tab tab key="${key}">${group.label}</mv-tab>
      <mv-tab content key="${key}">
        ${this.renderFields(group, schema)}
      </mv-tab>
    `;
  };

  renderGroup = (formFields, schema) =>
    html`
      <mv-tab group type="rounded">
        ${(formFields || []).map(this.renderTabGroup(schema))}
      </mv-tab>
    `;

  renderField = (schema) => (formField) => {
    const value = this[formField.code];
    const { properties = {} } = schema || {};
    const schemaProp = properties[formField.code] || {};
    return html`
      <form-field
        .auth="${this.auth}"
        .entity="${this.entity}"
        .entities="${this.entities}"
        .field="${formField}"
        .schemaProp="${schemaProp}"
        .value="${value}"
        .errors="${this.errors}"
      ></form-field>
    `;
  };

  renderFields = (group, schema) => html`
    <div class="form-grid">
      ${(group.fields || []).map(this.renderField(schema))}
    </div>
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("update-errors", this.handleFieldErrors);
    this.addEventListener("clear-errors", this.clearErrors);
    this.store.resetState(true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("update-errors", this.handleFieldErrors);
    this.removeEventListener("clear-errors", this.clearErrors);
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

  clearAll = () => {
    this.clearErrors();
    const target = this.renderRoot.querySelector("mv-form");
    clearForm()({ target });
  };

  clearErrors = () => {
    this.errors = null;
  };

  handleFieldErrors = (event) => {
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
      const endpointInterface = modelEndpoints(entity).NEW;
      endpointInterface.executeApiCall(
        {
          config,
          token: this.auth.token,
          ...item,
        },
        this.submitSuccess,
        this.submitFailed
      );
    }
  };

  cancel = () => {
    this.clearAll();
    this.cancelCallback(new CustomEvent("cancel"));
  };

  submitSuccess = (event) => {
    const { detail } = event;
    this.dialog = {
      status: "success",
      title: "Success",
      message: html`<span>Item saved.</span>`,
      open: true,
      detail,
    };
  };

  submitFailed = (event) => {
    const {
      detail: { error },
    } = event;
    console.error("error: ", error);
    let messageContent = null;
    const { name, message } = error;
    if (Array.isArray(message)) {
      const [messageText, statusCode] = error;
      messageContent = html`
        <span>${messageText}</span><br />
        <small>${statusCode}</small>
      `;
    } else {
      messageContent = html`<span>${error}</span>`;
    }

    this.dialog = {
      status: "fail",
      title: name || "Error",
      message: messageContent,
      open: true,
    };
    this.failCallback(
      new CustomEvent("failed", {
        detail: { error },
      })
    );
  };

  closeDialog = () => {
    const { status, detail } = this.dialog;
    this.dialog = { ...EMPTY_DIALOG };
    if (status === "success") {
      this.clearAll();
      this.successCallback(new CustomEvent("submitted", { detail }));
    }
  };
}

customElements.define("new-content", NewContent);
