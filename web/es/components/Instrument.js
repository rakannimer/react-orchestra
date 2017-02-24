import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import classnames from 'classnames';
// import {
//   loadInstrument,
//   stopPlayingNote,
//   playSound,
//   getNoteBlob,
//   playNote,
//   loadSound,
// } from '../MusicManager';
import callIfExists from '../utils/callIfExists';

var Instrument = function (_React$Component) {
  _inherits(Instrument, _React$Component);

  function Instrument(props) {
    _classCallCheck(this, Instrument);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

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
    var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(noteName) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              callIfExists(this.props.onStartPlaying, noteName);

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
    var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(noteName) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              callIfExists(this.props.onStopPlaying, noteName);

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
    var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(instrumentName, noteName) {
      var noteCount;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.loadingNotesCounter += 1;
              noteCount = this.props.children.length;

              if (noteCount === this.loadingNotesCounter) {
                this.setState({ isLoaded: true });
                callIfExists(this.props.onInstrumentLoaded, this.props.name, noteName);
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
    var loader = this.state.isLoaded ? null : this.props.loader ? this.props.loader : React.createElement(
      'div',
      null,
      React.createElement(
        'span',
        null,
        'Loading  Instrument \uD83D\uDE9A \uD83D\uDE9A \uD83D\uDE9A'
      )
    );
    return React.createElement(
      'div',
      {
        style: this.props.style,
        className: classnames({ 'ro-instrument-loading': !this.state.isLoaded }, { 'ro-instrument-loaded': this.state.isLoaded })
      },
      loader,
      React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, {
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
}(React.Component);

Instrument.defaultProps = {
  name: 'acoustic_grand_piano'
};

export default Instrument;