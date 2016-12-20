
import React from 'react';
import renderer from 'react-test-renderer';
import { Note } from '../src/';

test('Note renders correctly', async () => {
  // console.log(a);

  const component = renderer.create(
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
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  //
  // // manually trigger the callback
  await tree.props.onMouseDown();
  // // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  await tree.props.onMouseUp();
  // // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
