import { LitElement, html, css } from "lit-element";
import { findEntity, toPascalName } from "utils";
import { changeField, matchError } from "mv-form-utils";
import * as config from "config";
import "mv-button";
import "mv-form-field";
import "mv-dialog";
import "../page_templates/content/ListContent.js";
import "../page_templates/content/NewContent.js";
import "../page_templates/content/UpdateContent.js";

export default class EntityField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Object, attribute: false, reflect: true },
      value: { type: Object, attribute: true, reflect: true },
      dialog: { type: Object, attribute: false, reflect: true },
      selectedItem: { type: Object, attribute: false, reflect: true },
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
          <button class="${fieldClass}" @click="${this.openList}">
            ${hasValue
              ? Object.getOwnPropertyNames(this.value)
                  .map((key) => this.value[key])
                  .join(" | ")
              : label}
          </button>
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

  getListComponent = (code) => html`
    <div class="dialog-content">
      <list-content
        select-one
        with-checkbox
        code="${toPascalName(code)}"
        @edit-item="${this.editItem}"
        @new-item="${this.newItem}"
        @row-click="${this.selectRow}"
      ></list-content>
    </div>
  `;

  getNewItemComponent = (code) => {
    const name = toPascalName(code);
    const entity = findEntity(config, name);
    return html`
      <div class="dialog-content">
        <new-content
          name="${name}"
          storage-modes="local"
          .entity="${entity}"
          @submitted="${this.submitNew}"
          @failed="${this.failNew}"
          @cancel="${this.openList}"
        ></new-content>
      </div>
    `;
  };

  getUpdateItemComponent = (code) => {
    const name = toPascalName(code);
    const entity = findEntity(config, name);
    return html`
      <div class="dialog-content">
        <update-content
          name="${name}"
          storage-modes="local"
          .entity="${entity}"
          @submitted="${this.submitUpdate}"
          @failed="${this.failUpdate}"
          @cancel="${this.openList}"
        ></update-content>
      </div>
    `;
  };

  openList = () => {
    console.log("opening dialog");
    const { code } = this.field;
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getListComponent(code),
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
    console.log("editing row: ", row);
    const { code } = this.field;
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getUpdateItemComponent(code),
      noFooter: true,
    };
  };

  newItem = () => {
    console.log("create new item");
    const { code } = this.field;
    this.dialog = {
      ...this.dialog,
      open: true,
      content: this.getNewItemComponent(code),
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

  submitNew = (event) => {
    console.log(">>>>>>>>>>>>submitNew", event.detail);
  };

  failNew = (event) => {
    console.log(">>>>>>>>>>>>failNew", event.detail);
  };

  submitUpdate = (event) => {
    console.log(">>>>>>>>>>>>submitUpdate", event.detail);
  };

  failUpdate = (event) => {
    console.log(">>>>>>>>>>>>failUpdate", event.detail);
  };

  searchOptions = () => {};
  clearSelected = () => {};
}

customElements.define("entity-field", EntityField);
