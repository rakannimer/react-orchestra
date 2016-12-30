function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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