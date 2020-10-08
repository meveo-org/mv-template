import { LitElement, html, css } from "lit-element";
import "mv-container";
import "../components/DashboardTile.js";
import "../components/layout/PageLayout.js";

export default class MainDashboard extends LitElement {
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
  render() {
    return html`
      <page-layout>
        <mv-container>
          <h1>Dashboard</h1>
          <div class="tiles">
            <dashboard-tile
              entity-code="demo"
              title="Person"
              item-count="1"
            ></dashboard-tile>
            <dashboard-tile
              entity-code="demo"
              title="Mission"
              item-count="0"
            ></dashboard-tile>
            <dashboard-tile
              entity-code="demo"
              title="Profile"
              item-count="12"
            ></dashboard-tile>
            <dashboard-tile
              entity-code="demo"
              title="Company"
              item-count="8"
            ></dashboard-tile>
          </div>
        </mv-container>
      </page-layout>
    `;
  }
}

customElements.define("main-dashboard", MainDashboard);
