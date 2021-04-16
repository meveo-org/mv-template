import { LitElement, html, css } from "lit-element";
import { findEntity } from "utils";
import { changeField, matchError } from "mv-form-utils";
import * as config from "config";
import "mv-button";
import "mv-dialog";
import "mv-form-field";
import "mv-tooltip";
import "../page_templates/content/ListContent.js";
import "../page_templates/content/NewContent.js";
import "../page_templates/content/UpdateContent.js";

export default class EntityField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
      value: { type: Object, attribute: true, reflect: true },
      dialog: { type: Object, attribute: false, reflect: true },
      selectedItem: { type: Object, attribute: false, reflect: true },
      hideUuid: { type: Boolean, attribute: "hide-uuid" },
    };
  }

  static get styles() {
    return css`
      :host {
        --entity-field-font-size: var(--font-size-m, 16px);
        --input-padding: var(--entity-field-input-padding, 13.5px);
        --outside-padding: calc(var(--input-padding) * 2);
        --max-height: calc(
          var(--entity-field-font-size) + var(--outside-padding)
        );
        --border: 1px solid #4e686d;
        --border-radius: var(--entity-field-border-radius, 5px);
        --active-border: var(--entity-field-active-border, 1px solid #1d9bc9);
        --active-box-shadow: var(
          --entity-field-active-box-shadow,
          inset 0 0 9px 0 rgba(29, 155, 201, 0.3)
        );
      }

      .field-entry {
        outline: none;
        position: relative;
        display: grid;
        align-items: center;
        justify-items: start;
        background: transparent;
        border: var(--border);
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
    this.field = {};
    this.selectedItem = {};
    this.options = [];
    this.hideUuid = false;
    this.dialog = {
      open: false,
      content: html``,
    };
  }

  render() {
    const hasValue =
      !!this.value && Object.getOwnPropertyNames(this.value).length > 0;
    const selectionClass = hasValue ? "" : " no-selection";
    const fieldClass = `field-entry${selectionClass}`;
    const { code, label } = this.field || {};
    return html`
      <mv-form-field
        name="${code}"
        label-position="none"
        .error="${matchError(this.errors, code)}"
      >
        <div slot="field">
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
        </div>
      </mv-form-field>
      <mv-dialog
        class="entity-dialog"
        header-label="${label}"
        ?open="${this.dialog.open}"
        ?no-footer="${this.dialog.noFooter}"
        @close-dialog="${this.closeDialog}"
        @ok-dialog="${this.saveSelected}"
        right-label="Done"
        closeable
      >
        ${this.dialog.content}
      </mv-dialog>
    `;
  }

  getListComponent = (name) => {
    const entity = findEntity(config, name);
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
    const entity = findEntity(config, name);
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
    const entity = findEntity(config, name);
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

  saveSelected = (event) => {
    const { target } = event;
    changeField(target, {
      name: this.field.code,
      value: this.selectedItem,
      originalEvent: event,
    });
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
