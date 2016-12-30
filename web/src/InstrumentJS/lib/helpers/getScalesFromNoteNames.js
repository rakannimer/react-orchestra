'use strict';

exports.__esModule = true;

var _SCALES = require('../constants/SCALES');

var _SCALES2 = _interopRequireDefault(_SCALES);

var _getUniqueNoteNamesNoOctave = require('./getUniqueNoteNamesNoOctave');

var _getUniqueNoteNamesNoOctave2 = _interopRequireDefault(_getUniqueNoteNamesNoOctave);

var _getIntervalPermutationsFromNoteNames = require('./getIntervalPermutationsFromNoteNames');

var _getIntervalPermutationsFromNoteNames2 = _interopRequireDefault(_getIntervalPermutationsFromNoteNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * getScalesFromNoteNames - Get all scales matched with the given notes
 *
 * @param  {array} noteNames    noteNames with octave
 * @returns {array}            Array of note names with octave
 *                            [{firstNoteName: string, intervals: number, guessedScales: array}]
 * @example
 * getScalesFromNoteNames(['A3', 'B3', 'C3']);
 * // [
 * //   {
 * //     firstNoteName: 'A',
 * //     intervals: [0, 9, 10],
 * //     guessedScales: ['dorian', 'mixolydian', 'acoustic', 'algerian', 'majorBlues']
 * //   },
 * //  {
 * //     firstNoteName: 'B',
 * //     intervals: [0, 2, 11],
 * //     guessedScales: ['ionian', 'lydian', 'harmonicMinor', 'melodicMinorAsc']
 * //   },
 * //  {
 * //    firstNoteName: 'C',
 * //    intervals: [0, 1, 3],
 * //    guessedScales: ['phrygian', 'locrian', 'altered']
 * //  },
 * // ]
 */
var getScalesFromNoteNames = function getScalesFromNoteNames(noteNames) {
  var uniqueNoteNames = (0, _getUniqueNoteNamesNoOctave2.default)(noteNames);
  var sequencePermutations = (0, _getIntervalPermutationsFromNoteNames2.default)(uniqueNoteNames);
  Object.keys(_SCALES2.default).forEach(function (scaleName) {
    var scaleSequence = _SCALES2.default[scaleName].sequence;
    if (scaleName === 'chromatic') {
      return;
    }
    sequencePermutations.forEach(function (sequencePermutation, i) {
      var isInScaleSequence = sequencePermutation.intervals.reduce(function (prev, current) {
        if (prev === false) {
          return false;
        }
        return scaleSequence.indexOf(current) !== -1;
      }, true);
      if (isInScaleSequence) {
        sequencePermutations[i].guessedScales.push(scaleName);
      }
    });
  });
  return sequencePermutations;
}; /* mod */
exports.default = getScalesFromNoteNames;
module.exports = exports['default'];