import { LitElement, html, css } from "lit-element";
import "mv-linear-icons";
import "mv-dropdown";
import "mv-header";
import "mv-menu";
import "mv-font-awesome";
import "router-slot";

class TopbarMenu extends LitElement {
  static get properties() {
    return {
      language: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
      }

      router-link {
        outline: none;
        user-select: none;
      }

      .title {
        padding: 0 20px;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <mv-header>
        <mv-header item>
          <h1 class="title">
            <router-link path="./dashboard">Custom Entities</router-link>
          </h1>
        </mv-header>
      </mv-header>
    `;
  }
}

customElements.define("topbar-menu", TopbarMenu);
