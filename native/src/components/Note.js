import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import classnames from 'classnames';
import {
  stopPlayingNote,
  playNote,
  loadSound,
} from '../MusicManager';

import isDefined from '../utils/isDefined';

class Note extends React.PureComponent {
  constructor(props) {
    super(props);
    this.playingBuffers = [];
    this.sound = {};
    this.state = {
      isPlaying: false,
      isLoading: true,
    };
    this.startPlayingNote = this.startPlayingNote.bind(this);
    this.stopPlayingNote = this.stopPlayingNote.bind(this);
  }
  async componentDidMount() {
    this.sound = await this.loadSound();
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
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // TODO: split into consts
    // return true;
    const isLoading = this.state.isLoading || nextState.isLoading;
    const isPlaying = this.state.isPlaying !== nextState.isPlaying;
    const isPlayingControlled = this.props.play !== nextProps.play;
    const shouldUpdate = isLoading || isPlaying || isPlayingControlled; // this.state.isLoading || (nextProps.name !== this.props.name) || (nextProps.instrumentName !== this.props.instrumentName) || (nextState.isPlaying !== this.state.isPlaying) || (nextProps.play !== this.props.play) || this.state.isPlaying || this.state.isPlaying !== nextState.isPlaying;
    return shouldUpdate;
  }
  componentWillUnmount() {
    this.sound.release();
  }
  async loadSound() {
    this.setState({ isLoading: true });
    try {
      this.sound = await loadSound(this.props.instrumentName, this.props.name);
    } catch (err) {
      this.setState({ isLoading: false });
      console.warn(JSON.stringify(err.message, 2, 2));
      return null;
    }
    this.setState({ isLoading: false });
    this.props.onNoteLoaded(this.props.instrumentName, this.props.name);
    return this.sound;
  }
  async startPlayingNote() {
    this.setState({ isPlaying: true });
    try {
      // Need to create a new sound each time to avoid audio glitch on IOS when playing fast
      this.props.onStartPlayingNote(this.props.instrumentName, this.props.name);
      this.sound = await loadSound(this.props.instrumentName, this.props.name);
      const buffer = await playNote(this.sound);
      return buffer;
    } catch (err) {
      console.warn('Something wrong happened with the audio api while playing note ');
      return {};
    }
  }
  async stopPlayingNote() {
    await stopPlayingNote(this.sound, this.props.delayPressOut);
    this.props.onStopPlayingNote(this.props.instrumentName, this.props.name);
    this.setState({ isPlaying: false });
  }
  render() {
    if (this.state.isLoading) {
      return isDefined(this.props.loader, <View><Text> Loading Note </Text></View>);
    }
    return (
      <TouchableWithoutFeedback
        onPressIn={this.startPlayingNote}
        onPressOut={this.stopPlayingNote}
        delayPressOut={this.props.delayPressOut}
        className={
          `${isDefined(this.props.className, '')} ${classnames({
            'ro-note-playing': this.state.isPlaying,
          }, {
            'ro-note-loading': this.state.isLoading,
          })}`
        }
      >
        {
          <View>{this.props.children}</View> || <View />
        }
      </TouchableWithoutFeedback>
    );
  }
}

Note.defaultProps = {
  play: false,
  onStartPlayingNote: () => {},
  onStopPlayingNote: () => {},
  onNoteLoaded: () => {},
  delayPressOut: 1500,
};
export default Note;
