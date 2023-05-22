import { css, html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class LoadingPlaceholder extends LitWithoutShadowDom {
  static styles = css`
    /* Tulis CSS Anda di sini */
  `;

  render() {
    return html`
      <div>
        <!-- Tulis kode HTML Anda di sini -->
      </div>
    `;
  }
}

customElements.define('loading-placeholder-component', LoadingPlaceholder);
