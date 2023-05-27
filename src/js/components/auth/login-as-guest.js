import { html } from 'lit';
import { USER_TOKEN_KEY } from '../../config';
import CheckUserAuth from '../../pages/auth/check-user-auth';
import { setUserToken } from '../../utils';
import LitWithoutShadowDom from '../base/lit-without-shadow-dom';

class LoginAsGuest extends LitWithoutShadowDom {
  constructor() {
    super();
  }

  render() {
    return html`
      <div class="mt-4 text-center loading">
        <a href="#" @click=${this._loginAsGuest}>Masuk sebagai tamu?</a>
      </div>
    `;
  }

  _loginAsGuest(event) {
    event.preventDefault();
    setUserToken(USER_TOKEN_KEY, 'guest');
    CheckUserAuth.checkLoginState();
  }
}

customElements.define('login-as-guest-component', LoginAsGuest);
