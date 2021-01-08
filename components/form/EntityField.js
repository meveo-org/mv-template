import { LitElement, html, css } from "lit-element";
import { toPascalName } from "utils";
import "mv-button";
import "mv-form-field";
import "mv-dialog";
import "../page_templates/ListPageTemplate.js";
export default class EntityField extends LitElement {
  static get properties() {
    return {
      field: { type: Object, attribute: false, reflect: true },
      errors: { type: Object, attribute: false, reflect: true },
      value: { type: Object, attribute: false, reflect: true },
      dialog: { type: Object, attribute: false, reflect: true },
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
    this.options = [];
    this.dialog = {
      open: false,
      content: html``,
    };
  }

  render() {
    console.log("this.value: ", this.value);
    console.log("this.field", this.field);
    const hasValue = !!this.value;
    const selectionClass = hasValue ? "" : " no-selection";
    const fieldClass = `field-entry${selectionClass}`;
    const { code, label, valueRequired } = this.field || {};
    const value = hasValue ? this.value : label;
    return html`
      <button class="${fieldClass}" @click="${this.openDialog}">
        ${value}
      </button>
      <mv-dialog
        class="entity-dialog"
        header-label="${label}"
        ?open="${this.dialog.open}"
        @close-dialog="${this.closeDialog}"
        no-left-button
        no-right-button
        closeable
      >
        ${this.dialog.content}
      </mv-dialog>
    `;
  }

  openDialog = () => {
    console.log("opening dialog");
    const { code } = this.field;
    const listComponent = html`
      <div class="dialog-content">
        <list-page-template code="${toPascalName(code)}"></list-page-template>
      </div>
    `;
    this.dialog = { ...this.dialog, open: true, content: listComponent };
  };
  closeDialog = () => {
    this.dialog = { ...this.dialog, open: false };
  };
  searchOptions = () => {};
  clearSelected = () => {};
}

customElements.define("entity-field", EntityField);
