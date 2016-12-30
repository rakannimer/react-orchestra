function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import _ from 'lodash';
import Promise from 'bluebird';
import MidiIO from '../MidiIO';
import Chance from 'chance';

import Instruments from './Instruments';
import Note from './Note';
import Melody from './Melody';
import SCALES from './constants/SCALES';
import NOTES from './constants/NOTES';

var chance = null;

var Musician = function () {
  Musician.getRandomGenerator = function getRandomGenerator() {
    var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.randomSeed;

    chance = chance === null ? new Chance(seed ? seed : window.randomSeed ? window.randomSeed : undefined) : chance;
    return chance;
  };

  Musician.isInHigherOctave = function isInHigherOctave(previousNote, nextNote) {
    return NOTES.indexOf(previousNote) >= NOTES.indexOf(nextNote);
  };

  Musician.reOrderNotes = function reOrderNotes(startingNote) {
    var notes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOTES;

    var startingNoteIndex = notes.indexOf(startingNote);
    var reorderedNotes = [];
    for (var i = startingNoteIndex; i < notes.length + startingNoteIndex; i += 1) {
      var currentNoteIndex = i % notes.length;
      reorderedNotes.push(notes[currentNoteIndex]);
    }
    return reorderedNotes;
  };

  Musician.getScaleNotes = function getScaleNotes(note, scale, startOctave, endOctave) {
    var startingNoteIndex = NOTES.indexOf(note);
    if (startingNoteIndex === -1) {
      throw new Error('NOTE IS NOT RECOGNIZED');
    }
    if (SCALES[scale] == null) {
      throw new Error('SCALE IS NOT RECOGNIZED');
    }
    var scaleSequence = SCALES[scale].sequence;
    var notes = Musician.reOrderNotes(note);
    var scaleNotes = scaleSequence.map(function (interval) {
      return notes[interval];
    });
    // scaleNotes = Musician.reOrderNotes('C', scaleNotes);
    var currentOctave = startOctave;
    var scaleNotesWithInterval = [];

    var _loop = function _loop(i) {
      var previousNote = scaleNotes[0];
      var currentNotes = scaleNotes.map(function (currentNote, j) {
        if (j === 0 && i === startOctave) {
          previousNote = currentNote;
          return '' + currentNote + currentOctave;
        }
        if (Musician.isInHigherOctave(previousNote, currentNote)) {
          currentOctave += 1;
        }
        previousNote = currentNote;
        return '' + currentNote + currentOctave;
      });
      scaleNotesWithInterval = [].concat(scaleNotesWithInterval, currentNotes);
    };

    for (var i = startOctave; i <= endOctave; i += 1) {
      _loop(i);
    }
    return scaleNotesWithInterval;
  };
  /*
    notes: [string]
    durationInMS: number
    numberOfNotes: number
  */


  Musician.createMelodyFromNotes = function createMelodyFromNotes(notes) {
    var durationInMS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
    var numberOfNotes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

    var durationInSeconds = durationInMS / 1000;
    var noteCount = numberOfNotes === -1 ? Musician.getRandomGenerator().integer({ min: durationInSeconds / 2, max: durationInSeconds * 2 }) : numberOfNotes;

    var generatedDuration = 0;
    var generatedNotes = Array.apply(undefined, Array(noteCount)).map(function () {
      var selectedNote = Musician.getRandomGenerator().integer({ min: 0, max: notes.length - 1 });
      var noteName = notes[selectedNote];
      return noteName;
    }).map(function (noteName, i) {
      var noteDurationInMS = Musician.getRandomGenerator().integer({
        min: durationInMS / noteCount - durationInMS / 10,
        max: durationInMS / noteCount + durationInMS / 10
      });
      if (i === noteCount - 1) {
        noteDurationInMS = durationInMS - generatedDuration;
      }
      // const noteDurationInMS = noteDurationInMS;
      var startTimeInMS = Musician.getRandomGenerator().integer({
        min: 0,
        max: durationInMS - noteDurationInMS });
      var endTimeInMS = startTimeInMS + noteDurationInMS;
      generatedDuration += noteDurationInMS;
      return new Note({ noteName: noteName, durationInMS: noteDurationInMS, startTimeInMS: startTimeInMS, endTimeInMS: endTimeInMS });
    }).sort(function (previous, current) {
      if (previous.payload.startTimeInMS < current.payload.startTimeInMS) {
        return -1;
      }
      if (previous.payload.startTimeInMS > current.payload.startTimeInMS) {
        return 1;
      }
      return 0;
    });

    return new Melody({ notes: generatedNotes });
  };

  Musician.startPlayingMelody = function startPlayingMelody(melody, meta) {
    var startTime = Date.now();
    var melodyStartTime = melody[0].payload.startTimeInMS;
    return Promise.map(melody, function (note, i) {
      var currentStartTime = note.payload.startTimeInMS - melodyStartTime;
      return window.delay(currentStartTime).then(function () {
        return Instruments.startPlayingNote(note);
      }).then(function () {
        return window.delay(note.payload.durationInMS);
      }).then(function () {
        return Instruments.stopPlayingNote(note);
      });
    });
  };

  function Musician(musician) {
    _classCallCheck(this, Musician);

    this.payload = _.defaultsDeep(musician, {
      instrumentNames: ['acoustic_grand_piano'],
      instruments: {},
      melodies: {}
    });
  }

  Musician.prototype.init = function init() {
    var _this = this;

    console.log('Initiializing musician and loading required instruments from midi...');
    return Promise.map(this.payload.instrumentNames, function (instrumentName) {
      return Instruments.get(instrumentName).then(function (instrument) {
        _this.payload.instruments[instrumentName] = instrument;
        return instrument;
      });
    });
  };

  Musician.prototype.startPlayingNote = function startPlayingNote(note) {
    return Instruments.startPlayingNote(note);
  };

  Musician.prototype.stopPlayingNote = function stopPlayingNote(note) {
    return Instruments.stopPlayingNote(note);
  };
  // Deprecated


  Musician.prototype.playMelody = function playMelody(melody) {
    var _this2 = this;

    var startTime = Date.now();
    var melodyStartTime = melody.payload.notes[0].payload.startTimeInMS;
    return Promise.map(melody.payload.notes, function (note, i) {
      var currentStartTime = note.payload.startTimeInMS - melodyStartTime;
      return window.delay(currentStartTime).then(function () {
        return _this2.startPlayingNote(note);
      }).then(function () {
        return window.delay(note.payload.durationInMS);
      }).then(function () {
        return _this2.stopPlayingNote(note);
      });
    });
  };

  Musician.prototype.stopPlayingMelody = function stopPlayingMelody(melody) {
    var _this3 = this;

    return Promise.map(melody.payload.notes, function (note, i) {
      return _this3.stopPlayingNote(note.payload.instrumentName, note.payload.noteName);
    });
  };

  return Musician;
}();

export { Musician as default };