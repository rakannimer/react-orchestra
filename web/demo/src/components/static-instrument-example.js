import React from 'react';
import { Instrument, Note } from '../../../lib/';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class StaticInstrumentExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playA: false,
      playC: false,
    };
    this.playMelody = this.playMelody.bind(this);
    this.onInstrumentLoaded = this.onInstrumentLoaded.bind(this);
  }
  async onInstrumentLoaded() {
    await this.playMelody();
  }
  async playMelody() {
    await delay(1000);
    this.setState({ playA: true });
    await delay(1000);
    this.setState({ playC: true, playA: false });
    await delay(1000);
    this.setState({ playC: false });
  }
  render() {
    return (
      <div>
        <Instrument name={'acoustic_grand_piano'} interactive={false} onInstrumentLoaded={this.onInstrumentLoaded}>
          <Note name={'A3'} play={this.state.playA}>
            {/*
              You can put any react element here native or web.
            */}
            <div className="control">
              <a className={`button ${this.state.playA ? 'is-primary' : ''}`}>
                This is what I want my note to look like ! I can put anything in here.
                <img
                  alt="Some pic"
                  src="https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg"
                  width="30"
                />
              </a>
            </div>
          </Note>
          <Note name={'C3'} play={this.state.playC}>
            <div className="control">
              <div className={`button ${this.state.playC ? 'is-primary' : ''}`}>
                Another note
              </div>
            </div>
          </Note>
        </Instrument>
        <div className="control">
          <button className="button" onClick={this.playMelody}>
            Play Melody
          </button>
        </div>
      </div>
    );
  }
}
export default StaticInstrumentExample;
