/* mod */
import getInterval from './getInterval';

/**
 * Get all possible interval permutations between these notes. Helpful to be able to guess scale
 * @function
 * @name getIntervalPermutationsFromNoteNames
 * @param {array} noteNames - Without octave
 * @example
 * getIntervalPermutationsFromNoteNames(['A', 'B', 'C'])
 *
 * //  Returns { firstNoteName: 'A', intervals: [0, 9, 10], guessedScales: [] },
 * //  { firstNoteName: 'B', intervals: [0, 2, 11], guessedScales: [] },
 * //  { firstNoteName: 'C', intervals: [0, 1, 3], guessedScales: [] },
 * @return {array} intervalPermutations -
 * [{firstNoteName: string, intervals: number, guessedScales: array}]
 */
const getIntervalPermutationsFromNoteNames = (noteNames) => {
  const intervalsPermutations = [];
  for (let i = 0; i < noteNames.length; i += 1) {
    const intervals = [0];
    const firstNoteName = noteNames[i];
    for (let j = 0; j < noteNames.length; j += 1) {
      if (j !== i) {
        const interval = getInterval(firstNoteName, noteNames[j]);
        intervals.push(interval);
      }
    }
    intervals.sort((a, b) => (a - b));
    const noteIntervals = {
      firstNoteName, // /: firstNoteName.substring(0, firstNoteName.length - 1),
      intervals,
      guessedScales: [],
    };
    intervalsPermutations.push(noteIntervals);
  }
  return intervalsPermutations;
};
export default getIntervalPermutationsFromNoteNames;
