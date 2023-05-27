import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class LoadingOverlay extends LitWithoutShadowDom {
  render() {
    return html`
      <div class="loading-overlay d-flex justify-content-center align-items-center">
        <spinner-component></spinner-component>
      </div>
    `;
  }
}

customElements.define('loading-overlay-component', LoadingOverlay);

export default LoadingOverlay;
