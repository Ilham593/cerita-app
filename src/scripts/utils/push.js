import CONFIG from '../config';
import {
  subscribePushNotification,
  unsubscribePushNotification,
} from '../data/api';

function convertBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map(c => c.charCodeAt(0)));
}

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service worker berhasil terdaftar');
    } catch (err) {
      console.error('❌ Gagal registrasi service worker:', err);
    }
  }
}

export async function isPushSubscribed() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  return !!subscription;
}

export async function subscribe(token) {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('❌ Izin notifikasi tidak diberikan.');
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertBase64ToUint8Array(CONFIG.VAPID_PUBLIC_KEY),
  });

  const { endpoint, keys } = subscription.toJSON();
  await subscribePushNotification({ endpoint, keys }, token);
  alert('✅ Notifikasi berhasil diaktifkan.');
}

export async function unsubscribe(token) {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    alert('ℹ️ Anda belum berlangganan notifikasi.');
    return;
  }

  const { endpoint } = subscription;
  await unsubscribePushNotification({ endpoint }, token);
  await subscription.unsubscribe();
  alert('🔕 Notifikasi berhasil dinonaktifkan.');
}
