import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class Spinner extends LitWithoutShadowDom {
  render() {
    return html`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span class="visually-hidden">Loading...</span>
    `;
  }
}

customElements.define('spinner-component', Spinner);

export default Spinner;
