import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs';

import Button from './Button';
import Welcome from './Welcome';
import { Instrument, Note } from '../src/platforms/web/';

const stories = storiesOf('React Orchestra', module);
stories.addDecorator(withKnobs);
stories.add('Note', () => {
  const name = text('name', 'A3');
  const instrumentName = text('instrumentName', 'acoustic_grand_piano');
  const content = `Note ${instrumentName} ${name}`;
  return (<Note name={name} instrumentName={instrumentName}>
    <Button>
      {content}
    </Button>
  </Note>);
});

stories.add('Instrument with notes', () => {
  const name = text('name', 'A3');
  const instrumentName = text('instrumentName', 'acoustic_grand_piano');
  const content = `Note ${instrumentName} ${name}`;
  const playA = boolean('play A', false);
  const playC = boolean('play C', false);
  return (
    <Instrument name={'acoustic_grand_piano'} onStartPlaying={() => {}} onStopPlaying={() => {}}>
      <Note name={'A3'} className={'animated bounce'} play={playA}>
        <p className="control">
          <div className={`button ${playA ? 'is-primary' : ''}`}>
            Click me to play A3
          </div>
        </p>
      </Note>
      <Note name={'C3'} play={playC}>
        <div className="control">
          <button className={`button ${playC ? 'is-primary' : ''}`}>
            Click me to play C3
          </button>
        </div>
      </Note>
    </Instrument>
  );
});
