import { LitElement, css, html } from 'lit';
import { formatPath } from '../utils';

class NavLink extends LitElement {
  static properties = {
    content: { type: String, reflect: true },
    to: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('to')) {
      throw new Error(`Atribut "to" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  static styles = css`
    :host {
      --color: var(--bs-light);
    }

    :host(:hover) {
      --color: var(--bs-light-hover);
    }

    a {
      text-decoration: none;
      color: var(--color);
      background-color: rgba(0, 0, 0, 0.45);
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
    }
  `;

  render() {
    return html`
      <li class="nav-item">
        <a class="nav-link" href="${formatPath(this.to)}">${this.content}</a>
      </li>
    `;
  }
}

customElements.define('nav-link-component', NavLink);
