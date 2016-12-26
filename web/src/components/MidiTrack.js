import React, { PropTypes } from 'react';
import MidiIO from '../MidiIO/src/';
import Note from './Note';

import {
  sharpToBemol,
  generateNoteKey,
  delay,
} from '../MusicManager';
import callIfExists from '../utils/callIfExists';
import isDefined from '../utils/isDefined';

const waitAndRun = (fnc, waitTime, ...args) => setTimeout(fnc.bind(...args), waitTime);

export default class MidiTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueNotes: MidiIO.getUniqueFromMidiNotes(isDefined(props.notes, [])),
      playingNotes: {},
    };
    this.onTimerCall = this.onTimerCall.bind(this);
    this.noteTimers = [];
  }
  componentDidMount() {
    if (this.props.play) {
      this.playTrack();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.play && !this.props.play) {
      this.playTrack();
    } else if (!nextProps.play && this.props.play) {
      this.stopPlayingTrack();
    }
  }
  async onTimerCall(note) {
    if (!this.props.play) return;
    const { noteName, instrumentName, durationInMS } = note;
    const key = generateNoteKey(instrumentName, noteName);
    this.setState({
      playingNotes: {
        [key]: true,
      },
    });
    callIfExists(this.props.onNotePlayed, instrumentName, noteName);
    await delay(durationInMS);
    this.setState({
      playingNotes: {
        [key]: false,
      },
    });
    callIfExists(this.props.onNoteStopPlaying, instrumentName, noteName);
  }
  async playTrack() {
    const notes = this.props.notes;
    for (let i = 0; i < notes.length; i += 1) {
      const currentNote = notes[i];
      const { startTimeInMS } = currentNote;
      const noteTimer = waitAndRun(this.onTimerCall, startTimeInMS, this, currentNote);
      this.noteTimers.push(noteTimer);
    }
  }
  stopPlayingTrack() {
    for (let i = 0; i < this.noteTimers.length; i += 1) {
      clearTimeout(this.noteTimers[i]);
    }
  }
  render() {
    const notes = this.props.notes;
    const meta = this.props.meta;
    const trackIndex = this.props.trackIndex;
    const uniqueNotes = MidiIO.getUniqueFromMidiNotes(notes);
    const instrumentName = meta.instrumentNames[trackIndex];
    const notesElements = uniqueNotes.map((noteName, i) => (
      <Note
        play={
          generateNoteKey(instrumentName, noteName) in isDefined(this.state.playingNotes, {})
        }
        name={sharpToBemol(noteName)}
        instrumentName={instrumentName}
        key={i}
      >
        {
          callIfExists(this.props.renderNote, instrumentName, noteName)
        }
      </Note>
    ));
    return (
      <div>
        { notesElements }
      </div>
    );
  }
}

MidiTrack.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape(
    {
      noteNumber: PropTypes.number,
      noteName: PropTypes.string,
      startTimeInMS: PropTypes.number,
      durationInMS: PropTypes.number,
      endTimeInMS: PropTypes.number,
      instrumentName: PropTypes.string,
      deltaTime: PropTypes.number,
      msPerTick: PropTypes.number,
    },
  )),
};
