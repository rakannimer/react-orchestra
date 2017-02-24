'use strict';

exports.__esModule = true;

var _reOrderNotes = require('./reOrderNotes');

var _reOrderNotes2 = _interopRequireDefault(_reOrderNotes);

var _isInHigherOctave = require('./isInHigherOctave');

var _isInHigherOctave2 = _interopRequireDefault(_isInHigherOctave);

var _SCALES = require('../constants/SCALES');

var _SCALES2 = _interopRequireDefault(_SCALES);

var _NOTES = require('../constants/NOTES');

var _NOTES2 = _interopRequireDefault(_NOTES);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * getScaleNotes - Get notes for a given scale for _count_ octaves at _startOctave_
 *
 * @param  {string} note        noteName without octave
 * @param  {string} scale       scaleName must be one defined in constants/SCALES
 * @param  {number} startOctave starting octave
 * @param  {number} count       Number of octaves
 * @returns {array}            Array of note names with octave
 */
/* mod */
var getScaleNotes = function getScaleNotes(note, scale, startOctave, count) {
  var startingNoteIndex = _NOTES2.default.indexOf(note);
  if (startingNoteIndex === -1) {
    throw new Error('NOTE IS NOT RECOGNIZED');
  }
  if (_SCALES2.default[scale] == null) {
    throw new Error('SCALE IS NOT RECOGNIZED');
  }
  var scaleSequence = _SCALES2.default[scale].sequence;
  var notes = (0, _reOrderNotes2.default)(note);
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
      if ((0, _isInHigherOctave2.default)(previousNote, currentNote)) {
        currentOctave += 1;
      }
      previousNote = currentNote;
      return '' + currentNote + currentOctave;
    });
    scaleNotesWithInterval = [].concat(scaleNotesWithInterval, currentNotes);
  };

  for (var i = startOctave; i < startOctave + count; i += 1) {
    _loop(i);
  }
  return scaleNotesWithInterval;
};
exports.default = getScaleNotes;
module.exports = exports['default'];