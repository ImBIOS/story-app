import { store, storeAsGuest } from '../../network/stories';
import { useIsGuest } from '../../utils';
import CheckUserAuth from '../auth/check-user-auth';

const Add = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Set submit button to loading state
        const submitButton = document.querySelector('#submitBtn');
        submitButton.innerHTML = `<spinner-component></spinner-component>`;
        submitButton.disabled = true;

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        const isGuest = useIsGuest();
        const fn = isGuest ? storeAsGuest : store;

        const response = await fn(formData);
        console.info('response', response);
        window.alert('New story added successfully');
        this._goToDashboardPage();
      } catch (error) {
        console.error(error);
      }
    }
  },

  /**
   * Get form data
   * @returns {{photo: File, description: string}} formData
   */
  _getFormData() {
    const photoInput = document.querySelector('#validationCustomPhoto');
    const descriptionInput = document.querySelector('#validationCustomNotes');

    return {
      photo: photoInput.files[0],
      description: descriptionInput.value,
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

export default Add;
