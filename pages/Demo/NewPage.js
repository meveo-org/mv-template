import { html, css } from "lit-element";
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
import NewPageTemplate from "../../components/page_templates/NewPageTemplate.js";

const entityCode = "Demo";
const entity = findEntity(config, entityCode);
const properties = buildProperties(entity);
const mappings = buildModelFields(entity);
export default class NewPage extends NewPageTemplate {
  static get properties() {
    return {
      ...super.properties,
      ...properties,
    };
  }

  static get model() {
    return {
      modelClass: entity.schema,
      mappings: [...mappings],
    };
  }

  constructor() {
    super();
    this.entity = entity;
  }
}

customElements.define("demo-new-page", NewPage);
