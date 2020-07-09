import { LitElement, html, css } from "lit-element";
import "mv-menu-panel";
import "mv-linear-icons";

class SidebarMenu extends LitElement {
  static get properties() {
    return {
      enabled: { type: Object, attribute: false, reflect: true },
      selected: { type: String },
      sidebar: { type: Boolean },
      collapsed: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      mv-menu-panel {
        font-family: "MuseoSans";
        --font-size-m: 1rem;
        --mv-menu-panel-item-height: 50px;
        --mv-menu-panel-header-height: 80px;
      }

      .sidebar {
        position: fixed;
        height: 100%;
        z-index: 99;
        box-shadow: 0 1px 30px 1px rgba(0, 0, 0, 0.11);
        background-color: #3f4753;        
        --mv-menu-panel-width: 330px;
      }

      .sidebar.collapsed {
        --mv-menu-panel-width: 65px;
        --mv-menu-panel-popout-width: 330px;
      }

      .sidebar-header {
        min-width: 100%;
        padding-left: 10px;
        display: grid;
        grid-template-columns: 225px 65px;
        grid-column-gap: 10px;
        align-items: center;
        font-size: 2rem;
      }

      .sidebar-header.collapsed {
        grid-template-columns: 0 0 65px;
      }

      .collapse-button {
        width: 65px;
        height: 80px;
        font-size: 2rem;
        border: none;
        background: transparent;
        color: #ffffff;
        outline: none;
        cursor: pointer;
      }

      .collapse-button:hover {
        background-color: #f45d4e;
      }

      .sidebar-header.collapsed .header-title {
        display: none;
      }

      .sidebar-header.collapsed .collapse-button {
        margin-left: -30px;
      }

      .text {
        font-size: 1rem;
        display: flex;
        align-items: center;

        width: 100%;
        height: 50px;
        padding: auto;
      }
    `;
  }

  constructor() {
    super();
    this.theme = "dark";
    this.collapsed = false;
    this.selected = "";
    this.enabled = { people: false };
  }

  render() {
    const { theme, mission, investigation } = this;
    const collapsedClass = this.collapsed ? " collapsed" : "";

    return html`
      <div class="sidebar${collapsedClass}">
        <mv-menu-panel menu show-header .theme="${theme}">
          <mv-menu-panel label>
            <div class="${`sidebar-header${collapsedClass}`}">
              <div class="header-title">Menu items</div>
              <button class="collapse-button" @click="${this.toggleSidebar}">
                ${this.collapsed
                  ? html` <div><mv-fa icon="chevron-right"></mv-fa></div>`
                  : html` <div><mv-fa icon="chevron-left"></mv-fa></div> `}
              </button>
            </div>
          </mv-menu-panel>

          <mv-menu-panel
            item
            .value="${{ selected: "favorites" }}"
            ?selected="${this.selected === "favorites"}"
            @select-item="${this.selectItem}"
          >
            <div class="text">
              <mv-lnr icon="star"></mv-lnr>
              ${this.collapsed ? html`` : html`<span>Favorites</span>`}
            </div>
          </mv-menu-panel>

          <mv-menu-panel
            group
            .value="${{ selected: "people" }}"
            ?selected="${this.selected === "people"}"
            ?open="${this.enabled.people}"
            ?popout="${this.collapsed}"
            @close-popout="${this.closePopout}"
            @select-group="${this.toggleGroup}"
          >
            <mv-menu-panel label>
              <div class="text">
                <mv-lnr icon="user"></mv-lnr>
                ${this.collapsed ? html`` : html`<span>People</span>`}
              </div>
            </mv-menu-panel>
            <mv-menu-panel item>
              <div class="text">
                <mv-lnr icon="cog"></mv-lnr>
                <span>Mr Anderson</span>
              </div>
            </mv-menu-panel>
          </mv-menu-panel>

          <mv-menu-panel
            item
            .value="${{ selected: "settings" }}"
            ?selected="${this.selected === "settings"}"
            @select-item="${this.selectItem}"
          >
            <div class="text">
              <mv-lnr icon="cog"></mv-lnr>
              ${this.collapsed ? html`` : html`<span>Settings</span>`}
            </div>
          </mv-menu-panel>
        </mv-menu-panel>
      </div>
    `;
  }

  selectItem = (event) => {
    const { detail } = event;
    const {
      value: { selected },
    } = detail;
    this.selected = selected;
    this.dispatchEvent(
      new CustomEvent("select-item", {
        detail: { selected: this.selected },
      })
    );
  };

  toggleSidebar = () => {
    this.enabled = {};
    this.dispatchEvent(new CustomEvent("toggle-sidebar"));
  };

  toggleGroup = (event) => {
    const { detail } = event;
    const {
      value: { selected },
    } = detail;
    this.enabled = { ...this.enabled, [selected]: !this.enabled[selected] };
    this.selected = this.enabled ? selected : "";
  };

  closePopout = () => {
    const {enabled, selected} = this;
    if(enabled[selected]) {
      this.enabled = { ...enabled, [selected]: false };
    }
  }
}

customElements.define("sidebar-menu", SidebarMenu);
