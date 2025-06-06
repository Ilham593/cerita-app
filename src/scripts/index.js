import "../styles/styles.css";
import App from "./pages/app";
import {
  registerServiceWorker,
  subscribe,
  unsubscribe,
  isPushSubscribed,
} from "./utils/push";

function updateNav() {
  const token = localStorage.getItem("authToken");
  const navList = document.querySelector("#nav-list");
  if (!navList) return;

  navList.innerHTML = "";

  if (token) {
    navList.innerHTML = `
      <li><a href="#/">Beranda</a></li>
      <li><a href="#/about">About</a></li>
      <li><a href="#/add">Tambah Cerita</a></li>
      <li><a href="#/bookmark">Cerita Tersimpan</a></li>
      <li><button id="push-btn" class="nav-button">Cek Notifikasi...</button></li>
      <li><a href="#" id="logout-link">Keluar</a></li>
    `;
  } else {
    navList.innerHTML = `
      <li><a href="#/login">Masuk</a></li>
      <li><a href="#/">Beranda</a></li>
      <li><a href="#/about">About</a></li>
    `;
  }

  const logoutLink = document.querySelector("#logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("authToken");
      location.hash = "#/login";
      updateNav();
    });
  }

  const pushBtn = document.querySelector("#push-btn");
  if (pushBtn && token) {
    isPushSubscribed().then((subscribed) => {
      pushBtn.textContent = subscribed
        ? "Unsubscribe Notifikasi"
        : "Subscribe Notifikasi";
    });

    pushBtn.addEventListener("click", async () => {
      const subscribed = await isPushSubscribed();
      if (subscribed) {
        await unsubscribe(token);
      } else {
        await subscribe(token);
      }
      updateNav();
    });
  }
}

window.updateNav = updateNav;

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  const isOnLoginPage = location.hash === "#/login";

  if (!token && !isOnLoginPage) {
    location.hash = "#/login";
    return;
  }

  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  window.updateNav();
  await app.renderPage();

  document.querySelector(".skip-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#main-content")?.focus();
  });

  window.addEventListener("hashchange", async () => {
    const token = localStorage.getItem("authToken");
    const publicPages = ["#/login", "#/register"];
    if (!token && !publicPages.includes(location.hash)) {
      location.hash = "#/login";
      return;
    }

    await app.renderPage();
    window.updateNav();
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      if (import.meta.env.DEV) {
        console.warn(" Service worker tidak diaktifkan saat development");
        return;
      }
      navigator.serviceWorker
        .register(`${import.meta.env.BASE_URL}sw.js`)
        .then(() => console.log(" Service worker berhasil terdaftar"))
        .catch((err) => console.error("gagal registrasi service worker:", err));
    });
  }

  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.createElement("button");
    installBtn.textContent = "Install Aplikasi";
    installBtn.id = "install-btn";
    installBtn.style.position = "fixed";
    installBtn.style.bottom = "1rem";
    installBtn.style.right = "1rem";
    installBtn.style.zIndex = "999";
    installBtn.style.padding = "1rem";
    installBtn.style.backgroundColor = "#ff9800";
    installBtn.style.color = "#fff";
    installBtn.style.border = "none";
    installBtn.style.borderRadius = "8px";
    installBtn.style.cursor = "pointer";

    document.body.appendChild(installBtn);

    installBtn.addEventListener("click", async () => {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
      installBtn.remove();
    });
  });
});
