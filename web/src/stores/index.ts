import localforage from "localforage";

class Store {
  db: LocalForage;
  constructor() {
    localforage.config({
      // driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
      name: "react_orchestra",
      version: 1.0,
      size: 4980736, // Size of database, in bytes. WebSQL-only for now.
      storeName: "react_orchestra", // Should be alphanumeric, with underscores.
      description:
        "React Orchestra storage to cache mp3 notes and store app state"
    });
    this.db = localforage.createInstance({
      name: "react_orchestra"
    });
  }
  async set(key: string, value: any) {
    try {
      return await this.db.setItem(key, value);
    } catch (err) {
      console.warn(`Error : ${JSON.stringify(err.message, null, 2)}`);
      return null;
    }
  }
  async get(key: string) {
    try {
      return await this.db.getItem(key);
    } catch (err) {
      console.warn(`Error : ${JSON.stringify(err.message, null, 2)}`);
      return null;
    }
  }
  async exists(key: string) {
    try {
      const value = await this.db.getItem(key);
      return value !== null;
    } catch (err) {
      console.warn(`Error : ${JSON.stringify(err.message, null, 2)}`);
      return false;
    }
  }
}

const store = new Store();
export default store;
