import { html, css } from "lit-element";
import { MvElement } from "mv-element";
import { validate, matchError, clearForm } from "mv-form-utils";
import DemoSchema from "DemoSchema";
import DemoChildSchema from "DemoChildSchema";
import "mv-button";
import "mv-container";
import "mv-font-awesome";
import "mv-form";
import "mv-form-field";
import "mv-tooltip";
import "../../components/layout/PageLayout.js";

export default class NewDemo extends MvElement {
  static get properties() {
    return {
      ...super.properties,
      name: { type: String, attribute: false, reflect: true },
      description: { type: String, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
    };
  }

  static get model() {
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
    return html`
      <page-layout>
        <mv-container>
          <mv-form
            .store="${this.store}"
            .schema="${DemoSchema}"
            .refSchemas="${[DemoChildSchema]}"
          >
            <div class="form-grid">
              <mv-form-field
                name="name"
                label="Name"
                label-position="top"
                .value="${this.name}"
                .error="${matchError(this.errors, "name")}"
              ></mv-form-field>
              <mv-form-field
                name="description"
                label="Description"
                label-position="top"
                .value="${this.description}"
                .error="${matchError(this.errors, "description")}"
              ></mv-form-field>
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
    history.pushState(null, "", "./demo/list");
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

customElements.define("new-demo", NewDemo);
