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
var getIntervalPermutationsFromNoteNames = function getIntervalPermutationsFromNoteNames(noteNames) {
  var intervalsPermutations = [];
  for (var i = 0; i < noteNames.length; i += 1) {
    var intervals = [0];
    var firstNoteName = noteNames[i];
    for (var j = 0; j < noteNames.length; j += 1) {
      if (j !== i) {
        var interval = getInterval(firstNoteName, noteNames[j]);
        intervals.push(interval);
      }
    }
    intervals.sort(function (a, b) {
      return a - b;
    });
    var noteIntervals = {
      firstNoteName: firstNoteName, // /: firstNoteName.substring(0, firstNoteName.length - 1),
      intervals: intervals,
      guessedScales: []
    };
    intervalsPermutations.push(noteIntervals);
  }
  return intervalsPermutations;
};
export default getIntervalPermutationsFromNoteNames;