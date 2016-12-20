import React from 'react';
import { Instrument, Orchestra, Note } from '../../../src';

const delay = ms => new Promise(resolve => setTimeout(ms, resolve));

class StaticInstrumentExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playA: false,
      playC: false,
    };
  }
  componentDidMount() {
    this.playMelody();
  }
  async playMelody() {
    await delay(1000);
    this.setState({ playA: true });
    await delay(1000);
    this.setState({ playB: true, playA: false });
    await delay(1000);
    this.setState({ playB: false });
  }
  render() {
    return (
      <Instrument name={'acoustic_grand_piano'} interactive={false}>
        <Note name={'A3'} play={this.state.playA}>
          {/*
            You can put any react element here native or web.
          */}
          <div> This is what I want my note to look like ! I can put anything in here.
            <img
              alt="Some pic"
              src="https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg"
              width="80"
            />
          </div>
        </Note>
        <Note name={'C3'} play={this.state.playC}><div>Another note</div></Note>
      </Instrument>
    );
  }
}
export default StaticInstrumentExample;
