
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

import { Note } from '../src/';

const note = (
  <Note
    name={'A3'}
    play={false}
    instrumentName={'acoustic_grand_piano'}
    onNoteLoaded={()=>{
      console.log('Note loaded');
    }}
  >
    <div>Note container</div>
  </Note>
);
test('Note renders correctly', async () => {

  const component = renderer.create(note);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const wrapper = shallow(note);
  expect(wrapper).toMatchSnapshot();

  wrapper.setProps({ play: true, });
  expect(wrapper).toMatchSnapshot();
});

test('Note handles onMouseDown and onMouseUp correctly', async () => {
  // TODO: The component needs to be loaded for mousedown and mouseup to be attached
  // const component = renderer.create(note);
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  //
  // await tree.props.onMouseDown();
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  //
  // await tree.props.onMouseUp();
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

test('Note handles onTouchStart and onTouchEnd correctly', async () => {
  // TODO: The component needs to be loaded for onTouchStart and onTouchEnd to be attached
  // const component = renderer.create(note);
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  //
  // await tree.props.onMouseDown();
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  //
  // await tree.props.onMouseUp();
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
