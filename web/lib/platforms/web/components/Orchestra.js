'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MidiTrack = require('./MidiTrack');

var _MidiTrack2 = _interopRequireDefault(_MidiTrack);

var _MusicManager = require('../MusicManager');

var _isDefined = require('../../../utils/isDefined');

var _isDefined2 = _interopRequireDefault(_isDefined);

var _callIfExists = require('../../../utils/callIfExists');

var _callIfExists2 = _interopRequireDefault(_callIfExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseMidi = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(props) {
    var midiURL, metaAndTracks;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            midiURL = (0, _isDefined2.default)(props.midiURL, '');
            _context.next = 3;
            return (0, _MusicManager.midiURLToMetaAndTracks)(midiURL);

          case 3:
            metaAndTracks = _context.sent;
            return _context.abrupt('return', metaAndTracks);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function parseMidi(_x) {
    return _ref.apply(this, arguments);
  };
}();

var defaultState = {
  meta: {},
  tracks: [],
  selectedTrackNumbers: []
};

var Orchestra = function (_React$Component) {
  (0, _inherits3.default)(Orchestra, _React$Component);

  function Orchestra(props) {
    (0, _classCallCheck3.default)(this, Orchestra);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = defaultState;
    _this.onNotePlayed = _this.onNotePlayed.bind(_this);
    _this.onNoteStopPlaying = _this.onNoteStopPlaying.bind(_this);
    return _this;
  }

  Orchestra.prototype.componentDidMount = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var newState;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return parseMidi(this.props);

            case 2:
              newState = _context2.sent;

              this.setState(newState);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function componentDidMount() {
      return _ref2.apply(this, arguments);
    }

    return componentDidMount;
  }();

  Orchestra.prototype.onNotePlayed = function onNotePlayed(instrumentName, noteName) {
    (0, _callIfExists2.default)(this.props.onNotePlayed, instrumentName, noteName);
  };

  Orchestra.prototype.onNoteStopPlaying = function onNoteStopPlaying(instrumentName, noteName) {
    (0, _callIfExists2.default)(this.props.onNoteStopPlaying, instrumentName, noteName);
  };

  Orchestra.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      null,
      this.props.children,
      this.state.tracks.map(function (track, i) {
        return _react2.default.createElement(_MidiTrack2.default, {
          onNotePlayed: _this2.onNotePlayed,
          onNoteStopPlaying: _this2.onNoteStopPlaying,
          notes: track,
          meta: _this2.state.meta,
          trackIndex: i,
          key: i,
          renderNote: _this2.props.renderNote,
          play: _this2.props.selectedTracks.indexOf(i) > -1 && _this2.props.play
        });
      })
    );
  };

  return Orchestra;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? Orchestra.propTypes = {
  midiURL: _react.PropTypes.string,
  onMidiLoaded: _react.PropTypes.func,
  onInstrumentsReady: _react.PropTypes.func,
  play: _react.PropTypes.bool,
  selectedTracks: _react.PropTypes.arrayOf(_react.PropTypes.number),
  onNotePlayed: _react.PropTypes.func
} : void 0;
exports.default = Orchestra;
module.exports = exports['default'];