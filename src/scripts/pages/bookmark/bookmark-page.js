export default class BookmarkPage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1>Cerita Tersimpan</h1>
        <div id="bookmark-list">Memuat cerita tersimpan...</div>
      </section>
    `;
  }

  async afterRender() {
    const { default: BookmarkPresenter } = await import('../../presenter/bookmark-presenter.js');
    const { default: Database } = await import('../../data/database.js');

    this.#presenter = new BookmarkPresenter({
      view: this,
      model: Database,
    });

    await this.#presenter.showSavedStories();
  }

  showBookmarkedStories(stories) {
    const container = document.getElementById('bookmark-list');

    if (stories.length === 0) {
      container.innerHTML = '<p>Belum ada cerita yang disimpan.</p>';
      return;
    }

    const html = stories.map((story) => `
      <a href="#/detail/${story.id}" class="story-item" style="text-decoration: none; color: inherit;">
        <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" class="story-image" />
        <h2>${story.name}</h2>
        <p>${story.description}</p>
        <small>Dibuat pada: ${new Date(story.createdAt).toLocaleDateString()}</small>
      </a>
    `).join('');

    container.innerHTML = `
      <div class="story-list">
        ${html}
      </div>
    `;
  }

  showError(message) {
    const container = document.getElementById('bookmark-list');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
  }
}
