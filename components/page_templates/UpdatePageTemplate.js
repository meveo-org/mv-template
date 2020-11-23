import { html, css } from "lit-element";
import { MvElement } from "mv-element";
import * as config from "config";
import { findEntity, buildProperties, buildModelFields } from "utils";
import { validate, clearForm } from "mv-form-utils";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-form";
import "mv-form-field";
import "mv-tooltip";
import "../../components/form/FormField.js";
import "../../components/layout/PageLayout.js";

export default class UpdatePageTemplate extends MvElement {
  static get properties() {
    return {
      entity: { type: Object, attribute: false, reflect: true },
      formFields: { type: Array, attribute: false, reflect: true },
      schema: { type: Object, attribute: false, reflect: true },
      refSchemas: { type: Array, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
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
    const { schema, refSchemas, formFields } = this.entity;
    return html`
      <page-layout>
        <mv-container>
          <mv-form
            .store="${this.store}"
            .schema="${schema}"
            .refSchemas="${refSchemas}"
          >
            <div class="form-grid">
              ${(formFields || []).map((group) => {
                return (group.fields || []).map((formField) => {
                  const value = this[formField.code];
                  return html`
                    <form-field
                      .field="${{ ...formField, value }}"
                    ></form-field>
                  `;
                });
              })}
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
    const {
      parameters: { pathParameters },
    } = this;
    const { id } = pathParameters;
    console.log("id: ", id);
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
    history.pushState(null, "", `./${this.entity.code}/list`);
  };

  save = () => {
    const errors = validate(
      this.entity.schema,
      this.store.state,
      null,
      null,
      this.entity.refSchemas
    );
    const hasError = errors && Object.keys(errors).some((key) => !!errors[key]);
    if (hasError) {
      console.log("errors :", errors);
    } else {
      const item = this.store.state;
      console.log("item: ", item);
    }
  };
}

customElements.define("update-page-template", UpdatePageTemplate);
