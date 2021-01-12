import { LitElement, html, css } from "lit-element";
import * as config from "config";
import { validate, clearForm } from "mv-form-utils";
import { EMPTY_DIALOG } from "utils";
import { modelInterfaces } from "../../service/EndpointInterface.js";
import "mv-button";
import "mv-container";
import "mv-dialog";
import "mv-font-awesome";
import "mv-form";
import "mv-form-field";
import "mv-tooltip";
import "../../components/form/FormField.js";
import "../layout/PageLayout.js";
import "../page_templates/content/NewContent.js";

export default class NewPageTemplate extends LitElement {
  static get properties() {
    return {
      name: { type: String, attribute: true },
      storageModes: { type: String, attribute: "storage-modes" },
      entity: { type: Object, attribute: false, reflect: true },
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
    const { code } = this.entity;
    return html`
      <page-layout>
        <new-content
          name="${code}"
          storage-modes="${this.storageModes}"
          .entity="${this.entity}"
          @failed="${this.submitFailed}"
          @submitted="${this.submitSuccess}"
          @cancel="${this.cancel}"
        ></new-content>
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
    this.dispatchEvent(new CustomEvent("cancel"));
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

  submitSuccess = (event) => {
    const {
      detail: { result },
    } = event;
    this.dialog = {
      title: "Success",
      message: html`<span>Item saved.</span>`,
      open: true,
    };
    this.dispatchEvent(
      new CustomEvent("submitted", {
        detail: { result },
      })
    );
    // history.pushState(null, "", `./${this.entity.code}/update/${uuid}`);
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
    this.dispatchEvent(
      new CustomEvent("failed", {
        detail: { error },
      })
    );
  };

  closeDialog = () => {
    this.dialog = { ...EMPTY_DIALOG };
  };
}

customElements.define("new-page-template", NewPageTemplate);
