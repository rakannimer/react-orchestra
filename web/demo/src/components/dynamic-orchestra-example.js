import React from 'react';
import { Orchestra } from '../../../src/';

const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
class StaticOrchestraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playSong: true,
    };
    this.onMidiLoaded = this.onMidiLoaded.bind(this);
    this.onInstrumentsReady = this.onInstrumentsReady.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
  }
  componentDidMount() {
  }
  //eslint-disable-next-line
  onMidiLoaded(parsedMidi) {
    console.warn(`Midi loaded ${JSON.stringify(parsedMidi, 2, 2)}. Loading instruments now ...`);
    return parsedMidi;
  }
  onInstrumentsReady(instruments) {
    this.setState({ play: true });
    return instruments;
  }
  //eslint-disable-next-line
  onNotePlayed(noteName) {
    console.warn(`Note ${noteName} was played, optionally handle this event`);
  }
  togglePlayback() {
    this.setState({ play: !this.state.play });
  }
  renderNote(instrumentName, noteName) {
    return (
      <div className="control">
        <div className={`button ${this.state.playC ? 'is-primary' : ''}`}>
          Note : {instrumentName} {noteName}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Orchestra
          midiURL={midiURL}
          onMidiLoaded={this.onMidiLoaded}
          onInstrumentsReady={this.onInstrumentsReady}
          play={this.state.playSong}
          selectedTracks={[0]}
          onNotePlayed={this.onNotePlayed}
          renderNote={this.renderNote}
        >
          <div> This is an orchestra it can play complex melodies ! </div>
        </Orchestra>
        <button onClick={this.togglePlayback}>Toggle playback</button>
      </div>
    );
  }
}

export default StaticOrchestraExample;
