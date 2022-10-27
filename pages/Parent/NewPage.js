import NewPageTemplate from "../../components/page_templates/NewPageTemplate.js";
import { parseModelDetails } from "../../utils/index.js";
import { MODELS } from "../../model/index.js";

const entityCode = "Parent";
const { properties, mappings } = parseModelDetails(entityCode, MODELS);

export default class ParentEntityNewPage extends NewPageTemplate {
  static get properties() {
    return {
      ...super.properties,
      ...properties,
    };
  }

  get model() {
    return {
      entity: this.entity,
      mappings: [...mappings],
    };
  }

  constructor() {
    super();
    this.entity = null;
  }
}

customElements.define("parent-entity-new-page", ParentEntityNewPage);
