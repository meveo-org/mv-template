import { LitElement, html } from "lit";
import * as staticHtml from 'lit/static-html.js';
// import "@meveo-org/mv-router";
import "./pages/MainDashboard.js"
import { Routes } from "@lit-labs/router";
import * as config from "./config.js"

// component paths are relative to /web_modules/mv-router
const PAGES_PATH = "./pages";

class PageRoutes extends LitElement {
  static get properties() {
    return {
      entities: { type: Object, attribute: false },
      permissions: { type: Object, attribute: false },
      auth: { type: Object, attribute: false },
    };
  }

  constructor() {
    super();
    this.entities = null;
    this.permissions = null;
    this.auth = null;

    this._routes = new Routes(this, [
      {
        path: config.BASE_PATH + "/dashboard", render: () => html`
        <main-dashboard 
             .auth="${this.auth}"
             .entities="${this.entities}"
             .permissions="${this.permissions}"
        >
        </main-dashboard>`,
      },
    ]);

    window.router = this._routes;
  }

  firstUpdated() {
    Object.keys(this.entities).forEach((key) => {
      const entity = this.entities[key];
      
      // Create entity
      this._routes.routes.push({
        path: config.BASE_PATH + `/${entity.code}/new`,
        name: `${entity.code}`,
        render: () => {
          const tagName = `${entity.normalizedCode}-new-page`;
          const tag = staticHtml.unsafeStatic(tagName);

          return  staticHtml.html`<${tag} .auth=${this.auth} .entity=${entity} .permissions=${this.permissions} name=${entity.code} .config=${config}></${tag}>` 
        },
        enter: async () => {
          await import (`${PAGES_PATH}/${entity.code}/NewPage.js`)
        }
      });

      // Update entity
      this._routes.routes.push({
        path: config.BASE_PATH + `/${entity.code}/update/:id`,
        name: `${entity.code}`,
        render: (props) => {
          const tagName = `${entity.normalizedCode}-update-page`;
          const tag = staticHtml.unsafeStatic(tagName);

          const parameters = {
            pathParameters: {
              id: props.id
            }
          }
          return  staticHtml.html`<${tag} .auth=${this.auth} .entity=${entity} .permissions=${this.permissions} name=${entity.code} .parameters=${parameters} .config=${config}></${tag}>` 
        },
        enter: async () => {
          await import (`${PAGES_PATH}/${entity.code}/UpdatePage.js`)
        }
      });

      // List entity
      this._routes.routes.push({
        path: config.BASE_PATH + `/${entity.code}/list`,
        name: `${entity.code}`,
        render: () => {
          const tagName = `${entity.normalizedCode}-list-page`;
          const tag = staticHtml.unsafeStatic(tagName);

          return  staticHtml.html`<${tag} .auth=${this.auth} .entity=${entity} .permissions=${this.permissions} name=${entity.code} .config=${config}></${tag}>` 
        },
        enter: async () => {
          await import (`${PAGES_PATH}/${entity.code}/ListPage.js`)
        }
      });
    });
    this._routes.goto(window.location.pathname);
  }

  render() {
    return html`
      <slot .router=${this._routes}>
        ${this._routes.outlet()}
      </slot>
    `;
  }
}

customElements.define("page-routes", PageRoutes);
