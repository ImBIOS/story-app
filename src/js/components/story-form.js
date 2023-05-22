import { css, html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class StoryForm extends LitWithoutShadowDom {
  static styles = css`
    /* Tulis CSS Anda di sini */
  `;

  render() {
    return html`
      <form>
        <!-- Tulis kode HTML Anda di sini -->
      </form>
    `;
  }
}

customElements.define('story-form-component', StoryForm);
