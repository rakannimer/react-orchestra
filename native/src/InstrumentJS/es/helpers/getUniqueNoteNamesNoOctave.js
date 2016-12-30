/* mod */
/**
 * Get unique note names from array of note objects or note names and remove octave from it
 * @function
 * @name getUniqueNoteNamesNoOctave
 * @param {array} notes - Can contain note objects with payload property or strings of note names
 * @example
 * getUniqueNoteNamesNoOctave(['A3', 'B3', 'A3']) // returns ['A', 'B']
 * getUniqueNoteNamesNoOctave(['A', 'B', 'A']) // returns ['A', 'B']
 * const noteOne = new Note({name: 'A3'});
 * const noteTwo = new Note({name: 'B3'});
 * const noteThree = new Note({name: 'A3'});
 * getUniqueNoteNamesNoOctave([noteOne, noteTwo, noteThree]) // returns ['A', 'B']
 * @return {array} notenames
 */
var getUniqueNoteNamesNoOctave = function getUniqueNoteNamesNoOctave(notes) {
  var set = new Set();
  notes.forEach(function (note) {
    if (note.payload) {
      set.add(note.payload.name.slice(0, -1));
      return;
    }
    set.add(note.slice(0, -1));
  });
  return Array.from(set);
};
export default getUniqueNoteNamesNoOctave;