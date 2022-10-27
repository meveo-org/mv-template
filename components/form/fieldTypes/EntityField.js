import { html, css } from "lit";
import FieldTemplate from "./FieldTemplate.js";
import * as config from "../../../config.js";
import { modelEndpoints } from "../../../service/Endpoint.js";
import "@meveo-org/mv-button";
import "@meveo-org/mv-dialog";
import "@meveo-org/mv-form/mv-form-field.js";
import "@meveo-org/mv-tooltip";
import "../../page_templates/content/ListContent.js";
import "../../page_templates/content/NewContent.js";
import "../../page_templates/content/UpdateContent.js";

export default class EntityField extends FieldTemplate {
  static get properties() {
    return {
      auth: { type: Object, attribute: false },
      entity: { type: Object, attribute: false },
      dialog: { type: Object, attribute: false },
      errorDialog: { type: Object, attribute: false },
      selectedItem: { type: Object, attribute: false },
      hideUuid: { type: Boolean, attribute: "hide-uuid" },
    };
  }

  static get styles() {
    return css`
      :host {
        --button-size: 24px;
        --entity-field-font-size: var(--font-size-m, 16px);
        --input-padding: var(--entity-field-input-padding, 13.5px);
        --outside-padding: calc(var(--input-padding) * 2);
        --max-height: calc(
          var(--entity-field-font-size) + var(--outside-padding)
        );
        --entity-button-border: 1px solid #4e686d;
        --border-radius: var(--entity-field-border-radius, 5px);
        --active-border: var(--entity-field-active-border, 1px solid #1d9bc9);
        --active-box-shadow: var(
          --entity-field-active-box-shadow,
          inset 0 0 9px 0 rgba(29, 155, 201, 0.3)
        );
      }

      mv-button {
        --mv-button-margin: 0 0 0 5px;
        --mv-button-padding: 3px 4px;
        --mv-button-min-width: var(--button-size);
      }

      .button {
        height: var(--button-size);
      }

      .field-entry {
        outline: none;
        position: relative;
        display: grid;
        align-items: center;
        justify-items: start;
        background: transparent;
        width: 100%;
        border: var(--entity-button-border);
        border-radius: var(--border-radius);
        min-height: var(--max-height);
        max-height: var(--max-height);
        padding: var(--input-padding);
        font-size: var(--entity-field-font-size);
        color: var(--mv-input-color, #818181);
      }

      .field-entry:hover {
        cursor: pointer;
        border: var(--active-border);
        box-shadow: var(--active-box-shadow);
      }

      .no-selection {
        color: #c7c7c7;
      }

      .entity-dialog {
        --mv-dialog-max-height: 100%;
        --mv-dialog-width: calc(100% - 40px);
        --mv-dialog-content-height: 100%;
      }

      .dialog-content {
        padding: 1.8rem 0;
        width: 100%;
      }

      .dialog-size {
        --mv-dialog-width: 500px;
        --mv-dialog-max-height: 300px;
      }

      div[slot="tooltip-content"] {
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: flex-start;
        align-items: flex-start;
      }
    `;
  }

  constructor() {
    super();
    this.selectedItem = {};
    this.options = [];
    this.hideUuid = false;
    this.dialog = {
      open: false,
      content: html``,
    };
    this.errorDialog = {
      open: false,
      content: html``,
    };
    this.entity = null;
  }

  renderInput = () => {
    const hasValue =
      !!this.value && Object.getOwnPropertyNames(this.value).length > 0;
    const selectionClass = hasValue ? "" : " no-selection";
    const fieldClass = `field-entry${selectionClass}`;
    const { label } = this.field || {};
    return html`
      ${hasValue
        ? this.renderButtonValues(fieldClass)
        : this.renderButtonOnly(fieldClass, label)}
      <mv-dialog
        class="entity-dialog"
        header-label="${label}"
        ?open="${this.dialog.open}"
        ?no-footer="${this.dialog.noFooter}"
        @close-dialog="${this.closeDialog}"
        @ok-dialog="${this.change}"
        right-label="Done"
        closeable
      >
        ${this.dialog.content}
      </mv-dialog>
      <mv-dialog
        class="dialog-size"
        header-label="${this.errorDialog.title}"
        ?open="${this.errorDialog.open}"
        @close-dialog="${this.closeErrorDialog}"
        no-left-button
        closeable
      >
        <p>${this.errorDialog.message}</p>
        <span slot="footer">
          <mv-button @button-clicked="${this.closeErrorDialog}">
            Close
          </mv-button>
        </span>
      </mv-dialog>
    `;
  };

