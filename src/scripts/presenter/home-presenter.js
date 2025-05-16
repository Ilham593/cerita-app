import { getAllStories } from "../data/api";

export default class HomePresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async showStories() {
    const token = localStorage.getItem("authToken");

    if (!token) {
      this.#view.showLoginRequired();
      return;
    }

    try {
      const stories = await getAllStories(token);

      if (!stories || !Array.isArray(stories) || stories.length === 0) {
        this.#view.showEmptyState();
        return;
      }

      this.#view.showStoriesOnList(stories);
      this.#view.showStoriesOnMap(stories);
    } catch (error) {
      console.error("Gagal mengambil cerita:", error);
      this.#view.showErrorState();
    }
  }
}
