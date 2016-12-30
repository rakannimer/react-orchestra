/* mod */
import NOTES from '../constants/NOTES';
/**
 * reorder a set of notes such that it starts with the firstNote
 * @function
 * @name reOrderNotes
 * @param {string} firstNote
 * @param {array} notes
 * @example
 * reOrderNotes('A' , ['C', 'B', 'A']) // returns ['A', 'B', 'C']
 * reOrderNotes('B') // returns ['B', 'C', 'D', 'E', 'F', 'G', 'A']
 * @return {boolean} isInHigherOctave
 */
var reOrderNotes = function reOrderNotes(startingNote) {
  var notes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOTES;

  var startingNoteIndex = notes.indexOf(startingNote);
  var reorderedNotes = [];
  for (var i = startingNoteIndex; i < notes.length + startingNoteIndex; i += 1) {
    var currentNoteIndex = i % notes.length;
    reorderedNotes.push(notes[currentNoteIndex]);
  }
  return reorderedNotes;
};
export default reOrderNotes;