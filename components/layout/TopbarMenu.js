import { LitElement, html, css } from "lit-element";
import "mv-button";
import "mv-linear-icons";
import "mv-dropdown";
import "mv-header";
import "mv-menu";
import "mv-font-awesome";
import "router-slot";

class TopbarMenu extends LitElement {
  static get properties() {
    return {
      noMenu: { type: String, attribute: "no-menu" },
    };
  }

  static get styles() {
    return css`
      :host {
        --mv-button-padding: 3px 5px;
        --mv-button-min-width: 80px;
      }

      router-link {
        outline: none;
        user-select: none;
      }

      .title {
        font-size: var(--font-size-xxl);
        padding: 0 20px;
        cursor: pointer;
      }

      .collapse-button {
        font-size: var(--font-size-xl);
        border: none;
        background: transparent;
        color: #ffffff;
        outline: none;
        cursor: pointer;
        padding: 10px 20px;
        border-radius: 10px;
      }

      .collapse-button:hover {
        background-color: #f45d4e;
      }
    `;
  }

  constructor() {
    super();
    this.noMenu = false;
  }

  render() {
    return html`
      <mv-header>
        ${this.noMenu
          ? html``
          : html`
              <mv-header item>
                <button class="collapse-button" @click="${this.toggleSidebar}">
                  <mv-fa icon="bars"></mv-fa>
                </button>
              </mv-header>
            `}
        <mv-header item>
          <h1 class="title">
            <router-link path="./dashboard">Custom Entities</router-link>
          </h1>
        </mv-header>
        <mv-header item position="right">
          <mv-button
            button-style="error"
            type="outline"
            @button-clicked="${this.logout}"
            >Logout</mv-button
          >
        </mv-header>
      </mv-header>
    `;
  }

  toggleSidebar = () => {
    document.dispatchEvent(new CustomEvent("toggle-sidebar"));
  };

  logout = () => {
    document.dispatchEvent(new CustomEvent("logout"));
  };
}

customElements.define("topbar-menu", TopbarMenu);
