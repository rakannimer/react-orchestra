import SoundfontPlayer from 'soundfont-player';
import Promise from 'bluebird';
import _ from 'lodash';
import MidiIO from '../MidiIO';
import update from 'immutability-helper';
import Note from './Note';
import audioContext from './AudioContext';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
import NOTES from './constants/NOTES';
import SCALES from './constants/SCALES';
import CHORDS from './constants/CHORDS';
import { getNoteNamesFromChordName } from './helpers/';

// const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
window.delay = ms => new Promise(resolve => setTimeout(resolve, ms));


/** Instrument Class. Use it to play music from the browser */
class Instrument {
  /**
   * Create an instrument. It will import audio context and prepare its internal state.
   */
  constructor() {
    this.instruments = {
    };
    this.ac = audioContext;
    this.playingNotes = {};
    this.isPlayingMelody = false;
  }
  /**
   * Loads instrument from the web and stores it as a resolvable promise
   * @param instrumentName. List of all instrument names in src/constants/INSTRUMENTS
   * @returns Promise<musicPlayer>
   */
  get(instrumentName) {
    return new Promise((resolve, reject) => {
      if (_.has(this.instruments, instrumentName)) {
        if (this.instruments[instrumentName].promise.done) {
          return resolve(this.instruments[instrumentName].instrument);
        }
        return this.instruments[instrumentName].promise.then(instrument =>
          resolve(instrument)
        );
      }
      this.instruments[instrumentName] = {};
      this.instruments[instrumentName].isLoading = true;
      this.instruments[instrumentName].instrument = {};
      this.instruments[instrumentName].promise = SoundfontPlayer.instrument(
        audioContext,
        instrumentName,
        {
          nameToUrl: (name, sf, format) => {
            format = format === 'ogg' ? format : 'mp3';
            sf = sf === 'FluidR3_GM' ? sf : 'MusyngKite';
            const url = 'https://d2ovwkm0xvqw0n.cloudfront.net/';// `https://raw.githubusercontent.com/RakanNimer/midi-js-soundfonts/master/`;// 'https://s3-eu-west-1.amazonaws.com/ut-music-player/midi-js-soundfonts/'
            const fullPath = `${url}${sf}/${name}-${format}.js`;
            return fullPath;
          },
        }
      ).then((instrument) => {
        this.instruments[instrumentName].instrument = instrument;
        this.instruments[instrumentName].promise.done = true;
        this.instruments[instrumentName].isLoading = false;
        resolve(instrument);
        return instrument;
      }).catch((err) => {
        console.log('ERRROR ', err);
        reject(`Couldn't load instrument ${instrumentName}. Error : ${JSON.stringify(err)}`);
      });
      this.instruments[instrumentName].promise.done = false;
      return this.instruments[instrumentName].promise;
    });
  }
  /**
   * Start playing note, if note.payload.durationInMS is -1 it will keep playing infinitely until it is explicitly stopped.
   * { payload: { id, instrumentName, startTimeInMS, instrumentName, name, gain, duration }}
   * @param note
   * @returns Promise<notePlayer>
   */
  startPlayingNote(note) {
    const noteID = note.payload.id; // `${note.payload.noteName}_${note.payload.instrumentName}`;
    if (!(noteID in this.playingNotes)) {
      this.playingNotes[noteID] = [];
    }
    return delay(note.payload.startTimeInMS).then(() => {
      this.playingNotes[noteID].push(
        this.get(note.payload.instrumentName).then((instrument) => {
          return instrument.start(note.payload.name, null, {
            loop: true,
            gain: note.payload.gain,
            duration: note.payload.duration === -1 ? 9999999 : note.payload.duration / 1000,
          });
        })
      );
      const currentNotePromise = this.playingNotes[noteID][this.playingNotes[noteID].length - 1];
      if (note.payload.durationInMS !== -1) {
        return delay(note.payload.durationInMS)
        .then(() => currentNotePromise).then(notePlayer => notePlayer.stop());
      }
      return currentNotePromise;
    });
  }
  /**
   * Stop playing note
   * { payload: { id, instrumentName, startTimeInMS, instrumentName, name, gain, duration }}
   * @param note
   * @returns Promise<notePlayer>
   */
  stopPlayingNote(note) {
    if (!note.payload) {
      return Promise.resolve(false);
    }
    const noteID = note.payload.id; // note.payload.id ? note.payload.id : `${note.payload.noteName}_${note.payload.instrumentName}`;
    if (typeof this.playingNotes[noteID] === 'undefined') {
      return Promise.resolve(true);
    }
    // 'Cloning' promise before deleting note.
    const playingNotes = this.playingNotes[noteID];
    const playingNote = playingNotes[playingNotes.length - 1].then();
    this.playingNotes[noteID].pop();
    if (this.playingNotes[noteID].length === 0) {
      delete this.playingNotes[noteID];
    }
    return delay(note.payload.fadeDurationInMS)
    .then(() =>
      playingNote
    ).then((notePlayer) => {
      notePlayer.stop();
    }).catch((error) => {
      alert(`Failed stopping audio. Unsupported Browser ?${JSON.stringify(error)}`);
    });
  }

