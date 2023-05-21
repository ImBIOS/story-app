import { LitElement, html, css } from 'lit';

class LoadingPlaceholder extends LitElement {
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
