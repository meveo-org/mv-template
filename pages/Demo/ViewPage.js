import { LitElement, html, css } from "lit-element";
import "mv-button";
import "mv-container";
import "../../components/CollapsingField.js";
import "../../components/layout/PageLayout.js";

export default class DemoViewPage extends LitElement {
  static get properties() {
    return {
      ...super.properties,
      entity: { type: Object, attribute: false, reflect: true },
      errors: { type: Array, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css`
      h1 {
        margin: 0;
      }

      .group {
        border-collapse: separate;
        border-spacing: 0 0.5rem;
      }

      .value mv-container {
        --mv-container-max-height: 300px;
        --mv-container-padding: 20px 0;
      }

      .value table {
        margin-right: 20px;
      }

      .child-group {
        max-height: 300px;
        margin-left: 20px;
        overflow: auto;
      }

      .field {
      }

      .field .label {
        font-weight: bold;
        vertical-align: baseline;
        padding-right: 15px;
      }

      .field .value {
      }

      .value > fieldset {
      }
    `;
  }

  constructor() {
    super();
    this.entity = {
      name: "Demo name",
      description: "Demo description",
      childEntities: [
        {
          name: "Child Entity",
          description: "Child Entity Description",
        },
        {
          name: "Child Entity",
          description: "Child Entity Description",
        },
        {
          name: "Child Entity",
          description: "Child Entity Description",
        },
        {
          name: "Child Entity",
          description: "Child Entity Description",
        },
        {
          name: "Child Entity",
          description: "Child Entity Description",
        },
        {
          name: "Child Entity",
          description: "Child Entity Description",
        },
        {
          name: "Child Entity",
          description: "Child Entity Description",
        },
        {
          name: "Child Entity",
          description: "Child Entity Description",
        },
      ],
    };
  }

  render() {
    return html`
      <page-layout>
        <mv-container>
          <h1>Demo</h1>
          <table class="group">
            <tr class="field">
              <td class="label">Name</td>
              <td class="value">${this.entity.name}</td>
            </tr>
            <tr class="field">
              <td class="label">Description</td>
              <td class="value">${this.entity.description}</td>
            </tr>
            <tr class="field">
              <td class="label">Child Entities</td>
              <td class="value">
                <collapsing-field>
                  <mv-container>
                    <div class="child-group">
                      <table class="group">
                        ${this.entity.childEntities.map(
                          (childEntity, index) => html`
                            <tr>
                              <td colspan="2">[ ${index + 1} ]</td>
                            </tr>
                            <tr class="field">
                              <td class="label">Name</td>
                              <td class="value">${childEntity.name}</td>
                            </tr>
                            <tr class="field">
                              <td class="label">Description</td>
                              <td class="value">${childEntity.description}</td>
                            </tr>
                          `
                        )}
                      </table>
                    </div>
                  </mv-container>
                </collapsing-field>
              </td>
            </tr>
          </table>
          <div class="button-grid">
            <mv-button @button-clicked="${this.back}" button-style="info">
              <mv-fa icon="undo"></mv-fa>Back
            </mv-button>
            <mv-button @button-clicked="${this.edit}">
              <mv-fa icon="pen"></mv-fa>Edit
            </mv-button>
          </div>
        </mv-container>
      </page-layout>
    `;
  }

  back = (event) => {
    history.pushState(null, "", `/list/${this.entity.code}`);
  };

  edit = () => {
    history.pushState(null, "", `/new/${this.entity.code}`);
  };
}

customElements.define("demo-view-page", DemoViewPage);