  /**
   * Start playing chord by note names
   * @param noteNames
   * @param note settings
   * @example
   * const instrument = new Instrument();
   * instrument.startPlayingChordByNoteNames(['A3','C3','E3'], {instrumentName: 'acoustic_grand_piano', startTimeInMS: 0, durationInMS: 1000, endTimeInMS: 1000})
   * @returns Promise<notePlayer>
   */
  startPlayingChordByNoteNames(noteNames, settings) {
    return Promise.map(noteNames, (noteName) => {
      const note = new Note({ ...settings, name: noteName });
      return this.startPlayingNote(note);
    });
  }

  /**
   * Stop playing chord by note names
   * @param noteNames
   * @param note settings
   * @example
   * const instrument = new Instrument();
   * instrument.stopPlayingChordByNoteNames(['A3','C3','E3'], {instrumentName: 'acoustic_grand_piano', startTimeInMS: 0, durationInMS: 1000, endTimeInMS: 1000})
   * @returns Promise<notePlayer>
   */
  stopPlayingChordByNoteNames(noteNames, settings) {
    return Promise.map(noteNames, (noteName) => {
      const note = new Note({ ...settings, name: noteName });
      return this.stopPlayingNote(note);
    });
  }

  /**
   * startPlayingChordByChordName
   * @param firstNoteName
   * @param chordName
   * @param note settings
   * @example
   * const instrument = new Instrument();
   * instrument.startPlayingChordByChordName('A3', 'maj', {instrumentName: 'acoustic_grand_piano', startTimeInMS: 0, durationInMS: 1000, endTimeInMS: 1000})
   * @returns Promise<notePlayer>
   */
  startPlayingChordByChordName(firstNoteName, chordName, noteSettings = {}) {
    const noteNames = getNoteNamesFromChordName(firstNoteName, chordName);
    // console.log({ firstNoteName, noteNames });
    return this.startPlayingChordByNoteNames(noteNames, noteSettings);
  }
  /**
   * stopPlayingChordByChordName
   * @param firstNoteName
   * @param chordName
   * @param note settings
   * @example
   * const instrument = new Instrument();
   * instrument.stopPlayingChordByChordName('A3', 'maj', {instrumentName: 'acoustic_grand_piano', startTimeInMS: 0, durationInMS: 1000, endTimeInMS: 1000})
   * @returns Promise<notePlayer>
   */
  stopPlayingChordByChordName(firstNoteName, chordName, noteSettings = {}) {
    const noteNames = getNoteNamesFromChordName(firstNoteName, chordName);
    // console.log({ firstNoteName, noteNames });
    return this.stopPlayingChordByNoteNames(noteNames, noteSettings);
  }

  /**
   * play array of notes
   * @param notes
   * @param meta
   * @param note settings
   * @returns Promise<notePlayer>
   */
  play(notes, meta) {
    this.isPlayingMelody = true;
    const melodyStartTime = notes[0].payload.startTimeInMS;
    return Promise.map(notes, (note, i) => {
      const currentStartTime = note.payload.startTimeInMS - melodyStartTime;
      return window.delay(currentStartTime).then(() => {
        if (this.isPlayingMelody === false) {
          throw new (
            () => ({ code: 'STOPPED_PLAYING' })
          )();
        }
        return this.startPlayingNote(note);
      }).then(() => {
        return window.delay(note.payload.durationInMS);
      }).then(() => {
        return this.stopPlayingNote(note);
      }).catch((error) => {
        if (error.code && error.code === 'STOPPED_PLAYING') {
          return null;
        } throw error;
      });
    });
  }
  /**
   * stop playing array of notes
   * @param notes
   * @param meta
   * @param note settings
   * @returns Promise<notePlayer>
   */
  stop(notes, meta) {
    this.isPlayingMelody = false;
    return Promise.map(notes, (note, i) => {
      return this.stopPlayingNote(note.payload.instrumentName, note.payload.noteName);
    });
  }
}
export default Instrument;
