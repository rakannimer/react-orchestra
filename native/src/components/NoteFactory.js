import React from 'react';
import { View } from 'react-native';

import Note from './Note';
// import NoteHelpers from '../utils/';
import { InstrumentHelpers } from '../InstrumentJS/src/';

import callIfExists from '../utils/callIfExists';

const createNotesFromScale =
  (noteName = 'C', scaleName = 'ionian', startOctave = 2, octaveCount = 1) =>
    InstrumentHelpers.getScaleNotes(noteName, scaleName, startOctave, octaveCount);

// createNote


class NoteFactory extends React.Component {
  renderNotesFromScale() {
    const { noteName, scaleName, instrumentName, startOctave, octaveCount } = this.props;
    const notes = createNotesFromScale(noteName, scaleName, startOctave, octaveCount);
    const notesElements = notes.map((currentNoteName, i) => (
      <Note
        key={i}
        name={currentNoteName}
        instrumentName={instrumentName}
        startOctave={startOctave}
        octaveCount={octaveCount}
        {...this.props.noteProps}
      >
        {
          callIfExists(this.props.renderNote, instrumentName, currentNoteName)
        }
      </Note>
    ));
    return notesElements;
  }

  render() {

    let renderedNotes;
    switch (this.props.type) {
      case 'scale':
        renderedNotes = this.renderNotesFromScale();
        break;
      default:
        renderedNotes = null;
        break;
    }
    return (
      <View>
        {
          renderedNotes
        }
      </View>
    );
  }
}
export default NoteFactory;
