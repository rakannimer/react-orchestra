import React, { PropTypes } from 'react';
import ReactKeyMaster from 'react-keymaster';
import callIfExists from '../utils/callIfExists';
// import Note from '../utils/callIfExists';

export default class KeyBinding extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  onKeyDown(keyName) {
    // console.warn(`NoteDown ${JSON.stringify(keyName, 2, 2)}`);
    callIfExists(this.props.onKeyDown, keyName);
  }
  onKeyUp(keyName) {
    // console.warn(`NoteUp ${JSON.stringify(keyName, 2, 2)}`);
    callIfExists(this.props.onKeyUp, keyName);
  }
  render() {
    return (
      <ReactKeyMaster
        keyName={this.props.keyName}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
      />
    );
  }
}

KeyBinding.propTypes = {
  keyName: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
};
