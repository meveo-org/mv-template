import { LitElement, html, css } from "lit-element";
import "mv-linear-icons";
import "mv-dropdown";
import "mv-header";
import "mv-menu";
import "mv-font-awesome";

class TopbarMenu extends LitElement {
  static get properties() {
    return {
      language: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {}

      .title {
        padding: 0 20px;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <mv-header>
        <mv-header item><h1 class="title">MvTemplate</h1></mv-header>
      </mv-header>
    `;
  }
}

customElements.define("topbar-menu", TopbarMenu);
