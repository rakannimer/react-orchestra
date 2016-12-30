import React from 'react';
import Note from './Note';
// import NoteHelpers from '../utils/';
import { InstrumentHelpers } from '../InstrumentJS';

import callIfExists from '../utils/callIfExists';
import isDefined from '../utils/isDefined';

const createNotesFromScale =
  (noteName = 'C', scaleName = 'ionian', startOctave = 2, octaveCount = 1) =>
    InstrumentHelpers.getScaleNotes(noteName, scaleName, startOctave, octaveCount);

// createNote


class NoteFactory extends React.Component {
  constructor(props) {
    super(props);
  }
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
        break;
    }
    return (
      <div>
        {
          renderedNotes
        }
      </div>
    );
  }
}
export default NoteFactory;
