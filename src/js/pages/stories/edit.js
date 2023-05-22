// Type
const { Story } = require('../../types');

const Edit = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const storyId = String(this._getStoryId());

    if (!storyId) {
      alert('Data dengan id yang dicari tidak ditemukan');
      return;
    }

    const fetchData = await fetch('/data/DATA.json');
    const response = await fetchData.json();
    /** @type {Story[]} */
    const userListStory = response.listStory;

    /** @type {Story} */
    const dataRecord = userListStory.find((item) => item.id === storyId);

    this._populateStoryToForm(dataRecord);
  },

  _initialListener() {
    const editRecordForm = document.querySelector('#editRecordForm');
    editRecordForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        editRecordForm.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData', formData);

      // this._goToDashboardPage();
    }
  },

  _getFormData() {
    const nameInput = document.querySelector('#validationCustomRecordName');
    const photoInput = document.querySelector('#validationCustomEvidence');
    const descriptionInput = document.querySelector('#validationCustomNotes');

    return {
      name: nameInput.value,
      date: new Date(),
      photo: photoInput.files[0],
      description: descriptionInput.value,
    };
  },

  /**
   * Populate data to form
   * @param {Story} story
   */
  _populateStoryToForm(story = null) {
    if (!(typeof story === 'object')) {
      throw new Error(`Parameter story should be an object. The value is ${story}`);
    }

    const nameInput = document.querySelector('#validationCustomRecordName');
    const photoInput = document.querySelector('#validationCustomEvidenceImg');
    const descriptionInput = document.querySelector('#validationCustomNotes');

    nameInput.value = story.name;
    photoInput.setAttribute('src', story.photoUrl);
    photoInput.setAttribute('alt', `${story.name} story photo`);
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
