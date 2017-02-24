'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

var _src = require('../InstrumentJS/src/');

var _callIfExists = require('../utils/callIfExists');

var _callIfExists2 = _interopRequireDefault(_callIfExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import NoteHelpers from '../utils/';
var createNotesFromScale = function createNotesFromScale() {
  var noteName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'C';
  var scaleName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ionian';
  var startOctave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var octaveCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  return _src.InstrumentHelpers.getScaleNotes(noteName, scaleName, startOctave, octaveCount);
};

// createNote


var NoteFactory = function (_React$Component) {
  (0, _inherits3.default)(NoteFactory, _React$Component);

  function NoteFactory() {
    (0, _classCallCheck3.default)(this, NoteFactory);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  NoteFactory.prototype.renderNotesFromScale = function renderNotesFromScale() {
    var _this2 = this;

    var _props = this.props,
        noteName = _props.noteName,
        scaleName = _props.scaleName,
        instrumentName = _props.instrumentName,
        startOctave = _props.startOctave,
        octaveCount = _props.octaveCount;

    var notes = createNotesFromScale(noteName, scaleName, startOctave, octaveCount);
    var notesElements = notes.map(function (currentNoteName, i) {
      return _react2.default.createElement(
        _Note2.default,
        (0, _extends3.default)({
          key: i,
          name: currentNoteName,
          instrumentName: instrumentName,
          startOctave: startOctave,
          octaveCount: octaveCount
        }, _this2.props.noteProps),
        (0, _callIfExists2.default)(_this2.props.renderNote, instrumentName, currentNoteName, i)
      );
    });
    return notesElements;
  };

  NoteFactory.prototype.render = function render() {

    var renderedNotes = void 0;
    switch (this.props.type) {
      case 'scale':
        renderedNotes = this.renderNotesFromScale();
        break;
      default:
        renderedNotes = null;
        break;
    }
    return _react2.default.createElement(
      'div',
      null,
      renderedNotes
    );
  };

  return NoteFactory;
}(_react2.default.Component);

exports.default = NoteFactory;
module.exports = exports['default'];