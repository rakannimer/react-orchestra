
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

// jest.dontMock('../demo/src/components/static-instrument-example');


import StaticInstrument from '../demo/src/components/static-instrument-example';
import InteractiveInstrument from '../demo/src/components/interactive-instrument-example';
import StaticOrchestraExample from '../demo/src/components/static-orchestra-example';


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

test('StaticInstrument demo renders correctly', async () => {
  // console.log(a);

  const component = renderer.create(
    <div>
      <StaticInstrument />
      <InteractiveInstrument />
      <StaticOrchestraExample />
    </div>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
