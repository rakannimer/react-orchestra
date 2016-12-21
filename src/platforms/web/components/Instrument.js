import React from 'react';
import classnames from 'classnames';

import {
  instrumentAndNoteToLocalPath,
  loadInstrument,
  stopPlayingNote,
  playSound,
  getNoteBlob,
  playNote,
  loadSound,
} from '../MusicManager';

class Instrument extends React.Component {
  constructor(props) {
    super(props);
    this.onStartPlaying = this.onStartPlaying.bind(this);
    this.onStopPlaying = this.onStopPlaying.bind(this);
    this.onNoteLoaded = this.onNoteLoaded.bind(this);
    this.loadingNotesCounter = 0;
    this.state = {
      isLoaded: false,
    };
  }
  async componentDidMount() {
    // Testing
    const instrumentName = 'acoustic_grand_piano';
    this.playChord(instrumentName);
  }
  async onStartPlaying(noteName) {
    this.props.onStartPlaying ? this.props.onStartPlaying(noteName) : null;
  }
  async onStopPlaying(noteName) {
    this.props.onStopPlaying ? this.props.onStopPlaying(noteName) : null;
  }
  async onNoteLoaded(instrumentName, noteName) {
    this.loadingNotesCounter += 1;
    const noteCount = this.props.children.length;
    if (noteCount === this.loadingNotesCounter) {
      this.setState({ isLoaded: true });
      this.props.onInstrumentLoaded ? this.props.onInstrumentLoaded(noteName) : null;
    }
  }

  async playChord(instrumentName) {
    const noteName = 'C4';
    const noteName2 = 'E4';
    const noteName3 = 'G4';
    await playNote(instrumentName, noteName);
    await playNote(instrumentName, noteName2);
    await playNote(instrumentName, noteName3);
  }
  render() {
    const loader = this.state.isLoaded ?
      null :
      this.props.loader ? this.props.loader : <div><span>Loading  Instrument 🚚 🚚 🚚</span></div>;
    const isLoaded = this.state.isLoaded;

    return (
      <div
        style={this.props.style}
        className={
          classnames({'ro-instrument-loading':!this.state.isLoaded}, {'ro-instrument-loaded':this.state.isLoaded})
        }
      >
        { loader }
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child,
              {
                instrumentName: child.props.instrumentName || this.props.name,
                onStartPlaying: this.onStartPlaying,
                onStopPlaying: this.onStopPlaying,
                onNoteLoaded: this.onNoteLoaded,
                interactive: this.props.interactive || false,
              },
            ),
          )
        }
      </div>
    );
  }
}

Instrument.defaultProps = {
  name: 'acoustic_grand_piano',
};

export default Instrument;
