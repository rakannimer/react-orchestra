import React from 'react';
import { Instrument, Orchestra, Note } from '../../../src';


class StaticInstrumentExample extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
      return (
        <div>
          <div>Static Instrument</div>
          <div>
            <Instrument />
            <Orchestra />
            <Note />
          </div>
        </div>
      );
  }
};
export default StaticInstrumentExample;
