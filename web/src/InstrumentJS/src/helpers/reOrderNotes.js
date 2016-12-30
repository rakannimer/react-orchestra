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
const reOrderNotes = (startingNote, notes = NOTES) => {
  const startingNoteIndex = notes.indexOf(startingNote);
  const reorderedNotes = [];
  for (let i = startingNoteIndex; i < (notes.length + startingNoteIndex); i += 1) {
    const currentNoteIndex = i % notes.length;
    reorderedNotes.push(notes[currentNoteIndex]);
  }
  return reorderedNotes;
};
export default reOrderNotes;
