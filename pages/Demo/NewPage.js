import { html, css } from "lit-element";
import { MvElement } from "mv-element";
import * as config from "config";
import { ENTITY } from "../model/Demo.js";
import { validate, matchError, clearForm } from "mv-form-utils";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-form";
import "mv-form-field";
import "mv-tooltip";
import "../components/form/FormField.js";
import "../components/layout/PageLayout.js";

export default class NewPage extends MvElement {
  static get properties() {
    console.log("inside properties: ", ENTITY);
    return {
      ...super.properties,
      formFields: { type: Array, attribute: false, reflect: true },
      schema: { type: Object, attribute: false, reflect: true },
      refSchemas: { type: Array, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
    };
  }

  static get model() {
    console.log("inside model: ", ENTITY);
    return {
      modelClass: "Demo",
      mappings: [
        { property: "name", value: "name" },
        { property: "description", value: "description" },
      ],
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

  render() {
    const { schema, refSchemas, formFields } = ENTITY;
    return html`
      <page-layout>
        <mv-container>
          <mv-form
            .store="${this.store}"
            .schema="${schema}"
            .refSchemas="${refSchemas}"
          >
            <div class="form-grid">
              ${(formFields || []).map(
                (formField) =>
                  html`<form-field .field="${formField}"></form-field>`
              )}
            </div>

            <div class="button-grid">
              <mv-button
                @button-clicked="${clearForm(null)}"
                button-style="info"
              >
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
      </page-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.entity =
      this.entity || findEntity(config, this.entity.code || this.code);
    this.addEventListener("update-errors", this.handleErrors);
    this.addEventListener("clear-errors", this.clearErrors);
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
    history.pushState(null, "", `./list/${this.entity.code}`);
  };

  save = () => {
    const errors = validate(DemoSchema, this.store.state, null, null, [
      DemoChildSchema,
    ]);
    const hasError = errors && Object.keys(errors).some((key) => !!errors[key]);
    if (hasError) {
      console.log("errors :", errors);
    } else {
      const item = this.store.state;
      console.log("item: ", item);
    }
  };
}

customElements.define("new-page", NewPage);
