import { LitElement, html, css } from "lit";
import "@meveo-org/mv-button";
import "@meveo-org/mv-font-awesome";
import "@meveo-org/mv-tooltip";

export class TableActions extends LitElement {
  static get properties() {
    return {
      row: { type: Object, attribute: false },
      "row-actions": { type: Object, attribute: false },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      .action-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .action-button {
        --mv-button-padding: 10px 10px;
        --mv-button-min-width: 30px;
      }

      mv-tooltip {
        --mv-tooltip-height: 38px;
      }
    `;
  }

  render() {
    const hasRowActions =
      !!this["row-actions"] && this["row-actions"].length > 0;
    return html`
      <div class="action-container">
        <mv-tooltip position="left">
          <mv-button
            class="action-button"
            type="outline"
            button-style="info"
            @button-clicked="${this.handleAction("edit")}"
          >
            <mv-fa icon="pencil-alt"></mv-fa>
          </mv-button>
          <span slot="tooltip-content">Edit</span>
        </mv-tooltip>

        <mv-tooltip position="left">
          <mv-button
            class="action-button"
            type="outline"
            button-style="error"
            @button-clicked="${this.handleAction("delete")}"
          >
            <mv-fa icon="trash-alt"></mv-fa>
          </mv-button>
          <div slot="tooltip-content">Delete</div>
        </mv-tooltip>
      </div>
    `;
  }

  renderRowActions = () =>
    this["row-actions"].map(
      (action) => html`
        <mv-tooltip position="left">
          <mv-button
            class="action-button"
            type="outline"
            @button-clicked="${this.handleAction("run-action", action)}"
          >
            <mv-fa icon="play"></mv-fa>
          </mv-button>
          <div slot="tooltip-content">${action.label}</div>
        </mv-tooltip>
      `
    );

  handleAction = (eventName, action) => (event) => {
    const { row } = this;
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { row, event, action },
      })
    );
  };
}

customElements.define("table-actions", TableActions);
