'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _callIfExists = require('../utils/callIfExists');

var _callIfExists2 = _interopRequireDefault(_callIfExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Instrument = function (_React$Component) {
  (0, _inherits3.default)(Instrument, _React$Component);

  function Instrument(props) {
    (0, _classCallCheck3.default)(this, Instrument);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.onStartPlaying = _this.onStartPlaying.bind(_this);
    _this.onStopPlaying = _this.onStopPlaying.bind(_this);
    _this.onNoteLoaded = _this.onNoteLoaded.bind(_this);
    _this.loadingNotesCounter = 0;
    _this.state = {
      isLoaded: false
    };
    return _this;
  }

  Instrument.prototype.onStartPlaying = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(noteName) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _callIfExists2.default)(this.props.onStartPlaying, noteName);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function onStartPlaying(_x) {
      return _ref.apply(this, arguments);
    }

    return onStartPlaying;
  }();

  Instrument.prototype.onStopPlaying = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(noteName) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              (0, _callIfExists2.default)(this.props.onStopPlaying, noteName);

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function onStopPlaying(_x2) {
      return _ref2.apply(this, arguments);
    }

    return onStopPlaying;
  }();

  Instrument.prototype.onNoteLoaded = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(instrumentName, noteName) {
      var noteCount;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.loadingNotesCounter += 1;
              noteCount = this.props.children.length;

              if (noteCount === this.loadingNotesCounter) {
                this.setState({ isLoaded: true });
                (0, _callIfExists2.default)(this.props.onInstrumentLoaded, this.props.name, noteName);
              }

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function onNoteLoaded(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return onNoteLoaded;
  }();

  Instrument.prototype.render = function render() {
    var _this2 = this;

    // Because I can !
    var loader = this.state.isLoaded ? null : this.props.loader ? this.props.loader : _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        null,
        'Loading  Instrument \uD83D\uDE9A \uD83D\uDE9A \uD83D\uDE9A'
      )
    );
    return _react2.default.createElement(
      'div',
      {
        style: this.props.style,
        className: (0, _classnames2.default)({ 'ro-instrument-loading': !this.state.isLoaded }, { 'ro-instrument-loaded': this.state.isLoaded })
      },
      loader,
      _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, {
          instrumentName: child.props.instrumentName || _this2.props.name,
          onStartPlaying: _this2.onStartPlaying,
          onStopPlaying: _this2.onStopPlaying,
          onNoteLoaded: _this2.onNoteLoaded,
          interactive: _this2.props.interactive || true
        });
      })
    );
  };

  return Instrument;
}(_react2.default.Component);
// import {
//   loadInstrument,
//   stopPlayingNote,
//   playSound,
//   getNoteBlob,
//   playNote,
//   loadSound,
// } from '../MusicManager';


Instrument.defaultProps = {
  name: 'acoustic_grand_piano'
};

exports.default = Instrument;
module.exports = exports['default'];