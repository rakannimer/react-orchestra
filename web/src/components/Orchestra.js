import React, { PropTypes } from 'react';

import MidiTrack from './MidiTrack';
import {
  midiURLToMetaAndTracks,
} from '../MusicManager';

import isDefined from '../utils/isDefined';
import callIfExists from '../utils/callIfExists';

const parseMidi = async (props) => {
  const midiURL = isDefined(props.midiURL, '');
  const metaAndTracks = await midiURLToMetaAndTracks(midiURL);
  return metaAndTracks;
};

const defaultState = {
  meta: {},
  tracks: [],
  selectedTrackNumbers: [],
};

class Orchestra extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onNotePlayed = this.onNotePlayed.bind(this);
    this.onNoteStopPlaying = this.onNoteStopPlaying.bind(this);
  }
  async componentDidMount() {
    const newState = await parseMidi(this.props);
    this.setState(newState);
  }
  onNotePlayed(instrumentName, noteName) {
    callIfExists(this.props.onNotePlayed, instrumentName, noteName);
  }
  onNoteStopPlaying(instrumentName, noteName) {
    callIfExists(this.props.onNoteStopPlaying, instrumentName, noteName);
  }
  render() {
    return (
      <div>
        { this.props.children }
        {
          this.state.tracks.map((track, i) => (
            <MidiTrack
              onNotePlayed={this.onNotePlayed}
              onNoteStopPlaying={this.onNoteStopPlaying}
              notes={track}
              meta={this.state.meta}
              trackIndex={i}
              key={i}
              renderNote={this.props.renderNote}
              play={this.props.selectedTracks.indexOf(i) > -1 && this.props.play}
            />
          ))
        }
      </div>
    );
  }
}
Orchestra.propTypes = {
  midiURL: PropTypes.string,
  onMidiLoaded: PropTypes.func,
  onInstrumentsReady: PropTypes.func,
  play: PropTypes.bool,
  selectedTracks: PropTypes.arrayOf(PropTypes.number),
  onNotePlayed: PropTypes.func,
};
export default Orchestra;
