import { LitElement, html, css } from "lit-element";
import * as config from "config";
import { extractEntities } from "utils";
import "mv-container";
import "../components/DashboardTile.js";
import "../components/layout/PageLayout.js";
import EndpointInterface from "../service/EndpointInterface.js";

export default class MainDashboard extends LitElement {
  static get properties() {
    return {
      ...super.properties,
      entities: { type: Array, attribute: false, reflect: true },
      count: { type: Object, attribute: false, reflect: true },
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
    this.entities = [];
    this.count = {};
  }

  render() {
    return html`
      <page-layout>
        <mv-container>
          <h1>Dashboard</h1>
          <div class="tiles">
            ${this.entities.map(
              (entity) => html`
                <dashboard-tile
                  entity-code="${entity.code}"
                  title="${entity.label}"
                  item-count="${this.count[entity.code] || 0}"
                ></dashboard-tile>
              `
            )}
          </div>
        </mv-container>
      </page-layout>
    `;
  }

  connectedCallback() {
    this.entities = extractEntities(config) || [];
    // call api to load entity counts
    this.entities.forEach((entity) => {
      const endpointInterface = new EndpointInterface(
        entity.code,
        "POST",
        "LIST"
      );
      endpointInterface.executeApiCall(
        this,
        {
          noAuth: true,
          config,
        },
        this.submitSuccess(entity),
        this.submitFailed(entity)
      );
    });
    super.connectedCallback();
  }

  submitSuccess = (entity) => (event) => {
    this.count = {
      ...this.count,
      [entity.code]: event.detail.result.length || 0,
    };
  };

  submitFailed = (entity) => (event) => {
    console.log("Encountered error while retrieving list details.");
    console.log("entity: ", entity);
    console.log("event.detail: ", JSON.stringify(event.detail, null, 2));
  };
}

customElements.define("main-dashboard", MainDashboard);
