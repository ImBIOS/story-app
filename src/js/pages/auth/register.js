import { register } from '../../network/auth';
import { Response } from '../../types';
import CheckUserAuth from './check-user-auth';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Set submit button to loading state
        const submitButton = document.querySelector('#submitBtn');
        submitButton.innerHTML = `<spinner-component></spinner-component>`;
        submitButton.disabled = true;

        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false,
    );
  },

  async _getRegistered() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        /** @type {Response} */
        const response = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        console.info('response', response);
        window.alert('Registered a new user');
        this._goToLoginPage();
      } catch (error) {
        console.error(error);

        /** @type {{response: {data: Response}}} */
        const {
          response: { data },
        } = error;

        // Display error message to user
        const errorMessage = document.querySelector('#errorMessage');
        errorMessage.innerHTML = data.message;
        errorMessage.classList.remove('d-none');
      }
    }
  },

  _getFormData() {
    const name = document.querySelector('#validationCustomRecordName');
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToLoginPage() {
    window.location.href = '/auth/login.html';
  },
};

export default Register;
