import { html, css } from "lit";
import * as config from "../../../config.js";
import { validate, clearForm } from "@meveo-org/mv-form/utils/index.js";
import { EMPTY_DIALOG, toTagName } from "../../../utils/index.js";
import { modelEndpoints } from "../../../service/Endpoint.js";
import "@meveo-org/mv-button";
import "@meveo-org/mv-dialog";
import "@meveo-org/mv-dropdown";
import "@meveo-org/mv-font-awesome";
import "@meveo-org/mv-form";
import "@meveo-org/mv-form/mv-form-field.js";
import "@meveo-org/mv-tab";
import "@meveo-org/mv-tooltip";
import "../../form/FormField.js";
import { MvElement } from "@meveo-org/mv-element";

export default class UpdateContent extends MvElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      entity: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
      permissions: { type: Object, attribute: false },
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
      mv-dropdown {
        --mv-dropdown-trigger-height: 4rem;
      }

      ul {
        padding: 0;
        margin: 0.3rem 0;
      }

      li {
        display: block;
        width: calc(100% - 2rem);
        padding: 1rem;
        white-space: nowrap;
        cursor: pointer;
      }

      li:hover {
        list-style: none;
        display: block;
        background: #1d9bc9;
        color: #ffffff;
      }

      .action-section {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }

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
    this.auth = null;
    this.dialog = { ...EMPTY_DIALOG };
    this.fields = [];
    this.config = config;
  }

  render() {
    const { schema, refSchemas, formFields, actions } = this.entity;
    const hasMultipleTabs = (formFields || []).length > 1;
    const entityActions = actions.filter(
      (action) => action.applicableToEntityInstance
    );
    return html`
      <div>
        <mv-form
          .store="${this.store}"
          .schema="${schema}"
          .refSchemas="${refSchemas}"
        >
          <div class="form-content">
            ${hasMultipleTabs
              ? this.renderGroup(formFields, schema)
              : (formFields && this.renderFields(formFields[0], schema))}

            <div class="action-section">
              <div class="standard-actions">
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
              <div class="custom-actions">
                <mv-dropdown
                  container
                  toggle
                  justify="left"
                  position="bottom"
                  theme="light"
                >
                  <mv-dropdown trigger>
                    <mv-button>
                      More actions <mv-fa icon="chevron-down"></mv-fa>
                    </mv-button>
                  </mv-dropdown>
                  <mv-dropdown content theme="light">
                    <ul>
                      ${this.renderActions(entityActions)}
                    </ul>
                  </mv-dropdown>
                </mv-dropdown>
              </div>
            </div>
          </div>
        </mv-form>
      </div>
      <mv-dialog
        class="dialog-size"
        header-label="${this.dialog.title}"
        ?open="${this.dialog.open}"
        ?closeable="${this.dialog.closable}"
        ?no-right-button="${this.dialog.noButtons}"
        @close-dialog="${this.closeDialog}"
        no-left-button
      >
        <p>${this.dialog.message}</p>
        <span slot="footer">
          <mv-button @button-clicked="${this.closeDialog}">Close</mv-button>
        </span>
      </mv-dialog>
    `;
  }

  renderActions = (entityActions) =>
    entityActions.map(
      (action) => html`
        <li @click="${this.runAction(action)}">${action.label}</li>
      `
    );

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
    const { formFields } = this.entity;
    this.fields = formFields.reduce(
      (allFields, group) => [...allFields, ...group.fields],
      []
    );
    this.store.resetState(true);
    this.loadFormData();
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

  loadFormData = () => {
    const { entity, parameters, formValues } = this;
    const { pathParameters } = parameters || {};
    const { id } = pathParameters || {};
    const endpointInterface = modelEndpoints(entity).DETAIL;
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
    const {
      detail: { error },
    } = event;
    console.error("error: ", error);
    const { name, message } = error;
    let messageContent = null;
    if (Array.isArray(message)) {
      const [messageText, statusCode] = message;
      messageContent = html`
        <span>${messageText}</span><br />
        <small>${statusCode}</small>
      `;
    } else {
      messageContent = html`<span>${message}</span>`;
    }
    this.dialog = {
      title: name || "Error",
      message: messageContent,
      open: true,
    };
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
      const { parameters } = this;
      const { pathParameters = {} } = parameters || {};
      const { id } = pathParameters;
      const item = store.state;
      const endpoint = modelEndpoints(entity).UPDATE;
      const uuid = this.uuid || id;
      endpoint.executeApiCall(
        {
          token: this.auth.token,
          config,
          uuid,
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
    const {
      name,
      message: [message, statusCode],
    } = error;
    this.dialog = {
      title: name,
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

  actionSuccess = (action) => () => {
    this.dialog = {
      title: "Action Success",
      message: html`<span>${action.label} successfully executed.</span>`,
      open: true,
    };
  };

  showLoader = (action) => {
    this.dialog = {
      title: "Loading",
      message: html`
        <div class="action-loader">
          <div class="message">Invoking ${action.label} action.</div>
          <mv-fa icon="spinner" icon-props="fa-2x fa-pulse"></mv-fa>
        </div>
      `,
      open: true,
      closable: false,
      noButtons: true,
    };
  };

  runAction = (action) => () => {
    this.showLoader(action);
    const { entity, parameters, formValues } = this;
    const { pathParameters } = parameters || {};
    const { id } = pathParameters || {};
    const endpoint = modelEndpoints(entity).CUSTOM_ACTION;
    const entityValue = formValues || {};
    const uuid = entityValue.uuid || id;
    endpoint.executeApiCall(
      {
        token: this.auth.token,
        config,
        actionCode: action.code,
        runWith: { entities: [{ code: this.entity.code, uuid }] },
      },
      this.actionSuccess(action),
      this.handleErrors
    );
  };
}

customElements.define("update-content", UpdateContent);
