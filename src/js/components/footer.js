import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class Footer extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <footer>
        <div class="main-footer bg-dark">
          <div class="container px-3 py-4">
            <locale-picker-component class="d-block mb-3"></locale-picker-component>
            <p class="text-center text-white mb-0">
              ${msg('Dibuat dengan ❤ oleh Imamuzzaki Abu Salam')}
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);
