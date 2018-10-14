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
const getInterval = (noteOne = 'A', noteTwo = 'B') => {
  const noteOneIndex = NOTES.indexOf(noteOne);
  const noteTwoIndex = NOTES.indexOf(noteTwo);
  if (noteTwoIndex < noteOneIndex) {
    return 12 + (noteTwoIndex - noteOneIndex);
  }
  return noteTwoIndex - noteOneIndex;
};

export default getInterval;
