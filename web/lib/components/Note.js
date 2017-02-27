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

var _MusicManager = require('../MusicManager');

var _callIfExists = require('../utils/callIfExists');

var _callIfExists2 = _interopRequireDefault(_callIfExists);

var _isDefined = require('../utils/isDefined');

var _isDefined2 = _interopRequireDefault(_isDefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = function (_React$Component) {
  (0, _inherits3.default)(Note, _React$Component);

  function Note(props) {
    (0, _classCallCheck3.default)(this, Note);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.playingBuffers = [];
    _this.state = {
      isPlaying: false,
      isLoading: true
    };
    _this.startPlayingNote = _this.startPlayingNote.bind(_this);
    _this.stopPlayingNote = _this.stopPlayingNote.bind(_this);
    _this.onClickStart = _this.onClickStart.bind(_this);
    return _this;
  }

  Note.prototype.componentDidMount = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.loadSound();

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function componentDidMount() {
      return _ref.apply(this, arguments);
    }

    return componentDidMount;
  }();

  Note.prototype.componentWillReceiveProps = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(nextProps) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(nextProps.instrumentName !== this.props.instrumentName || nextProps.name !== this.props.name)) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return this.loadSound();

            case 3:
              if (!(!this.props.play && nextProps.play)) {
                _context2.next = 6;
                break;
              }

              _context2.next = 6;
              return this.startPlayingNote();

            case 6:
              if (!(this.props.play && !nextProps.play)) {
                _context2.next = 9;
                break;
              }

              _context2.next = 9;
              return this.stopPlayingNote();

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function componentWillReceiveProps(_x) {
      return _ref2.apply(this, arguments);
    }

    return componentWillReceiveProps;
  }();

  Note.prototype.onClickStart = function onClickStart() {
    if (window.isTouchDevice) {
      return;
    }
    this.startPlayingNote();
  };

  Note.prototype.loadSound = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.setState({ isLoading: true });
              _context3.prev = 1;
              _context3.next = 4;
              return (0, _MusicManager.loadSound)(this.props.instrumentName, this.props.name);

            case 4:
              _context3.next = 10;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3['catch'](1);

              this.setState({ isLoading: false });
              return _context3.abrupt('return');

            case 10:
              this.setState({ isLoading: false });
              (0, _callIfExists2.default)(this.props.onNoteLoaded, this.props.instrumentName, this.props.name);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 6]]);
    }));

    function loadSound() {
      return _ref3.apply(this, arguments);
    }

    return loadSound;
  }();

  Note.prototype.startPlayingNote = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var buffer;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // if (this.props.interactive === false) return;
              this.setState({ isPlaying: true });
              _context4.prev = 1;

              (0, _callIfExists2.default)(this.props.onStartPlayingNote, this.props.instrumentName, this.props.name);
              _context4.next = 5;
              return (0, _MusicManager.playNote)(this.props.instrumentName, this.props.name, { gain: this.props.gain });

            case 5:
              buffer = _context4.sent;

              this.playingBuffers.push(buffer);
              _context4.next = 12;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4['catch'](1);

              console.warn('Something wrong happened with the audio api while playing note ');

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 9]]);
    }));

    function startPlayingNote() {
      return _ref4.apply(this, arguments);
    }

    return startPlayingNote;
  }();

  Note.prototype.stopPlayingNote = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var buffer, fadeOutDuration;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(this.playingBuffers && this.playingBuffers.length === 0)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return');

            case 2:
              (0, _callIfExists2.default)(this.props.onStopPlayingNote, this.props.instrumentName, this.props.name);
              buffer = this.playingBuffers.pop();
              fadeOutDuration = this.props.fadeOutDuration ? this.props.fadeOutDuration : 700;
              _context5.next = 7;
              return (0, _MusicManager.stopPlayingNote)(buffer, fadeOutDuration);

            case 7:
              this.setState({ isPlaying: false });

            case 8:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function stopPlayingNote() {
      return _ref5.apply(this, arguments);
    }

    return stopPlayingNote;
  }();

  Note.prototype.render = function render() {
    if (this.state.isLoading) {
      // console.log(isDefined(this.props.loader, '<div> Loading Note </div>'))
      return (0, _isDefined2.default)(this.props.loader, _react2.default.createElement(
        'div',
        null,
        ' Loading Note '
      ));
    }
    return _react2.default.createElement(
      'div',
      {
        onTouchStart: this.startPlayingNote,
        onTouchEnd: this.stopPlayingNote,
        onMouseDown: this.onClickStart,
        onMouseUp: this.stopPlayingNote,
        className: (0, _isDefined2.default)(this.props.className, '') + ' ' + (0, _classnames2.default)({
          'ro-note-playing': this.state.isPlaying
        }, {
          'ro-note-loading': this.state.isLoading
        })
      },
      this.props.children || _react2.default.createElement('div', null)
    );
  };

  return Note;
}(_react2.default.Component);

Note.defaultProps = {
  play: false,
  instrumentName: 'acoustic_grand_piano',
  name: 'C3',
  onNoteLoaded: function onNoteLoaded() {},
  interactive: true,
  fadeOutDuration: 600,
  loader: _react2.default.createElement('div', null),
  className: '',
  children: _react2.default.createElement('div', null),
  gain: 1,
  onStopPlayingNote: function onStopPlayingNote() {},
  onStartPlayingNote: function onStartPlayingNote() {}
};
exports.default = Note;
module.exports = exports['default'];