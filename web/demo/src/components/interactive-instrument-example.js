import React from 'react';
import { Instrument, Note } from '../../../src';

class InteractiveInstrument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onStartPlaying.bind(this);
    this.onStopPlaying.bind(this);
  }
  // eslint-disable-next-line class-methods-use-this
  onStartPlaying(noteName) {
    console.warn(`Note played ${noteName}. Use this function if you want to sync your state with the instrument, dispatch redux action or alter mobx observable or just setting state inside your component`);
  }
  // eslint-disable-next-line class-methods-use-this
  onStopPlaying(noteName) {
    console.warn(`Stopped playing ${noteName}. Use this function if you want to sync your state with the instrument, dispatch redux action or alter mobx observable or just setting state inside your component`);
  }
  render() {
    return (
      <Instrument name={'acoustic_grand_piano'} onStartPlaying={this.onStartPlaying} onStopPlaying={this.onStopPlaying} interactive>
        <Note name={'A3'} className={'animated bounce'}>
          <div className="control">
            <div className={`button ${this.state.playA ? 'is-primary' : ''}`}>
              Click me to play A3
            </div>
          </div>
        </Note>
        <Note name={'C3'}>
          <div className="control">
            <button className={`button ${this.state.playC ? 'is-primary' : ''}`}>
              Click me to play C3
            </button>
          </div>
        </Note>
      </Instrument>
    );
  }
}
export default InteractiveInstrument;
