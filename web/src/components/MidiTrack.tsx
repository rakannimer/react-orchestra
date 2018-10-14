import React from "react";
import MidiIO from "../midi-io/";
import Note from "./Note";
import { sharpToBemol, generateNoteKey, delay } from "../MusicManager";
import callIfExists from "../utils/callIfExists";
import isDefined from "../utils/isDefined";
import { NoteType } from "../types";
const waitAndRun: any = (fnc: any, waitTime: number, ...args: any[]) =>
  setTimeout(fnc.bind(...args), waitTime);

type MidiTrackProps = {
  meta?: any;
  trackIndex: number;
  play?: boolean;
  onNotePlayed?: any;
  onNoteStopPlaying?: any;
  renderNote?: (...args: any[]) => any;

  notes?: Array<{
    noteNumber?: number;
    noteName?: string;
    startTimeInMS?: number;
    durationInMS?: number;
    endTimeInMS?: number;
    instrumentName?: string;
    deltaTime?: number;
    msPerTick?: number;
  }>;
};
type MidiTrackState = {
  playingNotes: { [x: string]: boolean };
  uniqueNotes: any;
};
export default class MidiTrack extends React.Component<
  MidiTrackProps,
  MidiTrackState
> {
  noteTimers = [] as number[];
  constructor(props: MidiTrackProps) {
    super(props);
    this.state = {
      uniqueNotes: MidiIO.getUniqueFromMidiNotes(isDefined(props.notes, [])),
      playingNotes: {}
    };
  }
  componentDidMount() {
    if (this.props.play) {
      this.playTrack();
    }
  }
  componentWillReceiveProps(nextProps: MidiTrackProps) {
    if (nextProps.play && !this.props.play) {
      this.playTrack();
    } else if (!nextProps.play && this.props.play) {
      this.stopPlayingTrack();
    }
  }
  onTimerCall = async (note: NoteType) => {
    // if (!this.props.play) return;
    const { noteName, instrumentName, durationInMS } = note;
    const key = generateNoteKey(instrumentName, noteName);
    this.setState({
      playingNotes: {
        [key]: true
      }
    });
    callIfExists(this.props.onNotePlayed, instrumentName, noteName);
    const updatedPlayingNotes = Object.assign({}, this.state.playingNotes);
    delete updatedPlayingNotes[key];
    await delay(durationInMS);
    this.setState({ playingNotes: updatedPlayingNotes });
    callIfExists(this.props.onNoteStopPlaying, instrumentName, noteName);
  };
  async playTrack() {
    if (!Array.isArray(this.props.notes)) return;
    const notes = this.props.notes;
    for (let i = 0; i < notes.length; i += 1) {
      const currentNote = notes[i];
      const { startTimeInMS } = currentNote;
      const noteTimer = waitAndRun(
        this.onTimerCall,
        startTimeInMS,
        this,
        currentNote
      );
      this.noteTimers.push(noteTimer);
    }
  }
  stopPlayingTrack() {
    for (let i = 0; i < this.noteTimers.length; i += 1) {
      clearTimeout(this.noteTimers[i]);
    }
  }
  render() {
    const notes = Array.isArray(this.props.notes) ? this.props.notes : [];
    const meta = this.props.meta;
    const trackIndex = this.props.trackIndex;
    const uniqueNotes = MidiIO.getUniqueFromMidiNotes(notes as NoteType[]);
    const instrumentName = meta.instrumentNames[trackIndex];
    const notesElements = uniqueNotes.map((noteName, i) => (
      <Note
        play={
          generateNoteKey(instrumentName, noteName) in
          isDefined(this.state.playingNotes, {})
        }
        name={sharpToBemol(noteName)}
        instrumentName={instrumentName}
        key={i}
      >
        {callIfExists(this.props.renderNote, instrumentName, noteName, i)}
      </Note>
    ));
    return <div>{notesElements}</div>;
  }
}
