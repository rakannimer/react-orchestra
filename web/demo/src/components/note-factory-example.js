import React from 'react';
import { NoteFactory } from '../../../src';

const renderNote = (instrumentName, noteName) => <div style={{ cursor: 'pointer' }}> I am a note : {instrumentName} {noteName} You can click me ! </div>;

class NoteFactoryExample extends React.Component {
  render() {
    return (
      <NoteFactory
        type="scale"
        scaleName="ionian"
        noteName="C"
        instrumentName="acoustic_grand_piano"
        startOctave="3"
        octaveCount="1"
        renderNote={renderNote}
      />
    );
  }
}
export default NoteFactoryExample;
