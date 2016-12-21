import React from 'react'
import {render} from 'react-dom'
import './index.css';

import { Instrument, Orchestra, Note } from '../../src'
import StaticInstrumentExample from './components/static-instrument-example';
import InteractiveInstrumentExample from './components/interactive-instrument-example';

let Demo = React.createClass({
  render() {
    return (
      <div>
        <div>
          <h2>Welcome to React instruments web</h2>
          <h3>A non-interactive instrument that can play notes and sync ui</h3>
          <div>
            <StaticInstrumentExample />
          </div>
          <h3>An interactive instrument that can listens to touch and tap events, plays and syncs ui</h3>
          <div>
            <InteractiveInstrumentExample />
          </div>
        </div>
      </div>
    );
  }
})

render(<Demo/>, document.querySelector('#demo'))
