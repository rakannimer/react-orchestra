import React from 'react';
import classnames from 'classnames';
import {
  stopPlayingNote,
  playNote,
  loadSound,
} from '../MusicManager';
import callIfExists from '../utils/callIfExists';
import isDefined from '../utils/isDefined';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.playingBuffers = [];
    this.state = {
      isPlaying: false,
      isLoading: true,
    };
    this.startPlayingNote = this.startPlayingNote.bind(this);
    this.stopPlayingNote = this.stopPlayingNote.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
  }
  async componentDidMount() {
    await this.loadSound();
  }
  async componentWillReceiveProps(nextProps) {
    if (
      (nextProps.instrumentName !== this.props.instrumentName) ||
      (nextProps.name !== this.props.name)
    ) {
      await this.loadSound();
    }
    if (!this.props.play && nextProps.play) {
      await this.startPlayingNote();
      // console.log('Changed props to play, started playing note');
    }
    if (this.props.play && !nextProps.play) {
      await this.stopPlayingNote();
      // console.log('Changed props to stop playing');
    }
  }
  onClickStart() {
    if (window.isTouchDevice) {
      return;
    }
    this.startPlayingNote();
  }
  async loadSound() {
    this.setState({ isLoading: true });
    try {
      await loadSound(this.props.instrumentName, this.props.name);
    } catch (err) {
      this.setState({ isLoading: false });
      return;
    }
    this.setState({ isLoading: false });
    callIfExists(this.props.onNoteLoaded, this.props.instrumentName, this.props.name);
  }
  async startPlayingNote() {
    // if (this.props.interactive === false) return;
    this.setState({ isPlaying: true });
    try {
      callIfExists(this.props.onStartPlayingNote, this.props.instrumentName, this.props.name);
      const buffer = await playNote(
        this.props.instrumentName,
        this.props.name,
        { gain: this.props.gain },
      );
      this.playingBuffers.push(buffer);
    } catch (err) {
      console.warn('Something wrong happened with the audio api while playing note ');
    }
  }
  async stopPlayingNote() {
    if (this.playingBuffers && this.playingBuffers.length === 0) {
      return;
    }
    callIfExists(this.props.onStopPlayingNote, this.props.instrumentName, this.props.name);
    const buffer = this.playingBuffers.pop();
    const fadeOutDuration = this.props.fadeOutDuration ? this.props.fadeOutDuration : 700;
    await stopPlayingNote(buffer, fadeOutDuration);
    this.setState({ isPlaying: false });
  }
  render() {
    if (this.state.isLoading) {
      // console.log(isDefined(this.props.loader, '<div> Loading Note </div>'))
      return isDefined(this.props.loader, <div> Loading Note </div>);
    }
    return (
      <div
        onTouchStart={this.startPlayingNote}
        onTouchEnd={this.stopPlayingNote}
        onMouseDown={this.onClickStart}
        onMouseUp={this.stopPlayingNote}
        className={
          `${isDefined(this.props.className, '')} ${classnames({
            'ro-note-playing': this.state.isPlaying,
          }, {
            'ro-note-loading': this.state.isLoading,
          })}`
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
  play: false,
  instrumentName: 'acoustic_grand_piano',
  name: 'C3',
  onNoteLoaded: () => {},
  interactive: true,
  fadeOutDuration: 600,
  loader: <div />,
  className: '',
  children: <div />,
  gain: 1,
  onStopPlayingNote: () => {},
  onStartPlayingNote: () => {},
};
export default Note;
