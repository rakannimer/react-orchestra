"use strict";

exports.__esModule = true;
/* mod */
/**
 * @function
 * @name addOctaveToNoteName
 * @param {string} noteName -  Note name
 * @param {number} octave
 * @example
 * addOctaveToNoteName('A', 3) // returns 'A3'
 * @return {string} noteName - Note name
 */
var addOctaveToNoteName = function addOctaveToNoteName(noteName, octave) {
  var noteNameWithOctave = "" + noteName + octave;
  return noteNameWithOctave;
};
exports.default = addOctaveToNoteName;
module.exports = exports["default"];