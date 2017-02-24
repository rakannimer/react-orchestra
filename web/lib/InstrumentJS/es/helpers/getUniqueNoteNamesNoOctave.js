"use strict";

exports.__esModule = true;

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* mod */
/**
 * Get unique note names from array of note objects or note names and remove octave from it
 * @function
 * @name getUniqueNoteNamesNoOctave
 * @param {array} notes - Can contain note objects with payload property or strings of note names
 * @example
 * getUniqueNoteNamesNoOctave(['A3', 'B3', 'A3']) // returns ['A', 'B']
 * getUniqueNoteNamesNoOctave(['A', 'B', 'A']) // returns ['A', 'B']
 * const noteOne = new Note({name: 'A3'});
 * const noteTwo = new Note({name: 'B3'});
 * const noteThree = new Note({name: 'A3'});
 * getUniqueNoteNamesNoOctave([noteOne, noteTwo, noteThree]) // returns ['A', 'B']
 * @return {array} notenames
 */
var getUniqueNoteNamesNoOctave = function getUniqueNoteNamesNoOctave(notes) {
  var set = new _set2.default();
  notes.forEach(function (note) {
    if (note.payload) {
      set.add(note.payload.name.slice(0, -1));
      return;
    }
    set.add(note.slice(0, -1));
  });
  return (0, _from2.default)(set);
};
exports.default = getUniqueNoteNamesNoOctave;
module.exports = exports["default"];