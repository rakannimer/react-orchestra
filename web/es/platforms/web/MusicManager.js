import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Promise from 'babel-runtime/core-js/promise';

var _this = this;

// import { noteNamesWithOctaves } from '../../constants/NOTE_NAMES';
// import Sound from './Sound';
import audioContext from './AudioContextSingleton';
import MidiIO from '../../MidiIO/src/';
import Store from './stores/';

var baseURL = 'https://raw.githubusercontent.com/RakanNimer/midi-js-soundfonts/master/MusyngKite';
// const playingNotes = {};

var delay = function delay(ms) {
  return new _Promise(function (resolve) {
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
  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(instrumentName, noteName) {
    var noteURL, mp3, mp3Blob;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
    }, _callee, _this);
  }));

  return function getSoundFromRemote(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getNoteBlob = function () {
  var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(instrumentName, noteName) {
    var noteKey, isNoteCached, item, noteBlob;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            noteKey = generateNoteKey(instrumentName, noteName);
            _context2.next = 3;
            return Store.exists(noteKey);

          case 3:
            isNoteCached = _context2.sent;

            if (!isNoteCached) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return Store.get(noteKey);

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
    }, _callee2, _this);
  }));

  return function getNoteBlob(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var loadSound = function () {
  var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(instrumentName, noteName) {
    var noteBlob;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
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
    }, _callee3, _this);
  }));

  return function loadSound(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var playSound = function playSound(noteBlob) {
  return new _Promise(function (resolve, reject) {
    audioContext.decodeAudioData(noteBlob, function () {
      var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(buffer) {
        var source;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // create a sound source
                source = audioContext.createBufferSource();
                // tell the source which sound to play

                source.buffer = buffer;
                // connect the source to the context's destination (the speakers)
                source.connect(audioContext.destination);
                source.start(0);
                resolve(source);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }));

      return function (_x7) {
        return _ref4.apply(this, arguments);
      };
    }(), function (err) {
      reject(err);
    });
  });
};

var playNote = function () {
  var _ref5 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee5(instrumentName, noteName) {
    var noteBlob;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getNoteBlob(instrumentName, noteName);

          case 2:
            noteBlob = _context5.sent;
            _context5.next = 5;
            return playSound(noteBlob);

          case 5:
            return _context5.abrupt('return', _context5.sent);

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  }));

  return function playNote(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var stopPlayingNote = function () {
  var _ref6 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee6(noteBuffer) {
    var fadeOutDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 700;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
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
    }, _callee6, _this, [[0, 6]]);
  }));

  return function stopPlayingNote(_x10) {
    return _ref6.apply(this, arguments);
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
  var _ref7 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee7(midiURL) {
    var parsedMidi, _MidiIO$getTracksAndM, meta, tracks;

    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return MidiIO.parseMidi(midiURL);

          case 2:
            parsedMidi = _context7.sent;
            _MidiIO$getTracksAndM = MidiIO.getTracksAndMetaFromParsedMidi(parsedMidi), meta = _MidiIO$getTracksAndM.meta, tracks = _MidiIO$getTracksAndM.tracks;
            return _context7.abrupt('return', { meta: meta, tracks: tracks });

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  }));

  return function midiURLToMetaAndTracks(_x12) {
    return _ref7.apply(this, arguments);
  };
}();

export { generateNoteKey, midiURLToMetaAndTracks, playSound, playNote, sharpToBemol, instrumentNameToRemotePath, stopPlayingNote, getNoteBlob, getSoundFromRemote, loadSound, delay };