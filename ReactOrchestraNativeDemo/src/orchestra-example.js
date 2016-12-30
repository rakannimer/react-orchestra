import React from 'react';
import { ScrollView, View, Text,
  // StyleSheet,
  TouchableHighlight } from 'react-native';

import { Orchestra } from 'react-orchestra/native';

const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
// const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/single-track-test-tempo-10.mid'
// const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/Beethoven+Fur+Elise+Easy+t30.mid';
class OrchestraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      playingNotes: {
        inexistingNoteName: true,
      },
      instrumentLoaded: false,
    };
    this.onMidiLoaded = this.onMidiLoaded.bind(this);
    this.onInstrumentsReady = this.onInstrumentsReady.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
    this.renderNote = this.renderNote.bind(this);
    this.onNotePlayed = this.onNotePlayed.bind(this);
    this.onNoteStopPlaying = this.onNoteStopPlaying.bind(this);
  }
  //eslint-disable-next-line
  componentDidMount() {
  }
  //eslint-disable-next-line
  onMidiLoaded(parsedMidi) {
    console.warn(`Midi loaded ${JSON.stringify(parsedMidi, 2, 2)}. Loading instruments now ...`);
    return parsedMidi;
  }
  onInstrumentsReady(instruments) {
    this.setState({
      // play: true,
      instrumentLoaded: true
    });
    return instruments;
  }
  //eslint-disable-next-line
  onNotePlayed(instrumentName, noteName) {
    if (!this.state.instrumentLoaded) return;
    this.setState(
      {
        playingNotes: {
          [instrumentName + noteName]: true,
        },
      },
    );
    // console.warn(`Note ${noteName} was played, optionally handle this event`);
  }
  onNoteStopPlaying(instrumentName, noteName) {
    const updatedPlayingNotes = Object.assign({}, this.state.playingNotes);
    delete updatedPlayingNotes[instrumentName + noteName];
    this.setState({ playingNotes: updatedPlayingNotes });
    // console.warn(`Note ${noteName} stopped playing, optionally handle this event`);
  }
  togglePlayback() {
    // alert('togglePlayback');
    this.setState({ play: !this.state.play });
  }
  renderNote(instrumentName, noteName) {
    const isPlaying = (instrumentName + noteName) in this.state.playingNotes;
    const noteStyle = { backgroundColor: isPlaying ? 'blue' : 'red' };
    return (
      <View className="control">
        <Text style={noteStyle} className={`button ${(instrumentName + noteName) in this.state.playingNotes ? 'is-primary' : ''}`}>
          Note : {instrumentName} {noteName}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <ScrollView>
        <Orchestra
          midiURL={midiURL}
          onMidiLoaded={this.onMidiLoaded}
          onInstrumentsReady={this.onInstrumentsReady}
          play={this.state.play}
          selectedTracks={[0]}
          onNotePlayed={this.onNotePlayed}
          onNoteStopPlaying={this.onNoteStopPlaying}
          renderNote={this.renderNote}
        >
          <Text> This is an orchestra it can play complex melodies ! </Text>
        </Orchestra>
        <View className="control">
          <TouchableHighlight onPress={this.togglePlayback} className={`button ${this.state.playC ? 'is-primary' : ''}`}>
            <Text>Toggle playback</Text>
          </TouchableHighlight>
        </View>
        {/* <button onClick={this.togglePlayback}>Toggle playback</button> */}
      </ScrollView>
    );
  }
}

export default OrchestraExample;
