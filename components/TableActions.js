import { LitElement, html, css } from "lit-element";
import "mv-button";
import "mv-font-awesome";
import "mv-tooltip";

export class TableActions extends LitElement {
  static get properties() {
    return {
      row: { type: Object, attribute: false },
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

  handleAction = (action) => (event) => {
    const { row } = this;
    this.dispatchEvent(
      new CustomEvent(action, {
        detail: { row, event },
      })
    );
  };
}

customElements.define("table-actions", TableActions);
