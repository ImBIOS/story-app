import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { html } from 'lit';
import { formatDate, formatPath } from '../utils';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class StoryCard extends LitWithoutShadowDom {
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

    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="card btn ${this.classes}">
        <div class="card-body">
          <h3 class="card-title fs-3">${this.name}</h3>
          <p class="fs-6 opacity-75">${formatDate(this.createdAt)}</p>
          <p class="card-text">${this.description}</p>

          <div class="d-flex justify-content-center align-items-center gap-2">
          <a class="btn btn-sm btn-warning" href="${formatPath(
            `/stories/edit.html?id=${this.id}`,
          )}">
            <i class="bi bi-pen-fill me-1"></i>${msg('Sunting')}
          </a>
          <a class="btn btn-sm btn-danger" href="#">
            <i class="bi bi-trash3-fill me-1"></i>${msg('Hapus')}
          </a>
          </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card-component', StoryCard);
