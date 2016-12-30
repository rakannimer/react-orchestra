import React from 'react';
import { View } from 'react-native';
import { NoteFactory } from 'react-orchestra/native';

const renderNote = (instrumentName, noteName) => <View style={{ backgroundColor: 'papayawhip' }}> I am a note : {instrumentName} {noteName} You can click me ! </View>;

class NoteFactoryExample extends React.Component {
  render() {
    console.warn(JSON.stringify(Object.keys(NoteFactory), 2, 2));
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
