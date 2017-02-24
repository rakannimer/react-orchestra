'use strict';

exports.__esModule = true;

var _CHORDS = require('../constants/CHORDS');

var _CHORDS2 = _interopRequireDefault(_CHORDS);

var _getNoteNamesFromIntervals = require('./getNoteNamesFromIntervals');

var _getNoteNamesFromIntervals2 = _interopRequireDefault(_getNoteNamesFromIntervals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get unique note names from array of note objects or note names
 * @function
 * @name getNoteNamesFromChordName
 * @param {string} firstNoteNameWithOctave - note name with octave e.g. 'A3'
 * @param {string} chordName - Chord name full list of supported chords in src/constants/CHORDS.js
 * @example
 * getNoteNamesFromChordName('A3', 'min') // returns ['A3', 'C3', 'E3']
 * getNoteNamesFromChordName('C3', 'maj') // returns ['C3', 'E3', 'G3']
 * // Full list of supported chords in src/constants/CHORDS.js
 * @return {array} notenames
 */
/* mod */
var getNoteNamesFromChordName = function getNoteNamesFromChordName(firstNoteName, chordName) {
  if (!(chordName in _CHORDS2.default)) {
    throw new Error({ code: 'CHORD_DOESNT_EXIST' });
  }
  var octave = firstNoteName.substring(firstNoteName.length - 1, firstNoteName.length);
  var intervals = _CHORDS2.default[chordName].sequence;
  var noteNames = (0, _getNoteNamesFromIntervals2.default)(firstNoteName, intervals, octave);
  return noteNames;
};
exports.default = getNoteNamesFromChordName;
module.exports = exports['default'];