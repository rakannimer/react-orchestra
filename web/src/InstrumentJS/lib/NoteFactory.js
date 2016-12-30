'use strict';

exports.__esModule = true;

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteFactory = function () {
  function NoteFactory() {
    _classCallCheck(this, NoteFactory);
  }

  NoteFactory.prototype.create = function create(noteData) {
    var createdNote = new _Note2.default(noteData);
  };

  return NoteFactory;
}();

exports.default = NoteFactory;
module.exports = exports['default'];