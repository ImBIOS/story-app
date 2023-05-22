import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { html } from 'lit';
import LitWithoutShadowDom from './base/lit-without-shadow-dom';

class ModalStory extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${this.title}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <img src="" id="imgDetailRecord" class="img-fluid" alt="Evidence of story" />
            </div>

            <h2>Rincian Cerita</h2>
            <table>
              <tbody>
                <tr>
                  <td class="fw-bold">${msg('ID')}</td>
                  <td class="fw-bold ms-3 me-1 d-inline-block">:</td>
                  <td id="idDetailRecord"></td>
                </tr>
                <tr>
                  <td class="fw-bold">${msg('Nama')}</td>
                  <td class="fw-bold ms-3 me-1 d-inline-block">:</td>
                  <td id="nameDetailRecord"></td>
                </tr>
                <tr>
                  <td class="fw-bold">${msg('Tanggal Dibuat')}</td>
                  <td class="fw-bold ms-3 me-1 d-inline-block">:</td>
                  <td id="dateDetailRecord"></td>
                </tr>
                <tr>
                  <td class="fw-bold">${msg('Deskripsi')}</td>
                  <td class="fw-bold ms-3 me-1 d-inline-block">:</td>
                  <td id="descriptionDetailRecord"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ${msg('Tutup')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-story-component', ModalStory);
