import AddStoryPresenter from "../../presenter/add-story-presenter";

export default class AddStoryPage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1>Tambah Cerita Baru</h1>

        <form id="add-story-form">
          <label for="description">Deskripsi</label>
          <textarea id="description" rows="4" required></textarea>

          <label>Ambil Foto dari Kamera</label>
          <video id="camera-video" autoplay playsinline style="width: 100%; max-width: 400px; border-radius: 8px;"></video>
          <p style="font-size: 0.9rem; color: #555; margin-top: 6px;">Cukup 1 klik untuk ambil foto.</p>
          <button type="button" id="capture-btn">Ambil Foto</button>
          <button type="button" id="retake-btn">Ambil Ulang Foto</button>

          <canvas id="snapshot-canvas" style="display: none;"></canvas>
          <img id="preview-image" style="display: none; width: 100%; margin-top: 1rem; border-radius: 8px;" />

          <label>Lokasi</label>
          <div id="map" style="height: 300px; margin-bottom: 1rem;"></div>
          <input type="hidden" id="lat" />
          <input type="hidden" id="lon" />

          <button type="submit">Kirim Cerita</button>
        </form>

        <div id="submit-message"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AddStoryPresenter({ view: this });
    await this.#presenter.initialize();

    document.getElementById('capture-btn')?.addEventListener('click', () => this.#presenter.capturePhoto());
    document.getElementById('retake-btn')?.addEventListener('click', () => this.#presenter.restartCamera());

    document.getElementById('add-story-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = document.getElementById('description').value;
      const lat = document.getElementById('lat').value;
      const lon = document.getElementById('lon').value;
      this.#presenter.submitForm(description, lat, lon);
    });
  }

  unmount() {
    this.#presenter?.destroy();
  }

  setVideoStream(stream) {
    const video = document.getElementById('camera-video');
    video.srcObject = stream;
  }

  showCapturedImage(blobUrl) {
    const preview = document.getElementById('preview-image');
    preview.src = blobUrl;
    preview.style.display = 'block';
  }

  getCanvasContext() {
    const canvas = document.getElementById('snapshot-canvas');
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  }

  resetFormUI() {
    const form = document.getElementById('add-story-form');
    const preview = document.getElementById('preview-image');
    form.reset();
    preview.src = '';
    preview.style.display = 'none';
    document.getElementById('lat').value = '';
    document.getElementById('lon').value = '';
  }

  showMessage(message, type = 'success') {
    const messageEl = document.getElementById('submit-message');
    messageEl.style.color = type === 'success' ? 'green' : 'red';
    messageEl.textContent = message;
  }

  setLatLon(lat, lon) {
    document.getElementById('lat').value = lat;
    document.getElementById('lon').value = lon;
  }

  getMapContainer() {
    return document.getElementById('map');
  }

  showLoginRequired() {
    const section = document.querySelector('.container');
    section.innerHTML = '<p>Anda belum login. Silakan <a href="#/login">login</a> terlebih dahulu.</p>';
  }
}
