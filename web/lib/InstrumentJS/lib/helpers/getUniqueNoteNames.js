"use strict";

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.__esModule = true;
/* mod */
/**
 * Get unique note names from array of note objects or note names
 * @function
 * @name getUniqueNoteNames
 * @param {array} notes - Can contain note objects with payload property or strings of note names
 * @example
 * getUniqueNoteNames(['A3', 'B3', 'A3']) // returns ['A3', 'B3']
 * getUniqueNoteNames(['A', 'B', 'A']) // returns ['A', 'B']
 * const noteOne = new Note({name: 'A3'});
 * const noteTwo = new Note({name: 'B3'});
 * const noteThree = new Note({name: 'A3'});
 * getUniqueNoteNames([noteOne, noteTwo, noteThree]) // returns ['A3', 'B3']
 * @return {array} notenames
 */

var getUniqueNoteNames = function getUniqueNoteNames(notes) {
  var set = new _set2.default();
  notes.forEach(function (note) {
    if (note.payload) {
      set.add(note.payload.name);
      return;
    }
    set.add(note);
  });
  return (0, _from2.default)(set);
};

exports.default = getUniqueNoteNames;
module.exports = exports["default"];