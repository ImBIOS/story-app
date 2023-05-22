import { html } from 'lit';
import { getBasePath } from '../utils';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class CardDashboard extends LitWithoutShadowDom {
  static properties = {
    id: { type: String, reflect: true },
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
    classes: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.id = '';
    this.name = '';
    this.description = '';
    this.createdAt = '';
    this.classes = '';
  }

  render() {
    return html`
      <div class="card btn ${this.classes}">
        <div class="card-body">
          <h3 class="card-title fs-3">${this.name}</h3>
          <p class="fs-6 opacity-75">${this.createdAt}</p>
          <p class="card-text">${this.description}</p>

          <div class="d-flex justify-content-center align-items-center gap-2">
          <a class="btn btn-sm btn-warning" href="${getBasePath()}/stories/edit.html?id=${this.id}">
            <i class="bi bi-pen-fill me-1"></i>Edit
          </a>
          <a class="btn btn-sm btn-danger" href="#">
            <i class="bi bi-trash3-fill me-1"></i>Delete
          </a>
          </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('card-dashboard-component', CardDashboard);
