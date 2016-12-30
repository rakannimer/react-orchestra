import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';

import { Instrument, Note } from 'react-orchestra/native';
import OrchestraExample from './orchestra-example';
import NoteFactoryExample from './note-factory-example';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const renderStaticInstrumentExample =
(state, playMelody, onInstrumentLoaded, onStartPlaying, onStopPlaying) => (
  <View>
    <Instrument name={'acoustic_grand_piano'} interactive={false} onInstrumentLoaded={onInstrumentLoaded} onStartPlaying={onStartPlaying} onStopPlaying={onStopPlaying}>
      <Note name={'A3'} play={state.playA}>
        {/*
          You can put any react element here native or web.
        */}
        <View className="control">
          <Text className={`button ${state.playA ? 'is-primary' : ''}`}>
            This is what I want my note to look like ! I can put anything in here.
          </Text>
        </View>
      </Note>
      <Note name={'C3'} play={state.playC}>
        <View className="control">
          <Text className={`button ${state.playC ? 'is-primary' : ''}`}>
            Another note
          </Text>
        </View>
      </Note>
    </Instrument>
    <View className="control">
      <TouchableHighlight onClick={playMelody}>
        <Text>Play Melody</Text>
      </TouchableHighlight>
    </View>
  </View>
);

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playMelody = this.playMelody.bind(this);
    this.onInstrumentLoaded = this.onInstrumentLoaded.bind(this);
  }
  async onInstrumentLoaded() {
    await this.playMelody();
  }
  async playMelody() {
    this.setState({ playA: true });
    await delay(1000);
    this.setState({ playC: true, playA: false });
    await delay(1000);
    this.setState({ playC: false });
  }
  render() {
    const instrumentName = 'acoustic_grand_piano';
    const noteName = 'C3';
    return (
      <ScrollView>
        <Note name={noteName} instrumentName={instrumentName}>
          <View>
            <Text> C3 </Text>
          </View>
        </Note>
        <View>
          <Text>
            Separator Text
          </Text>
        </View>
        {
          renderStaticInstrumentExample(this.state, this.playMelody, this.onInstrumentLoaded)
        }
        <View>
          <Text style={{ fontWeight: 'bold' }}>
            Orchestra Example
          </Text>
        </View>
        <OrchestraExample />
        <View>
          <Text style={{ fontWeight: 'bold' }}>
            Note Factory Example
          </Text>
        </View>
        <NoteFactoryExample />

      </ScrollView>
    );
  }
}
export default Demo;
