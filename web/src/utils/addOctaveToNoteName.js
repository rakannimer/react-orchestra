/* mod */
/**
 * @function
 * @name addOctaveToNoteName
 * @param {string} noteName -  Note name
 * @param {number} octave
 * @example
 * addOctaveToNoteName('A', 3) // returns 'A3'
 * @return {string} noteName - Note name
 */
const addOctaveToNoteName = (noteName, octave) => {
  const noteNameWithOctave = `${noteName}${octave}`;
  return noteNameWithOctave;
};
export default addOctaveToNoteName;
