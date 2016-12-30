import _ from 'lodash';
import Promise from 'bluebird';
import MidiIO from '../MidiIO';
import Chance from 'chance';

import Instruments from './Instruments';
import Note from './Note';
import Melody from './Melody';
import SCALES from './constants/SCALES';
import NOTES from './constants/NOTES';


let chance = null;

export default class Musician {

  static getRandomGenerator(seed = window.randomSeed) {
    chance =
      chance === null ?
        new Chance(
          seed ?
            seed :
            (
              window.randomSeed ?
                window.randomSeed :
                undefined
            )
          ) :
        chance;
    return chance;
  }

  static isInHigherOctave(previousNote, nextNote) {
    return NOTES.indexOf(previousNote) >= NOTES.indexOf(nextNote);
  }
  static reOrderNotes(startingNote, notes = NOTES) {
    const startingNoteIndex = notes.indexOf(startingNote);
    const reorderedNotes = [];
    for (let i = startingNoteIndex; i < (notes.length + startingNoteIndex); i += 1) {
      const currentNoteIndex = i % notes.length;
      reorderedNotes.push(notes[currentNoteIndex]);
    }
    return reorderedNotes;
  }
  static getScaleNotes(note, scale, startOctave, endOctave) {
    const startingNoteIndex = NOTES.indexOf(note);
    if (startingNoteIndex === -1) {
      throw new Error('NOTE IS NOT RECOGNIZED');
    }
    if (SCALES[scale] == null) {
      throw new Error('SCALE IS NOT RECOGNIZED');
    }
    const scaleSequence = SCALES[scale].sequence;
    const notes = Musician.reOrderNotes(note);
    const scaleNotes = scaleSequence.map(interval => notes[interval]);
    // scaleNotes = Musician.reOrderNotes('C', scaleNotes);
    let currentOctave = startOctave;
    let scaleNotesWithInterval = [];
    for (let i = startOctave; i <= endOctave; i += 1) {
      let previousNote = scaleNotes[0];
      const currentNotes = scaleNotes.map((currentNote, j) => {
        if (j === 0 && i === startOctave) {
          previousNote = currentNote;
          return `${currentNote}${currentOctave}`;
        }
        if (Musician.isInHigherOctave(previousNote, currentNote)) {
          currentOctave += 1;
        }
        previousNote = currentNote;
        return `${currentNote}${currentOctave}`;
      });
      scaleNotesWithInterval = [...scaleNotesWithInterval, ...currentNotes];
    }
    return scaleNotesWithInterval;
  }
  /*
    notes: [string]
    durationInMS: number
    numberOfNotes: number
  */
  static createMelodyFromNotes(notes, durationInMS = 1000, numberOfNotes = -1) {
    const durationInSeconds = durationInMS / 1000;
    const noteCount = (numberOfNotes === -1) ?
      Musician.getRandomGenerator().integer({ min: durationInSeconds / 2, max: durationInSeconds * 2 }) :
      numberOfNotes;

    let generatedDuration = 0;
    const generatedNotes = Array(...Array(noteCount)).map(() => {
      const selectedNote = Musician.getRandomGenerator().integer({ min: 0, max: notes.length - 1 });
      const noteName = notes[selectedNote];
      return noteName;
    }).map((noteName, i) => {
      let noteDurationInMS = Musician.getRandomGenerator().integer(
        {
          min: (durationInMS / noteCount) - (durationInMS / 10),
          max: (durationInMS / noteCount) + (durationInMS / 10),
        }
      );
      if (i === (noteCount - 1)) {
        noteDurationInMS = durationInMS - generatedDuration;
      }
      // const noteDurationInMS = noteDurationInMS;
      const startTimeInMS = Musician.getRandomGenerator().integer(
        {
          min: 0,
          max: durationInMS - noteDurationInMS, // (durationInMS / noteCount) + (durationInMS / 10),
        }
      );
      const endTimeInMS = startTimeInMS + noteDurationInMS;
      generatedDuration += noteDurationInMS;
      return new Note({ noteName, durationInMS: noteDurationInMS, startTimeInMS, endTimeInMS });
    }).sort((previous, current) => {
      if (previous.payload.startTimeInMS < current.payload.startTimeInMS) {
        return -1;
      }
      if (previous.payload.startTimeInMS > current.payload.startTimeInMS) {
        return 1;
      }
      return 0;
    });

    return new Melody({ notes: generatedNotes });
  }

  static startPlayingMelody(melody, meta) {
    const startTime = Date.now();
    const melodyStartTime = melody[0].payload.startTimeInMS;
    return Promise.map(melody, (note, i) => {
      const currentStartTime = note.payload.startTimeInMS - melodyStartTime;
      return window.delay(currentStartTime).then(() => {
        return Instruments.startPlayingNote(note);
      }).then(() => {
        return window.delay(note.payload.durationInMS);
      }).then(() => {
        return Instruments.stopPlayingNote(note);
      });
    });
  }
  constructor(musician) {
    this.payload = _.defaultsDeep(musician, {
      instrumentNames: ['acoustic_grand_piano'],
      instruments: {},
      melodies: {},
    });
  }
  init() {
    console.log('Initiializing musician and loading required instruments from midi...');
    return Promise.map(this.payload.instrumentNames, (instrumentName) => {
      return Instruments.get(instrumentName).then((instrument) => {
        this.payload.instruments[instrumentName] = instrument;
        return instrument;
      });
    });
  }
  startPlayingNote(note) {
    return Instruments.startPlayingNote(note);
  }

  stopPlayingNote(note) {
    return Instruments.stopPlayingNote(note);
  }
  // Deprecated
  playMelody(melody) {
    const startTime = Date.now();
    const melodyStartTime = melody.payload.notes[0].payload.startTimeInMS;
    return Promise.map(melody.payload.notes, (note, i) => {
      const currentStartTime = note.payload.startTimeInMS - melodyStartTime;
      return window.delay(currentStartTime).then(() => {
        return this.startPlayingNote(note);
      }).then(() => {
        return window.delay(note.payload.durationInMS);
      }).then(() => {
        return this.stopPlayingNote(note);
      });
    });
  }
  stopPlayingMelody(melody) {
    return Promise.map(melody.payload.notes, (note, i) => {
      return this.stopPlayingNote(note.payload.instrumentName, note.payload.noteName);
    });
  }

}
