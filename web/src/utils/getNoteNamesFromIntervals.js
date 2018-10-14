/* mod */
import NOTES from '../constants/NOTES';

/**
 * Get unique note names from array of note objects or note names
 * @function
 * @name getNoteNamesFromIntervals
 * @param {string} noteNameWithOctave - note name with octave e.g. 'A3'
 * @example
 * getNoteNamesFromChordName('A3', [0, 2, 3]) // returns ['A3', 'B3', 'C3']
 * // Full list of supported chords in src/constants/CHORDS.js
 * @return {array} notenames
 */
const getNoteNamesFromIntervals = (firstNoteName, intervals) => {
  const octave = firstNoteName.substring(firstNoteName.length - 1, firstNoteName.length);
  const firstNoteIndex = NOTES.indexOf(firstNoteName.substring(0, firstNoteName.length - 1));
  const notes = intervals.map((interval) => {
    const noteIndex = (interval + firstNoteIndex) % 12;
    return `${NOTES[noteIndex]}${octave}`;
  });
  return notes;
};

export default getNoteNamesFromIntervals;
