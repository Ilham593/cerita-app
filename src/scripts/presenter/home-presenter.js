import { getAllStories } from "../data/api";


export default class HomePresenter {
    #view;
    #token;

    constructor({ view, token }) {
        this.#view = view;
        this.#token = token;
    }

    async showStories() {
        try {
            const stories = await getAllStories(this.#token);

            if (!stories || !Array.isArray(stories) || stories.length === 0) {
                this.#view.showEmptyState();
                return;
            }

            this.#view.showStoriesOnList(stories);
            this.#view.showStoriesOnMap(stories);
        } catch (error) {
            console.error('Gagal mengambil cerita:', error);
            this.#view.showErrorState();
        }
    }
}
