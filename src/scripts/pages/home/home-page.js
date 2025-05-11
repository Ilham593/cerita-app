import HomePresenter from "../../presenter/home-presenter";

export default class HomePage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1>Beranda Cerita</h1>
        <div id="story-list" class="story-list">Memuat cerita...</div>

        <h2 style="margin-top: 40px;">Peta Cerita</h2>
        <div id="map" style="height: 400px; margin-top: 16px; border-radius: 8px;"></div>
      </section>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      const storyList = document.querySelector('#story-list');
      storyList.innerHTML = `<p>Anda belum login. Silakan <a href="#/login">login</a> terlebih dahulu.</p>`;
      return;
    }

    this.#presenter = new HomePresenter({ view: this, token });
    await this.#presenter.showStories();
  }

  showStoriesOnList(stories) {
    const storyListElement = document.querySelector('#story-list');
    storyListElement.innerHTML = stories.map((story) => `
      <article class="story-item">
        <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" class="story-image" />
        <h2>${story.name}</h2>
        <p>${story.description}</p>
        <small>Dibuat pada: ${new Date(story.createdAt).toLocaleDateString()}</small>
      </article>
    `).join('');
  }

  showStoriesOnMap(stories) {
    const mapContainer = document.getElementById('map');
    if (mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null;
      mapContainer.innerHTML = "";
    }

    const map = L.map('map').setView([-2.5489, 118.0149], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`<strong>${story.name}</strong><br>${story.description}`);
      }
    });
  }


  showEmptyState() {
    const storyListElement = document.querySelector('#story-list');
    storyListElement.innerHTML = '<p>Tidak ada cerita ditemukan.</p>';
  }

  showErrorState() {
    const storyListElement = document.querySelector('#story-list');
    storyListElement.innerHTML = '<p>Gagal memuat cerita. Silakan coba lagi nanti.</p>';
  }
}
