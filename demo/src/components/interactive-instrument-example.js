import React from 'react';
import { Instrument, Note } from '../../../src';;

class InteractiveInstrument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onStartPlaying.bind(this);
    this.onStopPlaying.bind(this);
  }
  onStartPlaying(noteName) {
    console.warn(`Note played ${noteName}. Use this function if you want to sync your state with the instrument, dispatch redux action or alter mobx observable or just setting state inside your component`);
  }
  onStopPlaying(noteName) {
    console.warn(`Stopped playing ${noteName}. Use this function if you want to sync your state with the instrument, dispatch redux action or alter mobx observable or just setting state inside your component`);
  }
  render() {
    return (
      <Instrument name={'acoustic_grand_piano'} onStartPlaying={this.onStartPlaying} onStopPlaying={this.onStopPlaying} interactive>
        <Note name={'A3'}>
          <div>
            <button>Click me to play A3</button>
          </div>
        </Note>
        <Note name={'C3'}><button>Click me to play C3</button></Note>
      </Instrument>
    );
  }
}
export default InteractiveInstrument;
