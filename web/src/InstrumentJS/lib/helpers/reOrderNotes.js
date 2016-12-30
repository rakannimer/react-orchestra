'use strict';

exports.__esModule = true;

var _NOTES = require('../constants/NOTES');

var _NOTES2 = _interopRequireDefault(_NOTES);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * reorder a set of notes such that it starts with the firstNote
 * @function
 * @name reOrderNotes
 * @param {string} firstNote
 * @param {array} notes
 * @example
 * reOrderNotes('A' , ['C', 'B', 'A']) // returns ['A', 'B', 'C']
 * reOrderNotes('B') // returns ['B', 'C', 'D', 'E', 'F', 'G', 'A']
 * @return {boolean} isInHigherOctave
 */
var reOrderNotes = function reOrderNotes(startingNote) {
  var notes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _NOTES2.default;

  var startingNoteIndex = notes.indexOf(startingNote);
  var reorderedNotes = [];
  for (var i = startingNoteIndex; i < notes.length + startingNoteIndex; i += 1) {
    var currentNoteIndex = i % notes.length;
    reorderedNotes.push(notes[currentNoteIndex]);
  }
  return reorderedNotes;
}; /* mod */
exports.default = reOrderNotes;
module.exports = exports['default'];