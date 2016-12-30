"use strict";

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
  var set = new Set();
  notes.forEach(function (note) {
    if (note.payload) {
      set.add(note.payload.name);
      return;
    }
    set.add(note);
  });
  return Array.from(set);
};

exports.default = getUniqueNoteNames;
module.exports = exports["default"];