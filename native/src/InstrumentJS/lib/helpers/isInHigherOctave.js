'use strict';

exports.__esModule = true;

var _NOTES = require('../constants/NOTES');

var _NOTES2 = _interopRequireDefault(_NOTES);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if interval between noteTwo and noteOne is negative or positive to know when to change octave
 * @function
 * @name isInHigherOctave
 * @param {string} noteOneNoOctave
 * @param {string} noteTwoNoOctave
 * @example
 * isInHigherOctave('A', 'B') // returns false
 * isInHigherOctave('B', 'A') // returns true
 * @return {boolean} isInHigherOctave
 */
var isInHigherOctave = function isInHigherOctave(previousNote, nextNote) {
  return _NOTES2.default.indexOf(previousNote) >= _NOTES2.default.indexOf(nextNote);
}; /* mod */
exports.default = isInHigherOctave;
module.exports = exports['default'];