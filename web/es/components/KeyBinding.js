import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import ReactKeyMaster from 'react-keymaster';
import callIfExists from '../utils/callIfExists';
// import Note from '../utils/callIfExists';

var KeyBinding = function (_React$Component) {
  _inherits(KeyBinding, _React$Component);

  function KeyBinding(props) {
    _classCallCheck(this, KeyBinding);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onKeyUp = _this.onKeyUp.bind(_this);
    return _this;
  }

  KeyBinding.prototype.onKeyDown = function onKeyDown(keyName) {
    // console.warn(`NoteDown ${JSON.stringify(keyName, 2, 2)}`);
    callIfExists(this.props.onKeyDown, keyName);
  };

  KeyBinding.prototype.onKeyUp = function onKeyUp(keyName) {
    // console.warn(`NoteUp ${JSON.stringify(keyName, 2, 2)}`);
    callIfExists(this.props.onKeyUp, keyName);
  };

  KeyBinding.prototype.render = function render() {
    return React.createElement(ReactKeyMaster, {
      keyName: this.props.keyName,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp
    });
  };

  return KeyBinding;
}(React.Component);

export { KeyBinding as default };


process.env.NODE_ENV !== "production" ? KeyBinding.propTypes = {
  keyName: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func
} : void 0;