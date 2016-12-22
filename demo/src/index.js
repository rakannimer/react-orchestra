import React from 'react';
//eslint-disable-next-line
import { render } from 'react-dom';

import './index.css';
// import { Instrument, Orchestra, Note } from '../../src';
import StaticInstrumentExample from './components/static-instrument-example';
import InteractiveInstrumentExample from './components/interactive-instrument-example';
import StaticOrchestraExample from './components/static-orchestra-example';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Welcome to React instruments web</h2>
          <h3>A non-interactive instrument that can play notes and sync ui</h3>
          <div>
            <StaticInstrumentExample />
          </div>
          <h3>
            An interactive instrument that can listens to touch and tap events, plays and syncs ui
          </h3>
          <div>
            <InteractiveInstrumentExample />
          </div>
          <h3>
            An orchestra that plays a midi file and syncs ui
          </h3>
          <div>
            <StaticOrchestraExample />
          </div>
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
