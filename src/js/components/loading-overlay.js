import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class LoadingOverlay extends LitWithoutShadowDom {
  render() {
    return html`
      <div class="loading-overlay d-flex justify-content-center align-items-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
  }
}

customElements.define('loading-overlay-component', LoadingOverlay);

export default LoadingOverlay;
