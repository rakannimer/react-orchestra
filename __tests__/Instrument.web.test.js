
import React from 'react';
import renderer from 'react-test-renderer';
import { Instrument } from '../src/';

test('Note renders correctly', async () => {
  // console.log(a);

  const component = renderer.create(
    <Instrument
      instrumentName={'acoustic_grand_piano'}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
