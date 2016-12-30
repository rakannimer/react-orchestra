/* mod */
import SCALES from '../constants/SCALES';
import getUniqueNoteNamesNoOctave from './getUniqueNoteNamesNoOctave';
import getIntervalPermutationsFromNoteNames from './getIntervalPermutationsFromNoteNames';

/**
 * getScalesFromNoteNames - Get all scales matched with the given notes
 *
 * @param  {array} noteNames    noteNames with octave
 * @returns {array}            Array of note names with octave
 *                            [{firstNoteName: string, intervals: number, guessedScales: array}]
 * @example
 * getScalesFromNoteNames(['A3', 'B3', 'C3']);
 * // [
 * //   {
 * //     firstNoteName: 'A',
 * //     intervals: [0, 9, 10],
 * //     guessedScales: ['dorian', 'mixolydian', 'acoustic', 'algerian', 'majorBlues']
 * //   },
 * //  {
 * //     firstNoteName: 'B',
 * //     intervals: [0, 2, 11],
 * //     guessedScales: ['ionian', 'lydian', 'harmonicMinor', 'melodicMinorAsc']
 * //   },
 * //  {
 * //    firstNoteName: 'C',
 * //    intervals: [0, 1, 3],
 * //    guessedScales: ['phrygian', 'locrian', 'altered']
 * //  },
 * // ]
 */
const getScalesFromNoteNames = (noteNames) => {
  const uniqueNoteNames = getUniqueNoteNamesNoOctave(noteNames);
  const sequencePermutations = getIntervalPermutationsFromNoteNames(uniqueNoteNames);
  Object.keys(SCALES).forEach((scaleName) => {
    const scaleSequence = SCALES[scaleName].sequence;
    if (scaleName === 'chromatic') {
      return;
    }
    sequencePermutations.forEach((sequencePermutation, i) => {
      const isInScaleSequence = sequencePermutation.intervals.reduce((prev, current) => {
        if (prev === false) {
          return false;
        }
        return scaleSequence.indexOf(current) !== -1;
      }, true);
      if (isInScaleSequence) {
        sequencePermutations[i].guessedScales.push(scaleName);
      }
    });
  });
  return sequencePermutations;
};

export default getScalesFromNoteNames;
