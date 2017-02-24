import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

import React, { PropTypes } from 'react';

import MidiTrack from './MidiTrack';
import { midiURLToMetaAndTracks } from '../MusicManager';

import isDefined from '../../../utils/isDefined';
import callIfExists from '../../../utils/callIfExists';

var parseMidi = function () {
  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(props) {
    var midiURL, metaAndTracks;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            midiURL = isDefined(props.midiURL, '');
            _context.next = 3;
            return midiURLToMetaAndTracks(midiURL);

          case 3:
            metaAndTracks = _context.sent;
            return _context.abrupt('return', metaAndTracks);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
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
  _inherits(Orchestra, _React$Component);

  function Orchestra(props) {
    _classCallCheck(this, Orchestra);

    var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this2.state = defaultState;
    _this2.onNotePlayed = _this2.onNotePlayed.bind(_this2);
    _this2.onNoteStopPlaying = _this2.onNoteStopPlaying.bind(_this2);
    return _this2;
  }

  Orchestra.prototype.componentDidMount = function () {
    var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2() {
      var newState;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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
    callIfExists(this.props.onNotePlayed, instrumentName, noteName);
  };

  Orchestra.prototype.onNoteStopPlaying = function onNoteStopPlaying(instrumentName, noteName) {
    callIfExists(this.props.onNoteStopPlaying, instrumentName, noteName);
  };

  Orchestra.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      'div',
      null,
      this.props.children,
      this.state.tracks.map(function (track, i) {
        return React.createElement(MidiTrack, {
          onNotePlayed: _this3.onNotePlayed,
          onNoteStopPlaying: _this3.onNoteStopPlaying,
          notes: track,
          meta: _this3.state.meta,
          trackIndex: i,
          key: i,
          renderNote: _this3.props.renderNote,
          play: _this3.props.selectedTracks.indexOf(i) > -1 && _this3.props.play
        });
      })
    );
  };

  return Orchestra;
}(React.Component);

process.env.NODE_ENV !== "production" ? Orchestra.propTypes = {
  midiURL: PropTypes.string,
  onMidiLoaded: PropTypes.func,
  onInstrumentsReady: PropTypes.func,
  play: PropTypes.bool,
  selectedTracks: PropTypes.arrayOf(PropTypes.number),
  onNotePlayed: PropTypes.func
} : void 0;
export default Orchestra;