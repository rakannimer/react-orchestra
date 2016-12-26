// import RNFS from 'react-native-fs';
import Realm from 'realm';

// const localStoragePath = RNFS.DocumentDirectoryPath;
// const baseURL = 'https://raw.githubusercontent.com/RakanNimer/midi-js-soundfonts/master/MusyngKite';

const store = {
  init() {
    // console.warn(JSON.stringify(Realm, 2, 2));
    class Note {}
    Note.schema = {
      name: 'Note',
      properties: {
        key: 'string',
        localPath: 'string',
        remotePath: 'string',
        mp3File: { type: 'data', optional: true },
      },
    };
    class Midi {}
    Midi.schema = {
      name: 'Midi',
      properties: {
        key: 'string',
        localPath: 'string',
        remotePath: 'string',
        midiFile: { type: 'data', optional: true },
      },
    };
    this.realm = new Realm({ schema: [Note, Midi] });
  },
  async set(table, key, value) {
    return new Promise((resolve) => {
      this.realm.write(() => {
        const note = this.realm.create(
          table,
          {
            key,
            ...value,
          },
        );
        resolve(note);
      });
    });
  },
  async get(table, key) {
    return this.realm.objects(table).filtered(`key = "${key}"`);
  },
  exists(table, key) {
    const queryResult = this.realm.objects(table).filtered(`key = "${key}"`);
    return queryResult.length > 0;
  },
};

store.init();

export default store;
