/* mod */
import NOTES from '../constants/NOTES';

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

  var noteOneIndex = NOTES.indexOf(noteOne);
  var noteTwoIndex = NOTES.indexOf(noteTwo);
  if (noteTwoIndex < noteOneIndex) {
    return 12 + (noteTwoIndex - noteOneIndex);
  }
  return noteTwoIndex - noteOneIndex;
};

export default getInterval;