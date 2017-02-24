'use strict';

exports.__esModule = true;
exports.InstrumentHelpers = exports.INSTRUMENT_NAMES = exports.Note = exports.Instrument = exports.AudioContext = undefined;

var _AudioContext = require('./AudioContext');

var _AudioContext2 = _interopRequireDefault(_AudioContext);

var _Instruments = require('./Instruments');

var _Instruments2 = _interopRequireDefault(_Instruments);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

var _INSTRUMENTS = require('./constants/INSTRUMENTS');

var _INSTRUMENTS2 = _interopRequireDefault(_INSTRUMENTS);

var _helpers = require('./helpers/');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AudioContext = _AudioContext2.default;
exports.Instrument = _Instruments2.default;
exports.Note = _Note2.default;
exports.INSTRUMENT_NAMES = _INSTRUMENTS2.default;
exports.InstrumentHelpers = _helpers2.default;
// import Melody from './Melody';
// import Musician from './Musician';