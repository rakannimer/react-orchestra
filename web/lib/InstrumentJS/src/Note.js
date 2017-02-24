'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Note class. Must be used to create and play notes. */
var Note = function () {
  function Note() {
    var note = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Note);

    this.payload = _lodash2.default.defaultsDeep(note, {
      name: 'A3',
      noteNumber: -1,
      gain: 1,
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 100,
      endTimeInMS: 100,
      fadeDurationInMS: 1000,
      deltaTime: 0,
      msPerTick: 0
    });
    this.payload.id = note.id ? note.id : this.payload.instrumentName + '_' + this.payload.name;
  }
  /**
   * Updates note instrument
   * @param instrumentName. List of all instrument names in src/constants/INSTRUMENTS
   */


  Note.prototype.setInstrument = function setInstrument(instrumentName) {
    this.payload.instrumentName = instrumentName;
  };
  /**
   * Update note
   * @param updatedPayloadFields. Object containing all or part of the payload fields.
   * @returns {object} this
   */


  Note.prototype.update = function update(updatedPayloadFields) {
    this.payload = (0, _assign2.default)({}, this.payload, updatedPayloadFields);
    return this;
  };

  return Note;
}();

exports.default = Note;
module.exports = exports['default'];