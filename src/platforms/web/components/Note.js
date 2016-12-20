import React from 'react';

import {
  stopPlayingNote,
  playNote,
  loadSound,
} from '../MusicManager';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.playingBuffers = [];
    this.state = {
      isPlaying: false,
      isLoaded: true,
    };
    this.startPlayingNote = this.startPlayingNote.bind(this);
    this.stopPlayingNote = this.stopPlayingNote.bind(this);
  }
  async componentDidMount() {
    this.setState({ isLoaded: false });
    try {
      await loadSound(this.props.instrumentName, this.props.name);
    } catch (err) {
      return;
    }
    this.setState({ isLoaded: true });
    //eslint-disable-next-line
    this.props.onNoteLoaded ? this.props.onNoteLoaded(this.props.instrumentName, this.props.name) : null;
  }
  async startPlayingNote() {
    this.setState({ isPlaying: true });
    try {
      const buffer = await playNote(this.props.instrumentName, this.props.name);
      this.playingBuffers.push(buffer);
    } catch (err) {
      console.warn('Something wrong happened with the audio api while playing note ');
    }

  }
  async stopPlayingNote(instrumentName, noteName) {
    const fadeOutDuration = this.props.fadeOutDuration ? this.props.fadeOutDuration : 500;
    await delay(fadeOutDuration);
    try {
      await stopPlayingNote(instrumentName, noteName);
    } catch (err) {
      console.warn('Something wrong happened with the audio api while stop playing note ');
    }
    this.setState({ isPlaying: false });
    if (this.playingBuffers && this.playingBuffers.length === 0) {
      return;
    }
    const buffer = this.playingBuffers.pop();
    buffer.stop();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.play && nextProps.play) {
      console.log("Changed props to play");
    }
    if (this.props.play && !nextProps.play) {
      console.log("Changed props to stop playing");
    }
  }
  render() {
    return (
      <div onMouseDown={this.startPlayingNote} onMouseUp={this.stopPlayingNote}>
        {
          this.props.children || <div />
        }
      </div>
    );
  }
}
export default Note;
