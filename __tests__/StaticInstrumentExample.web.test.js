
import React from 'react';
import renderer from 'react-test-renderer';
import StaticInstrument from '../demo/src/components/static-instrument-example';

test('StaticInstrument demo renders correctly', () => {
  // console.log(a);

  const component = renderer.create(
    <StaticInstrument />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
