import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, text, boolean, object, array } from '@kadira/storybook-addon-knobs';

import Button from './Button';
import Welcome from './Welcome';
import { Orchestra, Instrument, Note } from '../src/platforms/web/';
import StaticOrchestraExample from '../demo/src/components/static-orchestra-example';
import 'bulma/css/bulma.css';

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
  const noteName = text('name', 'A3');
  const instrumentName = text('instrumentName', 'acoustic_grand_piano');
  const playA = boolean('play A', false);
  const playC = boolean('play C', false);
  return (
    <Instrument name={instrumentName} onStartPlaying={() => {}} onStopPlaying={() => {}}>
      <Note name={noteName} className={'my-note-class'} play={playA}>
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

stories.add('Orchestra from Midi track', () => (
  <StaticOrchestraExample />
  ));
