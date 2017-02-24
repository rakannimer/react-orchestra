import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Note from './Note';
// import NoteHelpers from '../utils/';
import { InstrumentHelpers } from '../InstrumentJS/src/';

import callIfExists from '../utils/callIfExists';

var createNotesFromScale = function createNotesFromScale() {
  var noteName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'C';
  var scaleName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ionian';
  var startOctave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var octaveCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  return InstrumentHelpers.getScaleNotes(noteName, scaleName, startOctave, octaveCount);
};

// createNote


var NoteFactory = function (_React$Component) {
  _inherits(NoteFactory, _React$Component);

  function NoteFactory() {
    _classCallCheck(this, NoteFactory);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
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
      return React.createElement(
        Note,
        _extends({
          key: i,
          name: currentNoteName,
          instrumentName: instrumentName,
          startOctave: startOctave,
          octaveCount: octaveCount
        }, _this2.props.noteProps),
        callIfExists(_this2.props.renderNote, instrumentName, currentNoteName, i)
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
    return React.createElement(
      'div',
      null,
      renderedNotes
    );
  };

  return NoteFactory;
}(React.Component);

export default NoteFactory;