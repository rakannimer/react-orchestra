'use strict';

exports.__esModule = true;

var _NOTES = require('../constants/NOTES');

var _NOTES2 = _interopRequireDefault(_NOTES);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @name getInterval
 * @param {string} noteNameOne - Without octave
 * @param {string} noteNameTwo - Without octave
 * @example
 * getInterval('A', 'B') // returns 1
 * @return {string} noteName - Note name
 */
var getInterval = function getInterval() {
  var noteOne = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'A';
  var noteTwo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'B';

  var noteOneIndex = _NOTES2.default.indexOf(noteOne);
  var noteTwoIndex = _NOTES2.default.indexOf(noteTwo);
  if (noteTwoIndex < noteOneIndex) {
    return 12 + (noteTwoIndex - noteOneIndex);
  }
  return noteTwoIndex - noteOneIndex;
}; /* mod */
exports.default = getInterval;
module.exports = exports['default'];