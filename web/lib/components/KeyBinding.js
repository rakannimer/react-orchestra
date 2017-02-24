'use strict';

exports.__esModule = true;
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactKeymaster = require('react-keymaster');

var _reactKeymaster2 = _interopRequireDefault(_reactKeymaster);

var _callIfExists = require('../utils/callIfExists');

var _callIfExists2 = _interopRequireDefault(_callIfExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Note from '../utils/callIfExists';

var KeyBinding = function (_React$Component) {
  (0, _inherits3.default)(KeyBinding, _React$Component);

  function KeyBinding(props) {
    (0, _classCallCheck3.default)(this, KeyBinding);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onKeyUp = _this.onKeyUp.bind(_this);
    return _this;
  }

  KeyBinding.prototype.onKeyDown = function onKeyDown(keyName) {
    // console.warn(`NoteDown ${JSON.stringify(keyName, 2, 2)}`);
    (0, _callIfExists2.default)(this.props.onKeyDown, keyName);
  };

  KeyBinding.prototype.onKeyUp = function onKeyUp(keyName) {
    // console.warn(`NoteUp ${JSON.stringify(keyName, 2, 2)}`);
    (0, _callIfExists2.default)(this.props.onKeyUp, keyName);
  };

  KeyBinding.prototype.render = function render() {
    return _react2.default.createElement(_reactKeymaster2.default, {
      keyName: this.props.keyName,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp
    });
  };

  return KeyBinding;
}(_react2.default.Component);

exports.default = KeyBinding;


process.env.NODE_ENV !== "production" ? KeyBinding.propTypes = {
  keyName: _react.PropTypes.string.isRequired,
  onKeyDown: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func
} : void 0;
module.exports = exports['default'];