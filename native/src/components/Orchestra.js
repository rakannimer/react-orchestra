import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

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
  isLoading: true,
};

class Orchestra extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onNotePlayed = this.onNotePlayed.bind(this);
    this.onNoteStopPlaying = this.onNoteStopPlaying.bind(this);
    this.onInstrumentsReady = this.onInstrumentsReady.bind(this);
  }
  async componentDidMount() {
    const newState = await parseMidi(this.props);
    this.setState({ ...newState, isLoading: false });
  }
  onNotePlayed(instrumentName, noteName) {
    callIfExists(this.props.onNotePlayed, instrumentName, noteName);
  }
  onNoteStopPlaying(instrumentName, noteName) {
    callIfExists(this.props.onNoteStopPlaying, instrumentName, noteName);
  }
  onInstrumentsReady(instruments) {
    callIfExists(this.props.onInstrumentsReady, instruments);
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>
            Loading orchestra 🚚 🚚 🚚
          </Text>
        </View>
      );
    }
    return (
      <View>
        { this.props.children }
        {
          this.state.tracks
          .filter((track, i) => this.props.selectedTracks.indexOf(i) !== -1)
          .map((track, i) => (
            <MidiTrack
              onNotePlayed={this.props.onNotePlayed}
              onNoteStopPlaying={this.props.onNoteStopPlaying}
              notes={track}
              meta={this.state.meta}
              trackIndex={i}
              key={i}
              renderNote={this.props.renderNote}
              play={this.props.play}
              onInstrumentsReady={this.onInstrumentsReady}
              instrumentStyle={this.props.instrumentStyle}
              instrumentName={this.props.instrumentName || null}
            />
          ))
        }
      </View>
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
  onNoteStopPlaying: PropTypes.func,
};
export default Orchestra;
