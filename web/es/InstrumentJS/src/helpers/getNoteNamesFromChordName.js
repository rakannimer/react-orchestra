/* mod */
import CHORDS from '../constants/CHORDS';
import getNoteNamesFromIntervals from './getNoteNamesFromIntervals';
/**
 * Get unique note names from array of note objects or note names
 * @function
 * @name getNoteNamesFromChordName
 * @param {string} firstNoteNameWithOctave - note name with octave e.g. 'A3'
 * @param {string} chordName - Chord name full list of supported chords in src/constants/CHORDS.js
 * @example
 * getNoteNamesFromChordName('A3', 'min') // returns ['A3', 'C3', 'E3']
 * getNoteNamesFromChordName('C3', 'maj') // returns ['C3', 'E3', 'G3']
 * // Full list of supported chords in src/constants/CHORDS.js
 * @return {array} notenames
 */
var getNoteNamesFromChordName = function getNoteNamesFromChordName(firstNoteName, chordName) {
  if (!(chordName in CHORDS)) {
    throw new Error({ code: 'CHORD_DOESNT_EXIST' });
  }
  var octave = firstNoteName.substring(firstNoteName.length - 1, firstNoteName.length);
  var intervals = CHORDS[chordName].sequence;
  var noteNames = getNoteNamesFromIntervals(firstNoteName, intervals, octave);
  return noteNames;
};
export default getNoteNamesFromChordName;