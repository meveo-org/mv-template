import { ENTITIES } from "../../model/index.js";
import { findEntity, buildProperties, buildModelFields } from "utils";
import UpdatePageTemplate from "../../components/page_templates/UpdatePageTemplate.js";

const entityCode = "Parent";
const entity = findEntity(ENTITIES, entityCode);
const properties = buildProperties(entity);
const mappings = buildModelFields(entity);

export default class ParentEntityUpdatePage extends UpdatePageTemplate {
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

customElements.define("parent-entity-update-page", ParentEntityUpdatePage);
