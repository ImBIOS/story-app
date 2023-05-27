import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class NavLinks extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <ul class="navbar-nav ms-auto mb-2 mb-md-0 d-flex align-items-center gap-3">
        <nav-link-component content="${msg('Dasbor')}" to="/"></nav-link-component>
        <nav-link-component
          content="${msg('Tambah Cerita')}"
          to="/stories/add.html"
        ></nav-link-component>
        <nav-link-auth-component class="d-none" id="userLoggedMenu"></nav-link-auth-component>
        <nav-link-component
          content="${msg('Masuk')}"
          to="/auth/login.html"
          id="loginMenu"
        ></nav-link-component>
      </ul>
    `;
  }
}

customElements.define('nav-links-component', NavLinks);
