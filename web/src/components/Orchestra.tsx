import React from "react";
import MidiTrack from "./MidiTrack";
import { midiURLToMetaAndTracks } from "../MusicManager";
import isDefined from "../utils/isDefined";
import callIfExists from "../utils/callIfExists";

const parseMidi = async (props: { midiURL?: string }) => {
  const midiURL = isDefined(props.midiURL, "");
  const metaAndTracks = await midiURLToMetaAndTracks(midiURL);
  return metaAndTracks;
};
const defaultState = {
  meta: {},
  tracks: [],
  selectedTrackNumbers: []
};
type OrchestraProps = {
  midiURL?: string;
  onMidiLoaded?: (...args: any[]) => any;
  onInstrumentsReady?: (...args: any[]) => any;
  play?: boolean;
  selectedTracks?: number[];
  onNotePlayed?: (...args: any[]) => any;
  onNoteStopPlaying?: (...args: any[]) => any;
  renderNote?: (...args: any[]) => any;
};
type OrchestraState = {
  meta: any;
  tracks: any;
  selectedTrackNumbers: any[];
};
class Orchestra extends React.Component<OrchestraProps, OrchestraState> {
  state = defaultState;
  async componentDidMount() {
    const newState = await parseMidi(this.props);
    this.setState(newState);
  }
  onNotePlayed = (instrumentName: string, noteName: string) => {
    callIfExists(this.props.onNotePlayed, instrumentName, noteName);
  };
  onNoteStopPlaying = (instrumentName: string, noteName: string) => {
    callIfExists(this.props.onNoteStopPlaying, instrumentName, noteName);
  };
  render() {
    return (
      <div>
        {this.props.children}
        {this.state.tracks.map((track, i) => (
          <MidiTrack
            onNotePlayed={this.onNotePlayed}
            onNoteStopPlaying={this.onNoteStopPlaying}
            notes={track}
            meta={this.state.meta}
            trackIndex={i}
            key={i}
            renderNote={this.props.renderNote}
            play={
              this.props.selectedTracks &&
              this.props.selectedTracks.indexOf(i) > -1 &&
              this.props.play
            }
          />
        ))}
      </div>
    );
  }
}
export default Orchestra;
