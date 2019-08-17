import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import MidiIO from '../MidiIO/src/';
import Note from './Note';
import Instrument from './Instrument';

import {
  sharpToBemol,
  generateNoteKey,
  delay,
} from '../MusicManager';
import callIfExists from '../utils/callIfExists';
import isDefined from '../utils/isDefined';

const waitAndRun = (fnc, waitTime, ...args) => setTimeout(fnc.bind(...args), waitTime);

export default class MidiTrack extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uniqueNotes: MidiIO.getUniqueFromMidiNotes(isDefined(props.notes, [])),
      playingNotes: {},
    };
    this.onTimerCall = this.onTimerCall.bind(this);
    this.onInstrumentLoaded = this.onInstrumentLoaded.bind(this);
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
    const { noteName, instrumentName, durationInMS } = note;
    const noteInstrumentName = this.props.instrumentName || instrumentName;
    const key = generateNoteKey(noteInstrumentName, noteName);
    this.setState({
      playingNotes: {
        [key]: true,
      },
    });
    callIfExists(this.props.onNotePlayed, noteInstrumentName, noteName);
    const updatedPlayingNotes = Object.assign({}, this.state.playingNotes);
    delete updatedPlayingNotes[key];
    await delay(durationInMS);
    this.setState({ playingNotes: updatedPlayingNotes });
    callIfExists(this.props.onNoteStopPlaying, noteInstrumentName, noteName);
  }
  onInstrumentLoaded(instrument) {
    callIfExists(this.props.onInstrumentsReady, instrument);
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
    this.noteTimers = [];
  }
  renderNotes(uniqueNotes) {
    const notes = uniqueNotes.map((noteName, i) => {
      const meta = this.props.meta;
      const trackIndex = this.props.trackIndex;
      const instrumentName = this.props.instrumentName || meta.instrumentNames[trackIndex];
      return (<Note
        play={
        generateNoteKey(instrumentName, noteName) in isDefined(this.state.playingNotes, {})
      }
        name={sharpToBemol(noteName)}
        key={i}
        onStartPlayingNote={this.props.onNotePlayed}
        onStopPlayingNote={this.props.onNoteStopPlaying}
        delayPressOut={400}
      >
        {
          this.props.renderNote(instrumentName, sharpToBemol(noteName), i)
        }
      </Note>);
    });
    return notes;
  }
  render() {
    const notes = this.props.notes;
    const meta = this.props.meta;
    const trackIndex = this.props.trackIndex;
    const uniqueNotes = MidiIO.getUniqueFromMidiNotes(notes);
    const instrumentName = this.props.instrumentName || meta.instrumentNames[trackIndex];
    return (
      <Instrument
        name={instrumentName}
        onInstrumentLoaded={this.onInstrumentLoaded}
        style={this.props.instrumentStyle}
      >
        {
          this.renderNotes(uniqueNotes)
          // uniqueNotes.map((noteName, i) => (
          //   <Note
          //     play={
          //     generateNoteKey(instrumentName, noteName) in isDefined(this.state.playingNotes, {})
          //   }
          //     name={sharpToBemol(noteName)}
          //     key={i}
          //     onStartPlayingNote={this.props.onNotePlayed}
          //     onStopPlayingNote={this.props.onNoteStopPlaying}
          //   >
          //     {
          //       this.props.renderNote(instrumentName, sharpToBemol(noteName), i)
          //     }
          //   </Note>))
        }
      </Instrument>
    );
  }
}

MidiTrack.propTypes = {
  onNotePlayed: PropTypes.func,
  onNoteStopPlaying: PropTypes.func,
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
      style: View.propTypes.style,
    },
  )),
};
