import { getById } from '../../network/stories';
import CheckUserAuth from '../auth/check-user-auth';

// Type
const { Story } = require('../../types');

const Edit = {
  async init() {
    CheckUserAuth.checkLoginState();

    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const storyId = String(this._getStoryId());

    if (!storyId) {
      alert('Data dengan id yang dicari tidak ditemukan');
      return;
    }

    const response = await getById(storyId);
    const userStory = response.data.story;

    this._populateStoryToForm(userStory);
  },

  _initialListener() {
    const editRecordForm = document.querySelector('#editRecordForm');
    editRecordForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Set submit button to loading state
        const submitButton = document.querySelector('#submitBtn');
        submitButton.innerHTML = `<spinner-component></spinner-component>`;
        submitButton.disabled = true;

        editRecordForm.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      // TODO: Delete this only if there is edit feature
      console.info('formData', formData);

      // this._goToDashboardPage();
    }
  },

  _getFormData() {
    const photoInput = document.querySelector('#validationCustomPhoto');
    const descriptionInput = document.querySelector('#validationCustomNotes');

    return {
      photo: photoInput.files[0],
      description: descriptionInput.value,
    };
  },

  /**
   * Populate data to form
   * @param {Story} story Story object
   */
  _populateStoryToForm(story = null) {
    if (!(typeof story === 'object')) {
      throw new Error(`Parameter story should be an object. The value is ${story}`);
    }

    const photoInput = document.querySelector('#inputImagePreviewEdit');
    const descriptionInput = document.querySelector('#validationCustomNotes');

    photoInput.setAttribute('defaultImage', story.photoUrl);
    photoInput.setAttribute('defaultImageAlt', `${story.name} story photo`);

    descriptionInput.value = story.description;
  },

  _validateFormData(formData) {
    delete formData.evidence;
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _getStoryId() {
    const searchParamEdit = new URLSearchParams(window.location.search);
    return searchParamEdit.has('id') ? searchParamEdit.get('id') : null;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Edit;
