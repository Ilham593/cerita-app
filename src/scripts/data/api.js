import CONFIG from "../config";

const ENDPOINTS = {
  GET_ALL_STORIES: `${CONFIG.BASE_URL}/stories?location=1`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

export async function getAllStories(token) {
  const response = await fetch(ENDPOINTS.GET_ALL_STORIES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result.listStory;
}

export async function loginUser(email, password) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();
  if (result.error) throw new Error(result.message);
  return result;
}

export async function registerUser(name, email, password) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const result = await response.json();
  if (result.error) throw new Error(result.message);
  return result;
}

export async function addNewStory(token, formData) {
  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Gagal mengirim cerita.');
  return result;
}

export async function subscribePushNotification({ endpoint, keys }, token) {
  const response = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint, keys }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Gagal berlangganan notifikasi');
  return result;
}

export async function unsubscribePushNotification({ endpoint }, token) {
  const response = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Gagal berhenti langganan notifikasi');
  return result;
}

export async function getStoryById(token, storyId) {
  const response = await fetch(`${CONFIG.BASE_URL}/stories/${storyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Gagal mengambil detail cerita.');
  return result.story;
}

