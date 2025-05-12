import * as API from '../../data/api';
import StoryDetailPresenter from '../../presenter/story-detail-presenter';
import Database from '../../data/database';

export default class StoryDetailPage {
  #storyId;
  #presenter;

  async render() {
    return `
      <section class="container">
        <div id="story-detail">Memuat cerita...</div>
        <div id="save-actions-container" style="margin-top: 16px;"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#storyId = window.location.hash.split('/')[2];

    this.#presenter = new StoryDetailPresenter(this.#storyId, {
      view: this,
      apiModel: API,
      dbModel: Database,
    });

    await this.#presenter.init();
  }

  showStoryDetail(story) {
    const container = document.getElementById('story-detail');
    container.innerHTML = `
      <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" style="width: 100%; border-radius: 8px;" />
      <h2>${story.name}</h2>
      <p>${story.description}</p>
      <small>Dibuat pada: ${new Date(story.createdAt).toLocaleDateString()}</small>
    `;
  }

  showError(message) {
    document.getElementById('story-detail').innerHTML = `<p style="color: red;">${message}</p>`;
  }

  renderSaveButton() {
    document.getElementById('save-actions-container').innerHTML = `
      <button id="save-btn">Simpan Cerita</button>
    `;
    document.getElementById('save-btn').addEventListener('click', async () => {
      await this.#presenter.saveStory();
      await this.#presenter.checkSavedStatus();
    });
  }

  renderRemoveButton() {
    document.getElementById('save-actions-container').innerHTML = `
      <button id="remove-btn">Hapus Cerita</button>
    `;
    document.getElementById('remove-btn').addEventListener('click', async () => {
      await this.#presenter.removeStory();
      await this.#presenter.checkSavedStatus();
    });
  }
}
