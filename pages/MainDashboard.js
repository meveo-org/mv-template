import { LitElement, html, css } from "lit";
import * as config from "../config.js";
import "@meveo-org/mv-container";
import { modelEndpoints } from "../service/Endpoint.js";
import "../components/DashboardTile.js";
import "../components/layout/PageLayout.js";

export default class MainDashboard extends LitElement {
  static get properties() {
    return {
      ...super.properties,
      auth: { type: Object, attribute: false },
      count: { type: Object, attribute: false },
      entities: { type: Object, attribute: false },
    };
  }

  static get styles() {
    return css`
      h1 {
        margin-top: 0;
      }

      .tiles {
        width: calc(100% - 40px);
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 10px;
      }
    `;
  }

  constructor() {
    super();
    this.auth = null;
    this.count = {};
    this.entities = null;
  }

  render() {
    return html`
        <mv-container>
          <h1>Dashboard</h1>
          <div class="tiles">
            ${Object.keys(this.entities || {}).map((key) => {
              const entity = this.entities[key];
              return html`
                <dashboard-tile
                  entity-code="${entity.code}"
                  title="${entity.label}"
                  item-count="${this.count[entity.code] || 0}"
                ></dashboard-tile>
              `;
            })}
          </div>
        </mv-container>
    `;
  }

  connectedCallback() {
    // call api to load entity counts
    Object.keys(this.entities).forEach((key) => {
      const entity = this.entities[key];
      const endpointInterface = modelEndpoints(entity).LIST;
      endpointInterface.executeApiCall(
        { config, token: this.auth.token },
        this.submitSuccess(entity),
        this.submitFailed(entity)
      );
    });
    super.connectedCallback();
  }

  submitSuccess = (entity) => (event) => {
    this.count = {
      ...this.count,
      [entity.code]: event.detail.result.count || 0,
    };
  };

  submitFailed = (entity) => (event) => {
    console.error("Encountered error while retrieving list details.");
    console.error("entity: ", entity);
    console.error("event.detail: ", JSON.stringify(event.detail, null, 2));
  };
}

customElements.define("main-dashboard", MainDashboard);
