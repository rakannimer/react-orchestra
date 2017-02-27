'use strict';

exports.__esModule = true;
exports.delay = exports.loadSound = exports.getSoundFromRemote = exports.getNoteBlob = exports.stopPlayingNote = exports.instrumentNameToRemotePath = exports.sharpToBemol = exports.playNote = exports.playSound = exports.midiURLToMetaAndTracks = exports.generateNoteKey = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _AudioContextSingleton = require('./AudioContextSingleton');

var _AudioContextSingleton2 = _interopRequireDefault(_AudioContextSingleton);

var _src = require('./MidiIO/src/');

var _src2 = _interopRequireDefault(_src);

var _stores = require('./stores/');

var _stores2 = _interopRequireDefault(_stores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseURL = 'https://raw.githubusercontent.com/RakanNimer/midi-js-soundfonts/master/MusyngKite';
// const playingNotes = {};

// import { noteNamesWithOctaves } from '../../constants/NOTE_NAMES';
// import Sound from './Sound';
var delay = function delay(ms) {
  return new _promise2.default(function (resolve) {
    return setTimeout(resolve, ms);
  });
};
var instrumentNameToRemotePath = function instrumentNameToRemotePath(instrumentName) {
  return baseURL + '/' + instrumentName + '-mp3';
};
var instrumentAndNoteNameToRemotePath = function instrumentAndNoteNameToRemotePath(instrumentName, noteName) {
  return baseURL + '/' + instrumentName + '-mp3/' + noteName + '.mp3';
};

var generateNoteKey = function generateNoteKey(instrumentName, noteName) {
  return instrumentName + '-' + noteName;
};

var getSoundFromRemote = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(instrumentName, noteName) {
    var noteURL, mp3, mp3Blob;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            noteURL = instrumentAndNoteNameToRemotePath(instrumentName, noteName);
            _context.next = 3;
            return fetch(noteURL);

          case 3:
            mp3 = _context.sent;
            _context.next = 6;
            return mp3.arrayBuffer();

          case 6:
            mp3Blob = _context.sent;
            return _context.abrupt('return', mp3Blob);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getSoundFromRemote(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getNoteBlob = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(instrumentName, noteName) {
    var noteKey, isNoteCached, item, noteBlob;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            noteKey = generateNoteKey(instrumentName, noteName);
            _context2.next = 3;
            return _stores2.default.exists(noteKey);

          case 3:
            isNoteCached = _context2.sent;

            if (!isNoteCached) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return _stores2.default.get(noteKey);

          case 7:
            item = _context2.sent;
            return _context2.abrupt('return', item);

          case 9:
            _context2.next = 11;
            return getSoundFromRemote(instrumentName, noteName);

          case 11:
            noteBlob = _context2.sent;
            return _context2.abrupt('return', noteBlob);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getNoteBlob(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var loadSound = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(instrumentName, noteName) {
    var noteBlob;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getNoteBlob(instrumentName, noteName);

          case 2:
            noteBlob = _context3.sent;
            return _context3.abrupt('return', noteBlob);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function loadSound(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var playSound = function playSound(noteBlob, _ref4) {
  var _ref4$gain = _ref4.gain,
      gain = _ref4$gain === undefined ? 1 : _ref4$gain;
  return new _promise2.default(function (resolve, reject) {
    _AudioContextSingleton2.default.decodeAudioData(noteBlob, function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(buffer) {
        var source, gainNode;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // create a sound source
                source = _AudioContextSingleton2.default.createBufferSource();
                // tell the source which sound to play

                source.buffer = buffer;
                // connect the source to the context's destination (the speakers)
                source.connect(_AudioContextSingleton2.default.destination);
                // Create a gain node.
                gainNode = _AudioContextSingleton2.default.createGain();

                source.connect(gainNode);
                gainNode.connect(_AudioContextSingleton2.default.destination);
                // Reduce the volume.
                gainNode.gain.value = gain;
                source.start(0);
                resolve(source);

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function (_x7) {
        return _ref5.apply(this, arguments);
      };
    }(), function (err) {
      reject(err);
    });
  });
};

var playNote = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(instrumentName, noteName, _ref7) {
    var _ref7$gain = _ref7.gain,
        gain = _ref7$gain === undefined ? 1 : _ref7$gain;
    var noteBlob;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getNoteBlob(instrumentName, noteName);

          case 2:
            noteBlob = _context5.sent;
            _context5.next = 5;
            return playSound(noteBlob, { gain: gain });

          case 5:
            return _context5.abrupt('return', _context5.sent);

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function playNote(_x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var stopPlayingNote = function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(noteBuffer) {
    var fadeOutDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 700;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return delay(fadeOutDuration);

          case 3:
            noteBuffer.stop();
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6['catch'](0);

            console.warn('ERROR stopping note playback ' + _context6.t0.message);

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 6]]);
  }));

  return function stopPlayingNote(_x11) {
    return _ref8.apply(this, arguments);
  };
}();

var sharpToBemol = function sharpToBemol(noteName) {
  if (noteName.indexOf('#') > -1) {
    var noteNameNoOctave = noteName[0];
    var octave = noteName[noteName.length - 1];
    var noteCharCode = noteNameNoOctave.charCodeAt(0);
    var newNote = noteNameNoOctave !== 'G' ? String.fromCharCode(noteCharCode + 1) + 'b' + octave : 'Ab' + octave;
    return newNote;
  }
  return noteName;
};

var midiURLToMetaAndTracks = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(midiURL) {
    var parsedMidi, _MidiIO$getTracksAndM, meta, tracks;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _src2.default.parseMidi(midiURL);

          case 2:
            parsedMidi = _context7.sent;
            _MidiIO$getTracksAndM = _src2.default.getTracksAndMetaFromParsedMidi(parsedMidi), meta = _MidiIO$getTracksAndM.meta, tracks = _MidiIO$getTracksAndM.tracks;
            return _context7.abrupt('return', { meta: meta, tracks: tracks });

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function midiURLToMetaAndTracks(_x13) {
    return _ref9.apply(this, arguments);
  };
}();

exports.generateNoteKey = generateNoteKey;
exports.midiURLToMetaAndTracks = midiURLToMetaAndTracks;
exports.playSound = playSound;
exports.playNote = playNote;
exports.sharpToBemol = sharpToBemol;
exports.instrumentNameToRemotePath = instrumentNameToRemotePath;
exports.stopPlayingNote = stopPlayingNote;
exports.getNoteBlob = getNoteBlob;
exports.getSoundFromRemote = getSoundFromRemote;
exports.loadSound = loadSound;
exports.delay = delay;
exports.default = {
  generateNoteKey: generateNoteKey,
  midiURLToMetaAndTracks: midiURLToMetaAndTracks,
  playSound: playSound,
  playNote: playNote,
  sharpToBemol: sharpToBemol,
  instrumentNameToRemotePath: instrumentNameToRemotePath,
  stopPlayingNote: stopPlayingNote,
  getNoteBlob: getNoteBlob,
  getSoundFromRemote: getSoundFromRemote,
  loadSound: loadSound,
  delay: delay
};