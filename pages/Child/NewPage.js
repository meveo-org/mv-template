import { ENTITIES } from "models";
import { findEntity, buildProperties, buildModelFields } from "utils";
import NewPageTemplate from "../../components/page_templates/NewPageTemplate.js";

const entityCode = "Child";
const entity = findEntity(ENTITIES, entityCode);
const properties = buildProperties(entity);
const mappings = buildModelFields(entity);

export default class ChildEntityNewPage extends NewPageTemplate {
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

customElements.define("child-entity-new-page", ChildEntityNewPage);
