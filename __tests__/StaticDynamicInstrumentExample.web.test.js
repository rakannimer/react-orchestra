
import React from 'react';
import renderer from 'react-test-renderer';
// jest.dontMock('../demo/src/components/static-instrument-example');


import StaticInstrument from '../demo/src/components/static-instrument-example';
import InteractiveInstrument from '../demo/src/components/interactive-instrument-example';
import { shallow, mount, render } from 'enzyme';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

test('StaticInstrument demo renders correctly', async () => {
  // console.log(a);

  const component = renderer.create(
    <div>
      <StaticInstrument />
      <InteractiveInstrument />
    </div>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
