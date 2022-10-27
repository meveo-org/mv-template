import { LitElement, html, css } from "lit";
import "@meveo-org/mv-button";
import "@meveo-org/mv-font-awesome";
import "../components/layout/PageLayout.js";
import * as config from "../config.js";

export default class DashboardTile extends LitElement {
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      entityCode: { type: String, attribute: "entity-code" },
      itemCount: { type: String, attribute: "item-count" },
    };
  }

  static get styles() {
    return css`
      h1 {
        margin: 0;
      }

      mv-button {
        --mv-button-padding: 10px 20px;
      }

      .tile-contents {
        display: grid;
        align-items: center;
        justify-content: space-between;
        justify-items: center;
        grid-auto-flow: column;        
        padding: 20px;
        box-shadow: var(
          --mv-container-shadow,
          0 0 13px 0 rgba(42, 42, 42, 0.65)
        );
        border: 1px solid #bfbfbf;
        border-radius: 5px;
      }

      .item-count {
        font-size: var(--font-size-m, 16px);
      }
    `;
  }

  render() {
    const oneOrMore = `${this.itemCount} ${
      this.itemCount > 1 ? "items" : "item"
    }`;
    return html`
      <div class="tile-contents">
        <h1>${this.title}</h1>
        ${this.itemCount < 1
          ? html`
              <mv-button type="rounded" @button-clicked="${this.create}">
                <mv-fa icon="plus"></mv-fa>New
              </mv-button>
            `
          : html`
              <mv-button
                type="rounded"
                @button-clicked="${this.list}"
                button-style="info"
              >
                ${oneOrMore}
              </mv-button>
            `}
      </div>
    `;
  }

  create() {
    history.pushState(null, "", `${config.BASE_PATH}/${this.entityCode}/new`);
    window.router.goto(`${config.BASE_PATH}/${this.entityCode}/new`);
  }

  list() {
    history.pushState(null, "", `${config.BASE_PATH}/${this.entityCode}/list`);
    window.router.goto(`${config.BASE_PATH}/${this.entityCode}/list`);
  }
}

customElements.define("dashboard-tile", DashboardTile);
