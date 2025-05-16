export default class StoryDetailPresenter {
  #storyId;
  #view;
  #apiModel;
  #dbModel;

  constructor(storyId, { view, apiModel, dbModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
    this.#dbModel = dbModel;
  }

  async init() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.#view.showError('Anda harus login terlebih dahulu.');
      return;
    }

    try {
      const story = await this.#apiModel.getStoryById(token, this.#storyId);
      this.#view.showStoryDetail(story);
      await this.checkSavedStatus();
    } catch (error) {
      console.error('Gagal mengambil detail:', error);
      this.#view.showError(error.message || 'Terjadi kesalahan saat mengambil data.');
    }
  }

  async checkSavedStatus() {
    const savedStory = await this.#dbModel.getStoryById(this.#storyId);
    if (savedStory) {
      this.#view.renderRemoveButton();
    } else {
      this.#view.renderSaveButton();
    }
  }

  async saveStory() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.#view.showError('Anda harus login untuk menyimpan cerita.');
      return;
    }

    try {
      const story = await this.#apiModel.getStoryById(token, this.#storyId);
      await this.#dbModel.putStory(story);
      console.log('Cerita berhasil disimpan!');
    } catch (error) {
      console.error('saveStory error:', error);
      this.#view.showError('Gagal menyimpan cerita.');
    }
  }

  async removeStory() {
    try {
      await this.#dbModel.removeStory(this.#storyId);
      console.log('Cerita berhasil dihapus!');
    } catch (error) {
      console.error('removeStory error:', error);
      this.#view.showError('Gagal menghapus cerita.');
    }
  }
}
