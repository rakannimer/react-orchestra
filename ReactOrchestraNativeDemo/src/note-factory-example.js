import React from 'react';
import { View, Text } from 'react-native';
import { NoteFactory } from 'react-orchestra/native';

const renderNote = (instrumentName, noteName) =>{
  // console.warn('rendering '+instrumentName, noteName);
  return (<View><Text> I am a note : {instrumentName} {noteName} You can click me ! </Text></View>);
}
class NoteFactoryExample extends React.Component {
  render() {
    // console.warn(JSON.stringify(Object.keys(a), 2, 2));
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
