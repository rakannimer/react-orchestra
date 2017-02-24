/* mod */
/**
 * @function
 * @name removeOctaveFromNoteName
 * @param {string} noteName -  Note name
 * @example
 * removeOctaveFromNoteName('A3') // returns 'A'
 * @return {string} noteName - Note name
 */
var removeOctaveFromNoteName = function removeOctaveFromNoteName(noteName) {
  var noteNameNoOctave = noteName.slice(0, -1);
  return noteNameNoOctave;
};

export default removeOctaveFromNoteName;