'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoteFactory = function () {
  function NoteFactory() {
    (0, _classCallCheck3.default)(this, NoteFactory);
  }

  NoteFactory.prototype.create = function create(noteData) {
    var createdNote = new _Note2.default(noteData);
  };

  return NoteFactory;
}();

exports.default = NoteFactory;
module.exports = exports['default'];