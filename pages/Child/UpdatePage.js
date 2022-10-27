import UpdatePageTemplate from "../../components/page_templates/UpdatePageTemplate.js";
import { parseModelDetails } from "../../utils/index.js";
import { MODELS } from "../../model/index.js";

const entityCode = "Child";
const { properties, mappings } = parseModelDetails(entityCode, MODELS);

export default class ChildEntityUpdatePage extends UpdatePageTemplate {
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

customElements.define("child-entity-update-page", ChildEntityUpdatePage);