  renderButtonValues = (fieldClass) => {
    const { code, label, name, uuid } = this.value || {};
    let buttonLabel = label || name || code;
    buttonLabel = buttonLabel ? buttonLabel : (uuid || "").split("-")[0];
    return html`
      <mv-tooltip>
        <button class="${fieldClass}" @click="${this.openList}">
          ${buttonLabel}
        </button>
        <div slot="tooltip-content">
          ${Object.keys(this.value).map(this.renderEntityValue)}
        </div>
      </mv-tooltip>
    `;
  };

  renderEntityValue = (key) =>
    html`<span><b>${key}</b>: ${this.value[key]}</span>`;

  renderButtonOnly = (fieldClass, label) =>
    html`
      <button class="${fieldClass}" @click="${this.openList}">${label}</button>
    `;

  getListComponent = () => {
    return html`
      <div class="dialog-content">
        <list-content
          select-one
          with-checkbox
          no-list-actions
          no-new-button
          no-rows-per-page
          .auth="${this.auth}"
          .entity="${this.entity}"
          @edit-item="${this.editItem}"
          @new-item="${this.newItem}"
          @row-click="${this.selectRow}"
          @clear-selected="${this.clearSelected}"
        ></list-content>
      </div>
    `;
  };

  getNewItemComponent = () => {
    return html`
      <div class="dialog-content">
        <new-content
          name="${this.entity.code}"
          storage-modes="local"
          .auth="${this.auth}"
          .entity="${this.entity}"
          @submitted="${this.submitNew}"
          @cancel="${this.openList}"
        ></new-content>
      </div>
    `;
  };

  getUpdateItemComponent = (row) => {
    return html`
      <div class="dialog-content">
        <update-content
          name="${this.entity.code}"
          storage-modes="local"
          .auth="${this.auth}"
          .entity="${this.entity}"
          .formValues="${row}"
          @submitted="${this.submitUpdate}"
          @cancel="${this.openList}"
        ></update-content>
      </div>
    `;
  };

  updated = (changedProperties) => {
    if (changedProperties.has("value")) {
      const isStringValue = this.value && typeof this.value === "string";
      if (isStringValue) {
        const endpointInterface = modelEndpoints(this.entity).DETAIL;
        endpointInterface.executeApiCall(
          {
            config,
            token: this.auth.token,
            uuid: this.value,
          },
          this.updateDetails,
          this.handleErrors
        );
      }
    }
  };

  updateDetails = (originalEvent) => {
    const {
      detail: { result },
    } = originalEvent;
    this.value = result;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: { ...this.value }, originalEvent: { target: this } },
      })
    );
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
    this.errorDialog = {
      title: name || "Error",
      message: messageContent,
      open: true,
    };
  };

  openList = () => {
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getListComponent(),
      noFooter: false,
    };
  };

  closeDialog = () => {
    this.dialog = { ...this.dialog, open: false };
  };

  closeErrorDialog = () => {
    this.errorDialog = { ...this.errorDialog, open: false };
  };

  editItem = (event) => {
    const {
      detail: { row },
    } = event;
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getUpdateItemComponent(row),
      noFooter: true,
    };
  };

  newItem = () => {
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getNewItemComponent(),
      noFooter: true,
    };
  };

  selectRow = (event) => {
    const {
      detail: { selected },
    } = event;
    const [item] = selected;
    this.selectedItem = item;
  };

  change = (originalEvent) => {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.selectedItem, originalEvent },
      })
    );
    this.closeDialog();
  };

  submitNew = () => {
    this.openList();
  };

  submitUpdate = () => {
    this.openList();
  };

  searchOptions = () => {};

  clearSelected = () => {
    this.selectedItem = {};
  };
}

customElements.define("entity-field", EntityField);
