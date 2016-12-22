import React, { PropTypes } from 'react';

import MidiTrack from './MidiTrack';
import {
  midiURLToMetaAndTracks,
} from '../MusicManager';

import isDefined from '../../../utils/isDefined';

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
  }
  async componentDidMount() {
    const newState = await parseMidi(this.props);
    this.setState(newState);
  }
  render() {
    return (
      <div>
        orchestra
        {
          this.state.tracks.map((track, i) => (
            <MidiTrack
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
