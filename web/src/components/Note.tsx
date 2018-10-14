import React from "react";
import classnames from "classnames";
import { stopPlayingNote, playNote, loadSound } from "../MusicManager";
import callIfExists from "../utils/callIfExists";
import isDefined from "../utils/isDefined";

type NoteProps = {
  play?: boolean;
  instrumentName?: string;
  name?: string;
  onNoteLoaded?: any;
  interactive?: boolean;
  fadeOutDuration?: number;
  loader?: any;
  className?: string;
  chidren?: any;
  gain?: number;
  onStopPlayingNote?: any;
  onStartPlayingNote?: any;
};

class Note extends React.Component<NoteProps> {
  static defaultProps = {
    play: false,
    instrumentName: "acoustic_grand_piano",
    name: "C3",
    onNoteLoaded: () => {},
    interactive: true,
    fadeOutDuration: 600,
    loader: <div />,
    className: "",
    children: <div />,
    gain: 1,
    onStopPlayingNote: () => {},
    onStartPlayingNote: () => {}
  };
  playingBuffers = [] as any[];
  state = {
    isPlaying: false,
    isLoading: true
  };
  async componentDidMount() {
    await this.loadSound();
  }
  async componentWillReceiveProps(nextProps: NoteProps) {
    if (
      nextProps.instrumentName !== this.props.instrumentName ||
      nextProps.name !== this.props.name
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
  onClickStart = () => {
    //@ts-ignore
    if (window.isTouchDevice) {
      return;
    }
    this.startPlayingNote();
  };
  loadSound = async () => {
    this.setState({ isLoading: true });
    try {
      await loadSound(
        this.props.instrumentName as string,
        this.props.name as string
      );
    } catch (err) {
      this.setState({ isLoading: false });
      return;
    }
    this.setState({ isLoading: false });
    callIfExists(
      this.props.onNoteLoaded,
      this.props.instrumentName,
      this.props.name
    );
  };
  startPlayingNote = async () => {
    // if (this.props.interactive === false) return;
    this.setState({ isPlaying: true });
    try {
      callIfExists(
        this.props.onStartPlayingNote,
        this.props.instrumentName,
        this.props.name
      );
      const buffer = await playNote(
        this.props.instrumentName as string,
        this.props.name as string,
        { gain: this.props.gain }
      );
      this.playingBuffers.push(buffer);
    } catch (err) {
      console.warn(
        "Something wrong happened with the audio api while playing note "
      );
    }
  };
  stopPlayingNote = async () => {
    if (this.playingBuffers && this.playingBuffers.length === 0) {
      return;
    }
    callIfExists(
      this.props.onStopPlayingNote,
      this.props.instrumentName,
      this.props.name
    );
    const buffer = this.playingBuffers.pop();
    const fadeOutDuration = this.props.fadeOutDuration
      ? this.props.fadeOutDuration
      : 700;
    await stopPlayingNote(buffer, fadeOutDuration);
    this.setState({ isPlaying: false });
  };
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
        className={`${isDefined(this.props.className, "")} ${classnames(
          {
            "ro-note-playing": this.state.isPlaying
          },
          {
            "ro-note-loading": this.state.isLoading
          }
        )}`}
      >
        {this.props.children || <div />}
      </div>
    );
  }
}

export default Note;
