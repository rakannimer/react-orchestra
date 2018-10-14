/* mod */
/**
 * @function
 * @name removeOctaveFromNoteName
 * @param {string} noteName -  Note name
 * @example
 * removeOctaveFromNoteName('A3') // returns 'A'
 * @return {string} noteName - Note name
 */
const removeOctaveFromNoteName = (noteName) => {
  const noteNameNoOctave = noteName.slice(0, -1);
  return noteNameNoOctave;
};

export default removeOctaveFromNoteName;
