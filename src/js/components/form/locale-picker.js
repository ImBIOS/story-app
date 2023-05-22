import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { allLocales } from '../../../generated/locale-codes';
import { getLocale, setLocaleFromUrl } from '../../localization.js';

class LocalePicker extends LitElement {
  constructor() {
    super();
    setLocaleFromUrl();
    updateWhenLocaleChanges(this);
  }

  static styles = css`
    select {
      border: 1px solid var(--bs-primary);
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      background-color: var(--bs-primary);
      color: var(--bs-light);
      font-size: 1rem;
      cursor: pointer;
    }

    select:focus {
      outline: none;
      box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
    }
  `;

  render() {
    const localeNames = {
      en: msg('🇬🇧 Bahasa Inggris (UK)'),
      id: msg('🇮🇩 Bahasa Indonesia'),
    };

    return html`
      <select @change=${this._localeChanged}>
        ${allLocales.map((locale) => {
          return html`
            <option value=${locale} ?selected=${locale === getLocale()}>
              ${localeNames[locale]}
            </option>
          `;
        })}
      </select>
    `;
  }

  _localeChanged(event) {
    const newLocale = event.target.value;

    if (newLocale !== getLocale()) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);

      window.history.pushState(null, '', url.toString());
      setLocaleFromUrl();
    }
  }
}

customElements.define('locale-picker-component', LocalePicker);
