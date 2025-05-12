import { openDB } from 'idb';

const DB_NAME = 'story-app-db';
const DB_VERSION = 1;
const STORE_NAME = 'stories';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

const Database = {
  async putStory(story) {
    if (!story.id) throw new Error('Cerita harus memiliki id');
    return (await dbPromise).put(STORE_NAME, story);
  },

  async getStoryById(id) {
    return (await dbPromise).get(STORE_NAME, id);
  },

  async getAllStories() {
    return (await dbPromise).getAll(STORE_NAME);
  },

  async removeStory(id) {
    return (await dbPromise).delete(STORE_NAME, id);
  },
};

export default Database;
