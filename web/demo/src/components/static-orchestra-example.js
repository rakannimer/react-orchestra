import React from 'react';
import { Orchestra } from '../../../src/';

const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
class StaticOrchestraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      playingNotes: {
        inexistingNoteName: true,
      },
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
    this.setState({ play: true });
    return instruments;
  }
  //eslint-disable-next-line
  onNotePlayed(instrumentName, noteName) {
    this.setState(
      {
        playingNotes: {
          [instrumentName + noteName]: true,
        },
      },
    );
    console.warn(`Note ${noteName} was played, optionally handle this event`);
  }
  onNoteStopPlaying(instrumentName, noteName) {
    const updatedPlayingNotes = Object.assign({}, this.state.playingNotes);
    delete updatedPlayingNotes[instrumentName + noteName];
    this.setState({ playingNotes: updatedPlayingNotes });
    console.warn(`Note ${noteName} stopped playing, optionally handle this event`);
  }
  togglePlayback() {
    this.setState({ play: !this.state.play });
  }
  renderNote(instrumentName, noteName) {
    return (
      <div className="control">
        <div className={`button ${(instrumentName + noteName) in this.state.playingNotes ? 'is-primary' : ''}`}>
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
          play={this.state.play}
          selectedTracks={[0]}
          onNotePlayed={this.onNotePlayed}
          onNoteStopPlaying={this.onNoteStopPlaying}
          renderNote={this.renderNote}
        >
          <div> This is an orchestra it can play complex melodies ! </div>
        </Orchestra>
        <div className="control">
          <button onClick={this.togglePlayback} className={`button ${this.state.playC ? 'is-primary' : ''}`}>
            Toggle playback
          </button>
        </div>
        {/* <button onClick={this.togglePlayback}>Toggle playback</button> */}
      </div>
    );
  }
}

export default StaticOrchestraExample;
