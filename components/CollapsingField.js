import { LitElement, html, css } from "lit";
import "@meveo-org/mv-container";
import "@meveo-org/mv-tooltip";
import "../components/layout/PageLayout.js";

export default class CollapsingField extends LitElement {
  static get properties() {
    return {
      ...super.properties,
      show: { type: Boolean },
      previewText: { type: String, attribute: "preview-text" },
    };
  }

  static get styles() {
    return css`
      button {
        border: none;
        outline: none;
        box-shadow: none;
        background: none;
        padding: 3px 5px;
        margin-left: -5px;
        cursor: pointer;
      }

      button:hover {
        color: #ffffff;
        background: #3999c1;
      }
    `;
  }

  render() {
    return html`
      <mv-tooltip>
        <div slot="tooltip-content">${`Click to ${this.show ? "hide" : "show"} details`}</div>
        <button @click="${this.toggleVisibility}">
          ${this.show
            ? html`<mv-fa icon="chevron-down"></mv-fa>`
            : html`<mv-fa icon="chevron-right"></mv-fa>`}
        </button>
      </mv-tooltip>
      <span>
        ${this.show
          ? html`<slot></slot>`
          : `${this.previewText || "See details"}`}
      </span>
    `;
  }

  toggleVisibility(event) {
    event.stopPropagation();
    this.show = !this.show;
  }
}

customElements.define("collapsing-field", CollapsingField);
