import { LitElement, html, css } from "lit-element";
import { findEntity } from "utils";
import { changeField, matchError } from "mv-form-utils";
import { ENTITIES } from "models";
import FieldTemplate from "./FieldTemplate.js";
import "mv-button";
import "mv-dialog";
import "mv-form-field";
import "mv-tooltip";
import "../../page_templates/content/ListContent.js";
import "../../page_templates/content/NewContent.js";
import "../../page_templates/content/UpdateContent.js";

export default class EntityField extends FieldTemplate {
  static get properties() {
    return {
      dialog: { type: Object, attribute: false, reflect: true },
      selectedItem: { type: Object, attribute: false, reflect: true },
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

      .field {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .input {
        width: calc(100% - var(--button-size));
        padding-top: 3px;
        position: relative;
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
        border: var(--entity-button-border);
        border-radius: var(--border-radius);
        min-height: var(--max-height);
        max-height: var(--max-height);
        width: 100%;
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
        padding-top: 40px;
        width: 100%;
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
  }

  renderInput() {
    const hasValue =
      !!this.value && Object.getOwnPropertyNames(this.value).length > 0;
    const selectionClass = hasValue ? "" : " no-selection";
    const fieldClass = `field-entry${selectionClass}`;
    const { label } = this.field || {};
    return html`
      ${hasValue
        ? html`
            <mv-tooltip>
              <button class="${fieldClass}" @click="${this.openList}">
                ${this.value.uuid}
              </button>
              <div slot="tooltip-content">
                ${Object.keys(this.value).map(
                  (key) => html`<b>${key}</b>: ${this.value[key]} `
                )}
              </div>
            </mv-tooltip>
          `
        : html`
            <button class="${fieldClass}" @click="${this.openList}">
              ${label}
            </button>
          `}
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
    `;
  }

  getListComponent = (name) => {
    const entity = findEntity(ENTITIES, name);
    return html`
      <div class="dialog-content">
        <list-content
          select-one
          with-checkbox
          .entity="${entity}"
          @edit-item="${this.editItem}"
          @new-item="${this.newItem}"
          @row-click="${this.selectRow}"
          @clear-selected="${this.clearSelected}"
        ></list-content>
      </div>
    `;
  };

  getNewItemComponent = (name) => {
    const entity = findEntity(ENTITIES, name);
    return html`
      <div class="dialog-content">
        <new-content
          name="${name}"
          storage-modes="local"
          .entity="${entity}"
          @submitted="${this.submitNew}"
          @cancel="${this.openList}"
        ></new-content>
      </div>
    `;
  };

  getUpdateItemComponent = (name, row) => {
    const entity = findEntity(ENTITIES, name);
    return html`
      <div class="dialog-content">
        <update-content
          name="${name}"
          storage-modes="local"
          .entity="${entity}"
          .formValues="${row}"
          @submitted="${this.submitUpdate}"
          @cancel="${this.openList}"
        ></update-content>
      </div>
    `;
  };

  openList = () => {
    const { name } = this.field;
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getListComponent(name),
      noFooter: false,
    };
  };

  closeDialog = () => {
    this.dialog = { ...this.dialog, open: false };
  };

  editItem = (event) => {
    const {
      detail: { row },
    } = event;
    const { name } = this.field;
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getUpdateItemComponent(name, row),
      noFooter: true,
    };
  };

  newItem = () => {
    const { name } = this.field;
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getNewItemComponent(name),
      noFooter: true,
    };
  };

  selectRow = (event) => {
    const {
      detail: { row },
    } = event;
    this.selectedItem = row;
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
