import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { LitElement, css, html } from 'lit';

class Footer extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  static styles = css`
    .main-footer {
      background-color: var(--bs-dark);
      color: var(--bs-light);
      padding: 2rem 0;
    }

    .main-footer .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    locale-picker-component {
      margin-bottom: 1rem;
    }

    a {
      color: var(--bs-light);
      text-decoration: none;
    }
  `;

  render() {
    return html`
      <div class="main-footer">
        <div class="container">
          <h3 class="text-center">${msg('Pilih Bahasa')}:</h3>
          <locale-picker-component></locale-picker-component>
          <a class="copyright" href="https://github.com/ImBIOS"
            >${msg('Dibuat dengan 💖 oleh Imamuzzaki Abu Salam')}</a
          >
        </div>
      </div>
    `;
  }
}

customElements.define('footer-component', Footer);
