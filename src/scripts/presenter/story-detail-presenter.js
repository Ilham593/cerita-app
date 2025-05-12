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
    try {
      const response = await fetch(`https://story-api.dicoding.dev/v1/stories/${this.#storyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (response.ok) {
        this.#view.showStoryDetail(result.story);
        await this.checkSavedStatus();
      } else {
        this.#view.showError(result.message);
      }
    } catch (error) {
      console.error('Gagal mengambil detail:', error);
      this.#view.showError('Terjadi kesalahan saat mengambil data.');
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
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://story-api.dicoding.dev/v1/stories/${this.#storyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (response.ok) {
        await this.#dbModel.putStory(result.story);
        console.log('Cerita berhasil disimpan!');
      } else {
        console.error('Gagal menyimpan:', result.message);
      }
    } catch (error) {
      console.error('saveStory error:', error);
    }
  }

  async removeStory() {
    try {
      await this.#dbModel.removeStory(this.#storyId);
      console.log('Cerita berhasil dihapus!');
    } catch (error) {
      console.error('removeStory error:', error);
    }
  }
}
