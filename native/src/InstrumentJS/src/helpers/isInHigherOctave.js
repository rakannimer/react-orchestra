/* mod */
import NOTES from '../constants/NOTES';
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
const isInHigherOctave = (previousNote, nextNote) =>
  (
    NOTES.indexOf(previousNote) >= NOTES.indexOf(nextNote)
  );

export default isInHigherOctave;
