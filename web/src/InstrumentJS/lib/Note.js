'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Note class. Must be used to create and play notes. */
var Note = function () {
  function Note() {
    var note = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Note);

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
    this.payload = Object.assign({}, this.payload, updatedPayloadFields);
    return this;
  };

  return Note;
}();

exports.default = Note;
module.exports = exports['default'];