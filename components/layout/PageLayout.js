import { LitElement, html, css } from "lit-element";
import "mv-header";
import "mv-main";
import "mv-footer";
import "./TopbarMenu.js";
import "./SidebarMenu.js";

export default class PageLayout extends LitElement {
  static get properties() {
    return {
      sidebarExpanded: { type: Boolean, attribute: false },
      theme: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
        top: 0;
        padding: 0;
        margin: 0;
        --mv-header-height: 60px;
        --mv-footer-height: 40px;
        --mv-menu-panel-width: 0;
        --mv-main-margin-left: 0;
        --mv-content-padding: 0;
        --container-padding: 40px;
        --container-total-padding: calc(var(--container-padding) * 2);
        --container-dimensions: calc(100% - var(--container-total-padding));
        --mv-container-min-width: var(--container-dimensions);
        --mv-container-max-width: 100%;
        --mv-container-margin: 0 0 var(--container-padding) 0;
      }

      .sidebar {
        background: var(--light-9-background);
        height: 100%;
        position: relative;
        overflow-y: auto;
        --sidebar-width: 330px;
        --grid-template-columns: auto;
        --mv-footer-margin-left: var(--sidebar-width);
      }

      .sidebar.sidebar-collapse {
        --sidebar-width: 65px;
      }

      .main-section {
        display: grid;
        grid-template-columns: var(--grid-template-columns);
        transition: all 0.3s;
        grid-gap: 0;
        margin-left: var(--sidebar-width);
        padding: 0;
        width: calc(100% - var(--sidebar-width));
        height: 100%;
      }

      .main-container {
        background: var(--light-9-background);
        height: var(--container-dimensions);
        width: var(--container-dimensions);
        min-width: 600px;
        overflow: auto;
        padding: 40px;
        margin: 0;
      }

      .container-wrap {
        transition: padding-left 0.3s;
      }
    `;
  }

  constructor() {
    super();
    this.theme = "light";
    this.sidebarExpanded = true;
  }

  render() {
    const collapse = this.sidebarExpanded ? "" : " sidebar-collapse";

    return html`
      <div class="sidebar${collapse}">
        <mv-main>
          <topbar-menu slot="header"></topbar-menu>
          <sidebar-menu
            ?expanded="${this.sidebarExpanded}"
            @sidebar-item-clicked="${this.sidebarItemClicked}"
          ></sidebar-menu>
          <div class="main-section">
            <div class="main-container">
              <slot></slot>
            </div>
          </div>
          <mv-footer slot="footer" .theme="${this.theme}">
            <mv-footer item>
              <small> Meveo&copy; 2020 </small>
            </mv-footer>
          </mv-footer>
        </mv-main>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("toggle-sidebar", this.toggleSidebar);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("toggle-sidebar", this.toggleSidebar);
  }

  sidebarItemClicked = (event) => {
    const {
      detail: { selected },
    } = event;
    this.selected = selected;
  };

  toggleSidebar = () => {
    this.sidebarExpanded = !this.sidebarExpanded;
    document.dispatchEvent(new CustomEvent("page-resize"));
  };
}

customElements.define("page-layout", PageLayout);
