import { USER_TOKEN_KEY } from '../../config';
import { login } from '../../network/auth';
import { LoginResponse } from '../../types';
import { setUserToken } from '../../utils';
import CheckUserAuth from './check-user-auth';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Set submit button to loading state
        const submitButton = document.querySelector('#submitBtn');
        submitButton.innerHTML = `<spinner-component></spinner-component>`;
        submitButton.disabled = true;

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        /** @type {{data: LoginResponse}} */
        const { data } = await login({
          email: formData.email,
          password: formData.password,
        });
        setUserToken(USER_TOKEN_KEY, data.loginResult.token);
        window.alert('Signed user in detected');
        this._goToDashboardPage();
      } catch (error) {
        console.error(error);
      }
    }
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Login;
