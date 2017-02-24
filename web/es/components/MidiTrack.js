import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import MidiIO from '../MidiIO/src/';
import Note from './Note';

import { sharpToBemol, generateNoteKey, delay } from '../MusicManager';
import callIfExists from '../utils/callIfExists';
import isDefined from '../utils/isDefined';

var waitAndRun = function waitAndRun(fnc, waitTime) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return setTimeout(fnc.bind.apply(fnc, args), waitTime);
};

var MidiTrack = function (_React$Component) {
  _inherits(MidiTrack, _React$Component);

  function MidiTrack(props) {
    _classCallCheck(this, MidiTrack);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      uniqueNotes: MidiIO.getUniqueFromMidiNotes(isDefined(props.notes, [])),
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
    var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(note) {
      var _playingNotes;

      var noteName, instrumentName, durationInMS, key, updatedPlayingNotes;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // if (!this.props.play) return;
              noteName = note.noteName, instrumentName = note.instrumentName, durationInMS = note.durationInMS;
              key = generateNoteKey(instrumentName, noteName);

              this.setState({
                playingNotes: (_playingNotes = {}, _playingNotes[key] = true, _playingNotes)
              });
              callIfExists(this.props.onNotePlayed, instrumentName, noteName);
              updatedPlayingNotes = _Object$assign({}, this.state.playingNotes);

              delete updatedPlayingNotes[key];
              _context.next = 8;
              return delay(durationInMS);

            case 8:
              this.setState({ playingNotes: updatedPlayingNotes });
              callIfExists(this.props.onNoteStopPlaying, instrumentName, noteName);

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
    var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2() {
      var notes, i, currentNote, startTimeInMS, noteTimer;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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
    var uniqueNotes = MidiIO.getUniqueFromMidiNotes(notes);
    var instrumentName = meta.instrumentNames[trackIndex];
    var notesElements = uniqueNotes.map(function (noteName, i) {
      return React.createElement(
        Note,
        {
          play: generateNoteKey(instrumentName, noteName) in isDefined(_this2.state.playingNotes, {}),
          name: sharpToBemol(noteName),
          instrumentName: instrumentName,
          key: i
        },
        callIfExists(_this2.props.renderNote, instrumentName, noteName, i)
      );
    });
    return React.createElement(
      'div',
      null,
      notesElements
    );
  };

  return MidiTrack;
}(React.Component);

export { MidiTrack as default };


process.env.NODE_ENV !== "production" ? MidiTrack.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    noteNumber: PropTypes.number,
    noteName: PropTypes.string,
    startTimeInMS: PropTypes.number,
    durationInMS: PropTypes.number,
    endTimeInMS: PropTypes.number,
    instrumentName: PropTypes.string,
    deltaTime: PropTypes.number,
    msPerTick: PropTypes.number
  }))
} : void 0;