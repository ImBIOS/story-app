import { USER_TOKEN_KEY } from '../../config';
import { getUserToken, useIsGuest } from '../../utils';

const CheckUserAuth = {
  excludeRedirectPage: ['login.html', 'register.html'],

  checkLoginState() {
    const isGuest = useIsGuest();
    const userToken = getUserToken(USER_TOKEN_KEY);
    const isUserSignedIn = Boolean(userToken) || isGuest;
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.href = '/';
      } else {
        this._showLoginMenuOrUserLogMenu(isUserSignedIn);
      }
    } else if (!isUserOnAuthPage) {
      window.location.href = '/auth/login.html';
    }
  },

  _showLoginMenuOrUserLogMenu(userLoginState) {
    const loginMenu = document.querySelector('#loginMenu');
    const userLoggedMenu = document.querySelector('#userLoggedMenu');

    if (!userLoginState) {
      loginMenu?.classList.add('d-block');
      userLoggedMenu?.classList.add('d-none');

      loginMenu?.classList.remove('d-none');
      userLoggedMenu?.classList.remove('d-block');

      return;
    }

    loginMenu?.classList.add('d-none');
    userLoggedMenu?.classList.add('d-block');

    loginMenu?.classList.remove('d-block');
    userLoggedMenu?.classList.remove('d-none');
  },

  _isUserOnAuthPage(pages) {
    const filteredPages = pages.filter((item) => window.location.pathname.endsWith(item));
    return Boolean(filteredPages.length);
  },
};

export default CheckUserAuth;
