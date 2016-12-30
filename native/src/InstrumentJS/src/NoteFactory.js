import Note from './Note';

class NoteFactory {
  create(noteData) {
    const createdNote = new Note(noteData);
  }
}
export default NoteFactory;
