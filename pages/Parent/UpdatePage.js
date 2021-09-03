import UpdatePageTemplate from "../../components/page_templates/UpdatePageTemplate.js";
import { parseModelDetails } from "utils";

const entityCode = "Parent";
const { properties, mappings } = parseModelDetails(entityCode);

export default class ParentEntityUpdatePage extends UpdatePageTemplate {
  static get properties() {
    return {
      ...super.properties,
      ...properties,
    };
  }

  get model() {
    return {
      modelClass: this.entity.schema,
      mappings: [...mappings],
    };
  }

  constructor() {
    super();
    this.entity = null;
  }
}

customElements.define("parent-entity-update-page", ParentEntityUpdatePage);