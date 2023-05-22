import LoadingOverlay from '../components/loading-overlay';
import { formatPath } from '../utils';

// Type
const { Story } = require('../types');

const Dashboard = {
  /**
   * Main initializer
   */
  async init() {
    await this._initialData();
    this._initialListener();
  },

  /**
   * Initial data
   */
  async _initialData() {
    // Instantiate loading component and append it to the DOM
    const loadingComponent = new LoadingOverlay();
    document.body.appendChild(loadingComponent);

    try {
      const fetchData = await fetch(formatPath('/data/DATA.json'));
      const response = await fetchData.json();

      /** @type {Story[]} */
      this._userListStory = response.listStory;
      this._populateStoriesRecordToTable(this._userListStory);
      this._populateStoriesDataToCard(this._userListStory);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Remove loading component from the DOM
      document.body.removeChild(loadingComponent);
    }
  },

  /**
   * Initial listener
   */
  _initialListener() {
    const recordDetailModal = document.getElementById('recordDetailModal');
    recordDetailModal.addEventListener('shown.bs.modal', (event) => {
      const modalTitle = recordDetailModal.querySelector('.modal-title');
      modalTitle.focus();
      const button = event.relatedTarget;
      /** @type {Story} */
      const dataRecord = this._userListStory.find((item) => {
        return item.id == button.dataset.recordId;
      });
      this._populateDetailStoryToModal(dataRecord);
    });
  },

  /**
   * Populate data to card
   * @param {Story[]} listStory List of story
   */
  _populateStoriesDataToCard(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(`Parameter listStory should be an object.`);
    }

    if (!Array.isArray(listStory)) {
      throw new Error('Parameter listStory should be an array.');
    }

    /** Total income based on listStory */
    const amountStoryThisMonth = listStory.reduce((acc, curr) => {
      if (curr.createdAt.includes('2022-01')) {
        acc += 1;
      }
      return acc;
    }, 0);
    /** Total unique active user based on listStory */
    const amountActiveUser = listStory.reduce((acc, curr) => {
      if (acc.indexOf(curr.name) === -1) {
        acc.push(curr.name);
      }
      return acc;
    }, []).length;
    /** Total story posted */
    const amountStory = listStory.length;

    document
      .querySelector('#stories-card')
      ?.setAttribute('content', `${amountStoryThisMonth} Cerita`);
    document
      .querySelector('#amount-active-user')
      ?.setAttribute('content', `${amountActiveUser} Pengguna Aktif`);
    document.querySelector('#amount-story')?.setAttribute('content', `${amountStory} Cerita`);
  },

  /**
   * Populate data to table
   * @param {Story[]} listStory List of story
   * @returns {void}
   */
  _populateStoriesRecordToTable(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(`Parameter listStory should be an object. The value is ${listStory}`);
    }

    if (!Array.isArray(listStory)) {
      throw new Error(`Parameter listStory should be an array. The value is ${listStory}`);
    }

    const records = document.querySelector('#records');

    records.innerHTML = '';
    if (listStory.length <= 0) {
      records.innerHTML = this._templateEmptyCard();
      return;
    }

    listStory.forEach((item, idx) => {
      records.innerHTML += this._templateCard(idx, listStory[idx]);
    });
  },

  /**
   * Populate data to modal
   * @param {Story} story Story record
   */
  _populateDetailStoryToModal(story) {
    const requiredProps = ['id', 'name', 'description', 'createdAt', 'photoUrl'];

    // Validate parameter type
    requiredProps.forEach((prop) => {
      if (!(typeof story[prop] === 'string')) {
        throw new Error(`Parameter ${prop} should be a string. The value is ${story[prop]}`);
      }
    });

    // Query DOM
    const getDetailRecordElement = (id) => document.querySelector(`#recordDetailModal #${id}`);

    const imgDetailRecord = getDetailRecordElement('imgDetailRecord');
    const idDetailRecord = getDetailRecordElement('idDetailRecord');
    const nameDetailRecord = getDetailRecordElement('nameDetailRecord');
    const dateDetailRecord = getDetailRecordElement('dateDetailRecord');
    const descriptionDetailRecord = getDetailRecordElement('descriptionDetailRecord');

    // Populate data
    const { id, name, description, createdAt, photoUrl } = story;

    imgDetailRecord.setAttribute('src', photoUrl);
    imgDetailRecord.setAttribute('alt', `${name} story photo`);
    idDetailRecord.textContent = id;
    nameDetailRecord.textContent = name;
    dateDetailRecord.textContent = createdAt;
    descriptionDetailRecord.textContent = description || '-';
  },

  /**
   * Template for card
   * @param {number} index Index of the record
   * @param {Story} story Story record
   * @returns {string}
   */
  _templateCard(index, { id, name, description, createdAt }) {
    const randomColor = this._getRandomColor();

    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <story-card-component
          id="${id}"
          name="${name}"
          description="${description}"
          createdAt="${createdAt}"
          classes="h-100 bg-${randomColor} text-bg-${randomColor} bg-gradient"
          data-bs-toggle="modal"
          data-bs-target="#recordDetailModal"
          data-record-id="${id}"
        ></story-card-component>
      </div>
    `;
  },

  /**
   * Template for empty card
   * @returns {string}
   */
  _templateEmptyCard() {
    const recordHeadTable = document.querySelector('#recordsTable thead');

    return `
      <div class="text-center">Tidak ada catatan cerita</div>
    `;
  },

  /**
   * Get random color
   * @returns {string} Random color
   */
  _getRandomColor() {
    const colors = ['primary', 'secondary', 'success', 'info', 'light', 'dark'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  },
};

export default Dashboard;
