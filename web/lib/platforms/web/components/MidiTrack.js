'use strict';

exports.__esModule = true;
exports.default = undefined;

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

var _src = require('../../../MidiIO/src/');

var _src2 = _interopRequireDefault(_src);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

var _MusicManager = require('../MusicManager');

var _callIfExists = require('../../../utils/callIfExists');

var _callIfExists2 = _interopRequireDefault(_callIfExists);

var _isDefined = require('../../../utils/isDefined');

var _isDefined2 = _interopRequireDefault(_isDefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var waitAndRun = function waitAndRun(fnc, waitTime) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return setTimeout(fnc.bind.apply(fnc, args), waitTime);
};

var MidiTrack = function (_React$Component) {
  (0, _inherits3.default)(MidiTrack, _React$Component);

  function MidiTrack(props) {
    (0, _classCallCheck3.default)(this, MidiTrack);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = {
      uniqueNotes: _src2.default.getUniqueFromMidiNotes((0, _isDefined2.default)(props.notes, [])),
      playingNotes: {}
    };
    _this.onTimerCall = _this.onTimerCall.bind(_this);
    _this.noteTimers = [];
    return _this;
  }

  MidiTrack.prototype.componentDidMount = function componentDidMount() {
    if (this.props.play) {
      this.playTrack();
    }
  };

  MidiTrack.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.play && !this.props.play) {
      this.playTrack();
    } else if (!nextProps.play && this.props.play) {
      this.stopPlayingTrack();
    }
  };

  MidiTrack.prototype.onTimerCall = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(note) {
      var _playingNotes, _playingNotes2;

      var noteName, instrumentName, durationInMS, key;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.props.play) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              noteName = note.noteName, instrumentName = note.instrumentName, durationInMS = note.durationInMS;
              key = (0, _MusicManager.generateNoteKey)(instrumentName, noteName);

              this.setState({
                playingNotes: (_playingNotes = {}, _playingNotes[key] = true, _playingNotes)
              });
              (0, _callIfExists2.default)(this.props.onNotePlayed, instrumentName, noteName);
              _context.next = 8;
              return (0, _MusicManager.delay)(durationInMS);

            case 8:
              this.setState({
                playingNotes: (_playingNotes2 = {}, _playingNotes2[key] = false, _playingNotes2)
              });
              (0, _callIfExists2.default)(this.props.onNoteStopPlaying, instrumentName, noteName);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function onTimerCall(_x) {
      return _ref.apply(this, arguments);
    }

    return onTimerCall;
  }();

  MidiTrack.prototype.playTrack = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var notes, i, currentNote, startTimeInMS, noteTimer;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              notes = this.props.notes;

              for (i = 0; i < notes.length; i += 1) {
                currentNote = notes[i];
                startTimeInMS = currentNote.startTimeInMS;
                noteTimer = waitAndRun(this.onTimerCall, startTimeInMS, this, currentNote);

                this.noteTimers.push(noteTimer);
              }

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function playTrack() {
      return _ref2.apply(this, arguments);
    }

    return playTrack;
  }();

  MidiTrack.prototype.stopPlayingTrack = function stopPlayingTrack() {
    for (var i = 0; i < this.noteTimers.length; i += 1) {
      clearTimeout(this.noteTimers[i]);
    }
  };

  MidiTrack.prototype.render = function render() {
    var _this2 = this;

    var notes = this.props.notes;
    var meta = this.props.meta;
    var trackIndex = this.props.trackIndex;
    var uniqueNotes = _src2.default.getUniqueFromMidiNotes(notes);
    var instrumentName = meta.instrumentNames[trackIndex];
    var notesElements = uniqueNotes.map(function (noteName, i) {
      return _react2.default.createElement(
        _Note2.default,
        {
          play: (0, _MusicManager.generateNoteKey)(instrumentName, noteName) in (0, _isDefined2.default)(_this2.state.playingNotes, {}),
          name: (0, _MusicManager.sharpToBemol)(noteName),
          instrumentName: instrumentName,
          key: i
        },
        (0, _callIfExists2.default)(_this2.props.renderNote, instrumentName, noteName)
      );
    });
    return _react2.default.createElement(
      'div',
      null,
      notesElements
    );
  };

  return MidiTrack;
}(_react2.default.Component);

exports.default = MidiTrack;


process.env.NODE_ENV !== "production" ? MidiTrack.propTypes = {
  notes: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    noteNumber: _react.PropTypes.number,
    noteName: _react.PropTypes.string,
    startTimeInMS: _react.PropTypes.number,
    durationInMS: _react.PropTypes.number,
    endTimeInMS: _react.PropTypes.number,
    instrumentName: _react.PropTypes.string,
    deltaTime: _react.PropTypes.number,
    msPerTick: _react.PropTypes.number
  }))
} : void 0;
module.exports = exports['default'];