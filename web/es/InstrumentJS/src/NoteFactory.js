import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import Note from './Note';

var NoteFactory = function () {
  function NoteFactory() {
    _classCallCheck(this, NoteFactory);
  }

  NoteFactory.prototype.create = function create(noteData) {
    var createdNote = new Note(noteData);
  };

  return NoteFactory;
}();

export default NoteFactory;