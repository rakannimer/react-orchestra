'use strict';

exports.__esModule = true;
exports.Orchestra = exports.Note = exports.Instrument = undefined;

var _Instrument = require('./components/Instrument');

var _Instrument2 = _interopRequireDefault(_Instrument);

var _Note = require('./components/Note');

var _Note2 = _interopRequireDefault(_Note);

var _Orchestra = require('./components/Orchestra');

var _Orchestra2 = _interopRequireDefault(_Orchestra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Instrument: _Instrument2.default,
  Note: _Note2.default,
  Orchestra: _Orchestra2.default
};
exports.Instrument = _Instrument2.default;
exports.Note = _Note2.default;
exports.Orchestra = _Orchestra2.default;