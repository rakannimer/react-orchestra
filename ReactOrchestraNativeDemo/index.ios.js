/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Demo from './src/';

export default class NativeDemo extends Component {
  render() {
    return (
        <Demo />
    );
  }
}
AppRegistry.registerComponent('ReactOrchestraNativeDemo', () => NativeDemo);
