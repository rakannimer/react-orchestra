'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _soundfontPlayer = require('soundfont-player');

var _soundfontPlayer2 = _interopRequireDefault(_soundfontPlayer);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _MidiIO = require('../MidiIO');

var _MidiIO2 = _interopRequireDefault(_MidiIO);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

var _AudioContext = require('./AudioContext');

var _AudioContext2 = _interopRequireDefault(_AudioContext);

var _NOTES = require('./constants/NOTES');

var _NOTES2 = _interopRequireDefault(_NOTES);

var _SCALES = require('./constants/SCALES');

var _SCALES2 = _interopRequireDefault(_SCALES);

var _CHORDS = require('./constants/CHORDS');

var _CHORDS2 = _interopRequireDefault(_CHORDS);

var _helpers = require('./helpers/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var delay = function delay(ms) {
  return new _bluebird2.default(function (resolve) {
    return setTimeout(resolve, ms);
  });
};


// const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
window.delay = function (ms) {
  return new _bluebird2.default(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

/** Instrument Class. Use it to play music from the browser */

var Instrument = function () {
  /**
   * Create an instrument. It will import audio context and prepare its internal state.
   */
  function Instrument() {
    _classCallCheck(this, Instrument);

    this.instruments = {};
    this.ac = _AudioContext2.default;
    this.playingNotes = {};
    this.isPlayingMelody = false;
  }
  /**
   * Loads instrument from the web and stores it as a resolvable promise
   * @param instrumentName. List of all instrument names in src/constants/INSTRUMENTS
   * @returns Promise<musicPlayer>
   */


  Instrument.prototype.get = function get(instrumentName) {
    var _this = this;

    return new _bluebird2.default(function (resolve, reject) {
      if (_lodash2.default.has(_this.instruments, instrumentName)) {
        if (_this.instruments[instrumentName].promise.done) {
          return resolve(_this.instruments[instrumentName].instrument);
        }
        return _this.instruments[instrumentName].promise.then(function (instrument) {
          return resolve(instrument);
        });
      }
      _this.instruments[instrumentName] = {};
      _this.instruments[instrumentName].isLoading = true;
      _this.instruments[instrumentName].instrument = {};
      _this.instruments[instrumentName].promise = _soundfontPlayer2.default.instrument(_AudioContext2.default, instrumentName, {
        nameToUrl: function nameToUrl(name, sf, format) {
          format = format === 'ogg' ? format : 'mp3';
          sf = sf === 'FluidR3_GM' ? sf : 'MusyngKite';
          var url = 'https://d2ovwkm0xvqw0n.cloudfront.net/'; // `https://raw.githubusercontent.com/RakanNimer/midi-js-soundfonts/master/`;// 'https://s3-eu-west-1.amazonaws.com/ut-music-player/midi-js-soundfonts/'
          var fullPath = '' + url + sf + '/' + name + '-' + format + '.js';
          return fullPath;
        }
      }).then(function (instrument) {
        _this.instruments[instrumentName].instrument = instrument;
        _this.instruments[instrumentName].promise.done = true;
        _this.instruments[instrumentName].isLoading = false;
        resolve(instrument);
        return instrument;
      }).catch(function (err) {
        console.log('ERRROR ', err);
        reject('Couldn\'t load instrument ' + instrumentName + '. Error : ' + JSON.stringify(err));
      });
      _this.instruments[instrumentName].promise.done = false;
      return _this.instruments[instrumentName].promise;
    });
  };
  /**
   * Start playing note, if note.payload.durationInMS is -1 it will keep playing infinitely until it is explicitly stopped.
   * { payload: { id, instrumentName, startTimeInMS, instrumentName, name, gain, duration }}
   * @param note
   * @returns Promise<notePlayer>
   */


  Instrument.prototype.startPlayingNote = function startPlayingNote(note) {
    var _this2 = this;

    var noteID = note.payload.id; // `${note.payload.noteName}_${note.payload.instrumentName}`;
    if (!(noteID in this.playingNotes)) {
      this.playingNotes[noteID] = [];
    }
    return delay(note.payload.startTimeInMS).then(function () {
      _this2.playingNotes[noteID].push(_this2.get(note.payload.instrumentName).then(function (instrument) {
        return instrument.start(note.payload.name, null, {
          loop: true,
          gain: note.payload.gain,
          duration: note.payload.duration === -1 ? 9999999 : note.payload.duration / 1000
        });
      }));
      var currentNotePromise = _this2.playingNotes[noteID][_this2.playingNotes[noteID].length - 1];
      if (note.payload.durationInMS !== -1) {
        return delay(note.payload.durationInMS).then(function () {
          return currentNotePromise;
        }).then(function (notePlayer) {
          return notePlayer.stop();
        });
      }
      return currentNotePromise;
    });
  };
  /**
   * Stop playing note
   * { payload: { id, instrumentName, startTimeInMS, instrumentName, name, gain, duration }}
   * @param note
   * @returns Promise<notePlayer>
   */


  Instrument.prototype.stopPlayingNote = function stopPlayingNote(note) {
    if (!note.payload) {
      return _bluebird2.default.resolve(false);
    }
    var noteID = note.payload.id; // note.payload.id ? note.payload.id : `${note.payload.noteName}_${note.payload.instrumentName}`;
    if (typeof this.playingNotes[noteID] === 'undefined') {
      return _bluebird2.default.resolve(true);
    }
    // 'Cloning' promise before deleting note.
    var playingNotes = this.playingNotes[noteID];
    var playingNote = playingNotes[playingNotes.length - 1].then();
    this.playingNotes[noteID].pop();
    if (this.playingNotes[noteID].length === 0) {
      delete this.playingNotes[noteID];
    }
    return delay(note.payload.fadeDurationInMS).then(function () {
      return playingNote;
    }).then(function (notePlayer) {
      notePlayer.stop();
    }).catch(function (error) {
      alert('Failed stopping audio. Unsupported Browser ?' + JSON.stringify(error));
    });
  };

  /**
   * Start playing chord by note names
   * @param noteNames
   * @param note settings
   * @example
   * const instrument = new Instrument();
   * instrument.startPlayingChordByNoteNames(['A3','C3','E3'], {instrumentName: 'acoustic_grand_piano', startTimeInMS: 0, durationInMS: 1000, endTimeInMS: 1000})
   * @returns Promise<notePlayer>
   */


  Instrument.prototype.startPlayingChordByNoteNames = function startPlayingChordByNoteNames(noteNames, settings) {
    var _this3 = this;

    return _bluebird2.default.map(noteNames, function (noteName) {
      var note = new _Note2.default(_extends({}, settings, { name: noteName }));
      return _this3.startPlayingNote(note);
    });
  };

  /**
   * Stop playing chord by note names
   * @param noteNames
   * @param note settings
   * @example
   * const instrument = new Instrument();
   * instrument.stopPlayingChordByNoteNames(['A3','C3','E3'], {instrumentName: 'acoustic_grand_piano', startTimeInMS: 0, durationInMS: 1000, endTimeInMS: 1000})
   * @returns Promise<notePlayer>
   */


  Instrument.prototype.stopPlayingChordByNoteNames = function stopPlayingChordByNoteNames(noteNames, settings) {
    var _this4 = this;

    return _bluebird2.default.map(noteNames, function (noteName) {
      var note = new _Note2.default(_extends({}, settings, { name: noteName }));
      return _this4.stopPlayingNote(note);
    });
  };

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


  Instrument.prototype.startPlayingChordByChordName = function startPlayingChordByChordName(firstNoteName, chordName) {
    var noteSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var noteNames = (0, _helpers.getNoteNamesFromChordName)(firstNoteName, chordName);
    // console.log({ firstNoteName, noteNames });
    return this.startPlayingChordByNoteNames(noteNames, noteSettings);
  };
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


  Instrument.prototype.stopPlayingChordByChordName = function stopPlayingChordByChordName(firstNoteName, chordName) {
    var noteSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var noteNames = (0, _helpers.getNoteNamesFromChordName)(firstNoteName, chordName);
    // console.log({ firstNoteName, noteNames });
    return this.stopPlayingChordByNoteNames(noteNames, noteSettings);
  };

  /**
   * play array of notes
   * @param notes
   * @param meta
   * @param note settings
   * @returns Promise<notePlayer>
   */


  Instrument.prototype.play = function play(notes, meta) {
    var _this5 = this;

    this.isPlayingMelody = true;
    var melodyStartTime = notes[0].payload.startTimeInMS;
    return _bluebird2.default.map(notes, function (note, i) {
      var currentStartTime = note.payload.startTimeInMS - melodyStartTime;
      return window.delay(currentStartTime).then(function () {
        if (_this5.isPlayingMelody === false) {
          throw new function () {
            return { code: 'STOPPED_PLAYING' };
          }();
        }
        return _this5.startPlayingNote(note);
      }).then(function () {
        return window.delay(note.payload.durationInMS);
      }).then(function () {
        return _this5.stopPlayingNote(note);
      }).catch(function (error) {
        if (error.code && error.code === 'STOPPED_PLAYING') {
          return null;
        }throw error;
      });
    });
  };
  /**
   * stop playing array of notes
   * @param notes
   * @param meta
   * @param note settings
   * @returns Promise<notePlayer>
   */


  Instrument.prototype.stop = function stop(notes, meta) {
    var _this6 = this;

    this.isPlayingMelody = false;
    return _bluebird2.default.map(notes, function (note, i) {
      return _this6.stopPlayingNote(note.payload.instrumentName, note.payload.noteName);
    });
  };

  return Instrument;
}();

exports.default = Instrument;
module.exports = exports['default'];