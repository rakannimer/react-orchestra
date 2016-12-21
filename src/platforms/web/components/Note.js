import React from 'react';
import classnames from 'classnames';
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
    this.onClickStart = this.onClickStart.bind(this);
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
    // if (this.props.interactive === false) return;
    this.setState({ isPlaying: true });
    try {
      const buffer = await playNote(this.props.instrumentName, this.props.name);
      this.playingBuffers.push(buffer);
    } catch (err) {
      console.warn('Something wrong happened with the audio api while playing note ');
    }

  }
  async stopPlayingNote() {
    if (this.playingBuffers && this.playingBuffers.length === 0) {
      return;
    }
    const buffer = this.playingBuffers.pop();
    const fadeOutDuration = this.props.fadeOutDuration ? this.props.fadeOutDuration : 700;
    await stopPlayingNote(buffer, fadeOutDuration);
    this.setState({ isPlaying: false });

  }
  async componentWillReceiveProps(nextProps) {
    if (!this.props.play && nextProps.play) {
      await this.startPlayingNote();
      console.log("Changed props to play, started playing note");
    }
    if (this.props.play && !nextProps.play) {
      await this.stopPlayingNote();
      console.log("Changed props to stop playing");
    }
  }
  onClickStart() {
    if (!window.isTouchDevice) {
      this.startPlayingNote();
    }
  }
  render() {
    return (
      <div
        onTouchStart={this.startPlayingNote}
        onTouchEnd={this.stopPlayingNote}
        onMouseDown={this.onClickStart}
        onMouseUp={this.stopPlayingNote}
        className={
          classnames({
            'ro-note-playing':this.state.isPlaying,
          }, {
            'ro-note-loading': this.state.isLoading
          })
        }
      >
        {
          this.props.children || <div />
        }
      </div>
    );
  }
}
Note.defaultProps = {
  play: false
}
export default Note;
