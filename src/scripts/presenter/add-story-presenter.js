import { addNewStory } from "../data/api";

export default class AddStoryPresenter {
  #view;
  #token;
  #capturedBlob = null;
  #stream = null;
  #marker = null;

  constructor({ view, token }) {
    this.#view = view;
    this.#token = token;
  }

  async initialize() {
    this.#setupMap();
    await this.#setupCamera();
  }

  #setupMap() {
    const map = L.map(this.#view.getMapContainer()).setView([-2.5, 118], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this.#view.setLatLon(lat, lng);

      if (this.#marker) {
        this.#marker.remove();
      }

      this.#marker = L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<strong>Lokasi dipilih:</strong><br>${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        .openPopup();
    });
  }

  async #setupCamera() {
    try {
      this.#stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.#view.setVideoStream(this.#stream);
    } catch (err) {
      console.error('Tidak dapat mengakses kamera:', err);
      this.#view.showMessage('Tidak dapat mengakses kamera.', 'error');
    }
  }

  capturePhoto() {
    const { canvas, ctx } = this.#view.getCanvasContext();
    const video = document.getElementById('camera-video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        this.#view.showMessage('Gagal menangkap gambar.', 'error');
        return;
      }

      this.#capturedBlob = blob;
      const blobUrl = URL.createObjectURL(blob);
      this.#view.showCapturedImage(blobUrl);

      if (this.#stream) {
        this.#stream.getTracks().forEach((track) => track.stop());
      }
    }, 'image/jpeg');
  }

  async submitForm(description, lat, lon) {
    if (!this.#capturedBlob || !description) {
      this.#view.showMessage('Foto dan deskripsi wajib diisi.', 'error');
      return;
    }

    const photoFile = new File([this.#capturedBlob], 'snapshot.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photoFile);
    if (lat && lon) {
      formData.append('lat', lat);
      formData.append('lon', lon);
    }

    try {
      const result = await addNewStory(this.#token, formData);
      this.#view.showMessage(result.message || 'Cerita berhasil dikirim!');
      this.#view.resetFormUI();
      setTimeout(() => { location.hash = '#/'; }, 1000);
    } catch (error) {
      console.error(error);
      this.#view.showMessage(error.message || 'Gagal mengirim cerita.', 'error');
    }
  }

  async restartCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach(track => track.stop());
    }
    await this.#setupCamera();
  }

  destroy() {
    if (this.#stream) {
      this.#stream.getTracks().forEach(track => track.stop());
      this.#stream = null;
    }
  }
}
