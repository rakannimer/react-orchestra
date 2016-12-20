import localforage from 'localforage';
const store = {
  init() {
    localforage.config({
      // driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
      name: 'react_orchestra',
      version: 1.0,
      size: 4980736, // Size of database, in bytes. WebSQL-only for now.
      storeName: 'react_orchestra', // Should be alphanumeric, with underscores.
      description: 'React Orchestra storage to cache mp3 notes and store app state',
    });
    this.db = localforage.createInstance({
      name: 'react_orchestra',
    });
  },
  async set(key, value) {
    try {
      return await this.db.setItem(key, value);
    } catch (err) {
      console.warn(`Error : ${JSON.stringify(err.message, 2, 2)}`);
      return null;
    }
  },
  async get(key) {
    try {
      return await this.db.getItem(key);
    } catch (err) {
      console.warn(`Error : ${JSON.stringify(err.message, 2, 2)}`);
      return null;
    }
  },
  async exists(key) {
    try {
      const value = await this.db.getItem(key);
      return value !== null;
    } catch (err) {
      console.warn(`Error : ${JSON.stringify(err.message, 2, 2)}`);
      return false;
    }
  }
};

store.init();

export default store;
