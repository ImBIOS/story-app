const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const fetchData = await fetch('/data/DATA.json');
    const response = await fetchData.json();

    this._userListStory = response.listStory;
    this._populateStoriesRecordToTable(this._userListStory);
    this._populateStoriesDataToCard(this._userListStory);
  },

  /**
   * Populate data to card
   * @param {ListStory[]} listStory List of story
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

    document.querySelector('#numberOfStories').innerText = amountStoryThisMonth;
    document.querySelector('#amountActiveUser').innerText = amountActiveUser;
    document.querySelector('#amountStory').innerText = amountStory;
  },

  /**
   *
   * @param {ListStory[]} listStory
   * @returns
   */
  _populateStoriesRecordToTable(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(`Parameter listStory should be an object. The value is ${listStory}`);
    }

    if (!Array.isArray(listStory)) {
      throw new Error(`Parameter listStory should be an array. The value is ${listStory}`);
    }

    const recordBodyTable = document.querySelector('#recordsTable tbody');

    recordBodyTable.innerHTML = '';
    if (listStory.length <= 0) {
      recordBodyTable.innerHTML = this._templateEmptyBodyTable();
      return;
    }

    listStory.forEach((item, idx) => {
      recordBodyTable.innerHTML += this._templateBodyTable(idx, listStory[idx]);
    });
  },

  _templateBodyTable(index, storyRecord) {
    const formattedCreatedAt = new Date(storyRecord.createdAt).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return `
      <tr>
        <th class="text-center">${parseInt(index, 10) + 1}</th>
        <td>${storyRecord.name}</td>
        <td>${storyRecord.description}</td>
        <td>
          <img class="img-fluid rounded" src="${storyRecord.photoUrl}" alt="${
      storyRecord.name
    } story photo" />
        </td>
        <td>${formattedCreatedAt}</td>
        <td>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <a class="btn btn-sm btn-primary" href="#">
              <i class="bi bi-eye-fill me-1"></i>Show
            </a>
            <a class="btn btn-sm btn-warning" href="#">
              <i class="bi bi-pen-fill me-1"></i>Edit
            </a>
            <a class="btn btn-sm btn-danger" href="#">
              <i class="bi bi-trash3-fill me-1"></i>Delete
            </a>
          </div>
        </td>
      </tr>
    `;
  },

  _templateEmptyBodyTable() {
    const recordHeadTable = document.querySelector('#recordsTable thead');

    return `
      <tr>
        <td colspan="${recordHeadTable.querySelectorAll('td,th').length}">
          <div class="text-center">Tidak ada catatan cerita</div>
        </td>
      </tr>
    `;
  },
};

export default Dashboard;
