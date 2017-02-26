'use strict';

exports.__esModule = true;
exports.MusicManager = exports.InstrumentHelpers = exports.KeyBinding = exports.NoteFactory = exports.Orchestra = exports.Note = exports.Instrument = undefined;

var _Instrument = require('./components/Instrument');

var _Instrument2 = _interopRequireDefault(_Instrument);

var _Note = require('./components/Note');

var _Note2 = _interopRequireDefault(_Note);

var _Orchestra = require('./components/Orchestra');

var _Orchestra2 = _interopRequireDefault(_Orchestra);

var _NoteFactory = require('./components/NoteFactory');

var _NoteFactory2 = _interopRequireDefault(_NoteFactory);

var _KeyBinding = require('./components/KeyBinding');

var _KeyBinding2 = _interopRequireDefault(_KeyBinding);

var _src = require('./InstrumentJS/src/');

var _MusicManager = require('./MusicManager');

var _MusicManager2 = _interopRequireDefault(_MusicManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import NoteHelpers from './utils/NoteHelpers';
window.isTouchDevice = 'ontouchstart' in document.documentElement;

exports.default = {
  Instrument: _Instrument2.default,
  Note: _Note2.default,
  Orchestra: _Orchestra2.default,
  NoteFactory: _NoteFactory2.default,
  KeyBinding: _KeyBinding2.default,
  InstrumentHelpers: _src.InstrumentHelpers,
  MusicManager: _MusicManager2.default
};
exports.Instrument = _Instrument2.default;
exports.Note = _Note2.default;
exports.Orchestra = _Orchestra2.default;
exports.NoteFactory = _NoteFactory2.default;
exports.KeyBinding = _KeyBinding2.default;
exports.InstrumentHelpers = _src.InstrumentHelpers;
exports.MusicManager = _MusicManager2.default;