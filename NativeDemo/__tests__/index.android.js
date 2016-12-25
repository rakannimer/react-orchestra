import 'react-native';
import React from 'react';
import Demo from '../demo/';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Demo />
  );
});
