// import { noteNamesWithOctaves } from '../../constants/NOTE_NAMES';
// import Sound from './Sound';
import audioContext from "./AudioContextSingleton";
import MidiIO from "./midi-io/";
import Store from "./stores";
import { Midi } from "./types";

const baseURL =
  "https://raw.githubusercontent.com/RakanNimer/midi-js-soundfonts/master/MusyngKite";
// const playingNotes = {};

export type InstrumentName = string;

export type NoteName = string;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const instrumentNameToRemotePath = (instrumentName: InstrumentName) =>
  `${baseURL}/${instrumentName}-mp3`;
const instrumentAndNoteNameToRemotePath = (
  instrumentName: InstrumentName,
  noteName: NoteName
) => `${baseURL}/${instrumentName}-mp3/${noteName}.mp3`;

const generateNoteKey = (instrumentName: InstrumentName, noteName: NoteName) =>
  `${instrumentName}-${noteName}`;

const getSoundFromRemote = async (
  instrumentName: InstrumentName,
  noteName: NoteName
) => {
  const noteURL = instrumentAndNoteNameToRemotePath(instrumentName, noteName);
  const mp3 = await fetch(noteURL);
  const mp3Blob = await mp3.arrayBuffer();
  return mp3Blob;
};

const getNoteBlob = async (
  instrumentName: InstrumentName,
  noteName: NoteName
) => {
  const noteKey = generateNoteKey(instrumentName, noteName);
  const isNoteCached = await Store.exists(noteKey);
  if (isNoteCached) {
    const item = await Store.get(noteKey);
    return item;
  }
  const noteBlob = await getSoundFromRemote(instrumentName, noteName);
  return noteBlob;
};

const loadSound = async (
  instrumentName: InstrumentName,
  noteName: NoteName
) => {
  const noteBlob = await getNoteBlob(instrumentName, noteName);
  return noteBlob;
};

const playSound = (noteBlob: any, { gain = 1 }) =>
  new Promise((resolve, reject) => {
    audioContext.decodeAudioData(
      noteBlob,
      async (buffer: any) => {
        // create a sound source
        const source = audioContext.createBufferSource();
        // tell the source which sound to play
        source.buffer = buffer;
        // connect the source to the context's destination (the speakers)
        source.connect(audioContext.destination);
        // Create a gain node.
        const gainNode = audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        // Reduce the volume.
        gainNode.gain.value = gain;
        source.start(0);
        resolve(source);
      },
      (err: any) => {
        reject(err);
      }
    );
  });

const playNote = async (
  instrumentName: InstrumentName,
  noteName: NoteName,
  { gain = 1 }
) => {
  const noteBlob = await getNoteBlob(instrumentName, noteName);
  return await playSound(noteBlob, { gain });
};

const stopPlayingNote = async (noteBuffer: any, fadeOutDuration = 700) => {
  try {
    await delay(fadeOutDuration);
    noteBuffer.stop();
  } catch (err) {
    console.warn(`ERROR stopping note playback ${err.message}`);
  }
};

const sharpToBemol = (noteName: NoteName) => {
  if (noteName.indexOf("#") > -1) {
    const noteNameNoOctave = noteName[0];
    const octave = noteName[noteName.length - 1];
    const noteCharCode = noteNameNoOctave.charCodeAt(0);
    const newNote =
      noteNameNoOctave !== "G"
        ? `${String.fromCharCode(noteCharCode + 1)}b${octave}`
        : `Ab${octave}`;
    return newNote;
  }
  return noteName;
};

const midiURLToMetaAndTracks = async (midiURL: string) => {
  // TODO : cache
  const parsedMidi = await MidiIO.parseMidi(midiURL);
  const { meta, tracks } = MidiIO.getTracksAndMetaFromParsedMidi(parsedMidi);
  return { meta, tracks };
};

export {
  generateNoteKey,
  midiURLToMetaAndTracks,
  playSound,
  playNote,
  sharpToBemol,
  instrumentNameToRemotePath,
  stopPlayingNote,
  getNoteBlob,
  getSoundFromRemote,
  loadSound,
  delay
};

export default {
  generateNoteKey,
  midiURLToMetaAndTracks,
  playSound,
  playNote,
  sharpToBemol,
  instrumentNameToRemotePath,
  stopPlayingNote,
  getNoteBlob,
  getSoundFromRemote,
  loadSound,
  delay
};
