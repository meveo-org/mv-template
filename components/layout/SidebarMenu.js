import { LitElement, html, css } from "lit";
import "@meveo-org/mv-menu-panel";
import "@meveo-org/mv-font-awesome";
import * as config from "../../config.js";

class SidebarMenu extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      selected: { type: String },
      sidebar: { type: Boolean },
      expanded: { type: Boolean },
      entities: { type: Object, attribute: false },
      permissions: { type: Object, attribute: false },
      hasHeader: { type: Boolean, attribute: "has-header" },
      router: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        --mv-menu-panel-header-height: 80px;
        --mv-menu-panel-item-height: 50px;
      }

      mv-menu-panel {
        font-family: "MuseoSans";
      }

      .sidebar {
        position: fixed;
        height: 100%;
        z-index: 99;
        box-shadow: 0 1px 30px 1px rgba(0, 0, 0, 0.11);
        background-color: #3f4753;
        --mv-menu-panel-width: var(--sidebar-width);
      }

      .sidebar.collapsed {
        --mv-menu-panel-width: var(--sidebar-width);
        --mv-menu-panel-popout-width: var(--sidebar-width);
      }

      .sidebar-header {
        min-width: 100%;
        display: grid;
        grid-template-columns: 235px var(--sidebar-width);
        grid-column-gap: 10px;
        align-items: center;
        font-size: 2rem;
      }

      .sidebar-header.collapsed {
        grid-template-columns: 0 var(--sidebar-width);
      }

      .collapse-button {
        width: var(--sidebar-width);
        height: var(--mv-menu-panel-header-height);
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
        margin-left: -20px;
      }

      .text {
        font-size: var(--font-size-m, 1rem);
        display: flex;
        align-items: center;
        width: 100%;
        height: var(--mv-menu-panel-item-height);
        padding: auto;
        cursor: pointer;
      }

      .text *[icon] {
        margin-left: -16px;
      }
    `;
  }

  constructor() {
    super();
    this.theme = "dark";
    this.expanded = true;
    this.hasHeader = false;
    this.selected = "";
  }

  render() {
    const { entities, theme } = this;
    const expandedClass = this.expanded ? "" : " collapsed";

    return html`
      <div class="sidebar${expandedClass}">
        <mv-menu-panel menu ?show-header="${this.hasHeader}" .theme="${theme}">
          <mv-menu-panel label>
            <div class="${`sidebar-header${expandedClass}`}">
              <div class="header-title">${this.title || ""}</div>
              <button class="collapse-button" @click="${this.toggleSidebar}">
                ${this.expanded
                  ? html`<div><mv-fa icon="chevron-left"></mv-fa></div>`
                  : html`<div><mv-fa icon="chevron-right"></mv-fa></div>`}
              </button>
            </div>
          </mv-menu-panel>

          <mv-menu-panel
            item
            .value="${{ selected: "dashboard", path :"/dashboard" }}"
            ?selected="${this.selected === "dashboard"}"
            ?popout="${!this.expanded}"
            @select-item="${this.selectItem}"
          >
              <div class="text">
                <mv-fa icon="home"></mv-fa>
                ${this.expanded ? html`<span>Dashboard</span>` : html``}
              </div>
          </mv-menu-panel>

          ${Object.keys(entities || {}).map((key) => {
            const model = entities[key];
            return html`
              <mv-menu-panel
                item
                .value="${{ selected: model.code, path:`/${model.code}/list`}}"
                ?selected="${this.selected === model.code}"
                ?popout="${!this.expanded}"
                @select-item="${this.selectItem}"
              >
                <div class="text">
                  <mv-fa icon="database"></mv-fa>
                  ${this.expanded
                    ? html`<span>${model.label}</span>`
                    : html``}
                </div>
              </mv-menu-panel>
            `;
          })}
        </mv-menu-panel>
      </div>
    `;
  }

  selectItem = (event) => {
    const { detail } = event;
    const {
      value: { selected, path },
    } = detail;
    this.selected = selected;
    this.dispatchEvent(
      new CustomEvent("select-item", {
        detail: { selected: this.selected },
      })
    );

    window.router.goto(config.BASE_PATH + path);
    history.pushState({}, path, config.BASE_PATH + path);
  };

  toggleSidebar = () => {
    this.enabled = {};
    document.dispatchEvent(new CustomEvent("toggle-sidebar"));
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
    const { enabled, selected } = this;
    if (enabled[selected]) {
      this.enabled = { ...enabled, [selected]: false };
    }
  };
}

customElements.define("sidebar-menu", SidebarMenu);
