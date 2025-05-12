export default class BookmarkPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showSavedStories() {
    try {
      const stories = await this.#model.getAllStories();
      this.#view.showBookmarkedStories(stories);
    } catch (error) {
      console.error('Gagal mengambil cerita tersimpan:', error);
      this.#view.showError('Gagal memuat cerita tersimpan.');
    }
  }
}
