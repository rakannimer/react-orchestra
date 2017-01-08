import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import midiFileParser from 'midi-file-parser';
import base64 from 'base-64';
import MidiIO from './MidiIO/src/';
import Store from './stores/';


const baseURL = 'https://raw.githubusercontent.com/RakanNimer/midi-js-soundfonts/master/MusyngKite';
// const playingNotes = {};


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
// const instrumentNameToRemotePath = instrumentName => `${baseURL}/${instrumentName}-mp3`;
const instrumentAndNoteNameToRemotePath = (instrumentName, noteName) => `${baseURL}/${instrumentName}-mp3/${noteName}.mp3`;

const generateNoteKey = (instrumentName, noteName) => `${instrumentName}-${noteName}`;
const noteKeyToLocalPath = noteKey => `${RNFS.DocumentDirectoryPath}${noteKey}.mp3`;
// const noteKeyToRemotePath = (noteKey) => {
//   const [instrumentName, noteName] = noteKey.split('-');
//   return `${baseURL}/${instrumentName}-mp3/${noteName}.mp3`;
// };

// TODO: make better hash
const getFilenameFromURL = URL => URL.split('/').reduce((prev, cur, i, arr) => ((i === arr.length - 1) ? cur : ''));
const generateMidiKey = midiURL => midiURL;
const midiKeyToLocalPath = key => `${RNFS.DocumentDirectoryPath}/${getFilenameFromURL(key)}`;
// const midiKeyToURL = key => key;

const createSoundFromPath = async localPath => new Promise((resolve, reject) => {
  const sound = new Sound(localPath, '', (error) => {
    if (error) {
      reject(error);
    } else {
      resolve(sound);
    }
  });
});
const playNote = (sound, volume = 1, loopCount = 0) =>
   new Promise((resolve, reject) => {
    // .setNumberOfLoops(5).play().setCurrentTime(0)
     sound.setNumberOfLoops(loopCount).setVolume(volume).play((success, err) => {
       if (success) {
         resolve(sound);
       } else {
         console.warn(`Couldn't play sound in MusicManager.playNote 😞 : ${JSON.stringify(err, 2, 2)}`);
         reject(err);
       }
     }).setCurrentTime(0);
   });

const stopPlayingNote = async (sound, fadeOutDuration = 500) => {
  try {
    await delay(fadeOutDuration);
    sound.pause();
  } catch (err) {
    console.warn(`ERROR IN STOPPING NOTE ${err.message}`);
  }
};

const getSoundFromRemote = async (instrumentName, noteName) => {
  const noteKey = generateNoteKey(instrumentName, noteName);
  const noteURL = instrumentAndNoteNameToRemotePath(instrumentName, noteName);
  const localPath = noteKeyToLocalPath(noteKey);
  await RNFS.downloadFile({ fromUrl: noteURL, toFile: localPath }).promise;
  const mp3File = RNFS.readFile(localPath, 'base64');
  return { mp3File, localPath };
};

const loadSound = async (instrumentName, noteName) => {
  const noteKey = generateNoteKey(instrumentName, noteName);
  const isInDB = await Store.exists('Note', noteKey);
  const remotePath = instrumentAndNoteNameToRemotePath(instrumentName, noteName);
  let notePath;
  if (isInDB) {
    const localPath = noteKeyToLocalPath(noteKey);
    notePath = localPath;
  } else {
    const { localPath } = await getSoundFromRemote(instrumentName, noteName);
    await Store.set('Note', noteKey, { instrumentName, noteName, localPath, remotePath });
    notePath = localPath;
  }
  const noteSound = await createSoundFromPath(notePath);
  return noteSound;
};


// MIDI


const getMidiFromRemote = async (midiURL) => {
  const midiKey = generateMidiKey(midiURL);
  const localPath = midiKeyToLocalPath(midiKey);
  await RNFS.downloadFile({ fromUrl: midiURL, toFile: localPath }).promise;
  return { localPath };
};

const loadMidi = async (midiURL) => {
  const midiKey = generateMidiKey(midiURL);
  const isInDB = await Store.exists('Midi', midiKey);
  let midiPath;
  // if (!isInDB) {
  //   alert('IS IN DB');
  //   midiPath = midiKeyToLocalPath(midiURL);
  // } else {
  const { localPath } = await getMidiFromRemote(midiURL);
  await Store.set('Midi', midiKey, { localPath, remotePath: midiURL });
  midiPath = localPath;
  // }
  let midifile;
  try {
    midifile = await RNFS.readFile(midiPath, 'base64');
  } catch (err) {
    alert(`ERROR Reading Midi from filesystem ${err.message}`);
  }
  let bytes;
  try {
    bytes = base64.decode(midifile);
  } catch (err) {
    alert(`ERROR decodign Midi from filesystem ${err.message}`);
  }

  let jsonMidi;
  let metaAndTracks;
  try {
    jsonMidi = midiFileParser(bytes);
    metaAndTracks = MidiIO.getAllTracks(jsonMidi);
  } catch (err) {
    alert(`ERROR HERE ${err.message}`);
    // throw new Error(err.message, '', {});
  }
  return metaAndTracks;
};

const midiURLToMetaAndTracks = async (midiURL) => {
  // TODO : cache
  let parsedMidi;
  try {
    try {
      parsedMidi = await loadMidi(midiURL); // await MidiIO.parseMidi(midiURL);
    } catch (err) {
      alert(`ERROR ${err.message}`);
    }
    // alert(JSON.stringify(parsedMidi, 2, 2));
    const { meta, tracks } = MidiIO.getTracksAndMetaFromParsedMidi(parsedMidi);
    return { meta, tracks };
  } catch (err) {
    console.warn('Error parsing midi : ', err.message);
    return null;
  }
};

const sharpToBemol = (noteName) => {
  if (noteName.indexOf('#') > -1) {
    const noteNameNoOctave = noteName[0];
    const octave = noteName[noteName.length - 1];
    const noteCharCode = noteNameNoOctave.charCodeAt(0);
    const newNote = noteNameNoOctave !== 'G' ? `${String.fromCharCode(noteCharCode + 1)}b${octave}` : `Ab${octave}`;
    return newNote;
  }
  return noteName;
};

export {
  stopPlayingNote,
  playNote,
  loadSound,
  midiURLToMetaAndTracks,
  generateNoteKey,
  sharpToBemol,
  delay,
};
