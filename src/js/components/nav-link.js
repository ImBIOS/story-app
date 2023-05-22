import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';
import { getBasePath } from '../utils';

class NavLink extends LitWithoutShadowDom {
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

  render() {
    return html`
      <li class="nav-item">
        <a class="nav-link" href="${getBasePath()}${this.to}">${this.content}</a>
      </li>
    `;
  }
}

customElements.define('nav-link-component', NavLink);
