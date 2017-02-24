'use strict';

exports.__esModule = true;
exports.createMelodyFromNotes = exports.updateTempo = exports.isInHigherOctave = exports.getScaleNotes = exports.getTracksAndMetaFromUrl = exports.getTracksAndMetaFromParsedMidi = exports.getJSONFromMidiURL = exports.getNoteNamesFromChordName = exports.getNoteNamesFromIntervals = exports.getScalesFromNoteNames = exports.getIntervalPermutationsFromNoteNames = exports.getInterval = exports.addOctaveToNoteName = exports.removeOctaveFromNoteName = exports.getUniqueNoteNamesNoOctave = exports.getUniqueNoteNames = exports.InstrumentHelpers = undefined;

var _getUniqueNoteNames = require('./getUniqueNoteNames');

var _getUniqueNoteNames2 = _interopRequireDefault(_getUniqueNoteNames);

var _getUniqueNoteNamesNoOctave = require('./getUniqueNoteNamesNoOctave');

var _getUniqueNoteNamesNoOctave2 = _interopRequireDefault(_getUniqueNoteNamesNoOctave);

var _removeOctaveFromNoteName = require('./removeOctaveFromNoteName');

var _removeOctaveFromNoteName2 = _interopRequireDefault(_removeOctaveFromNoteName);

var _addOctaveToNoteName = require('./addOctaveToNoteName');

var _addOctaveToNoteName2 = _interopRequireDefault(_addOctaveToNoteName);

var _getInterval = require('./getInterval');

var _getInterval2 = _interopRequireDefault(_getInterval);

var _getIntervalPermutationsFromNoteNames = require('./getIntervalPermutationsFromNoteNames');

var _getIntervalPermutationsFromNoteNames2 = _interopRequireDefault(_getIntervalPermutationsFromNoteNames);

var _getScalesFromNoteNames = require('./getScalesFromNoteNames');

var _getScalesFromNoteNames2 = _interopRequireDefault(_getScalesFromNoteNames);

var _getNoteNamesFromIntervals = require('./getNoteNamesFromIntervals');

var _getNoteNamesFromIntervals2 = _interopRequireDefault(_getNoteNamesFromIntervals);

var _getNoteNamesFromChordName = require('./getNoteNamesFromChordName');

var _getNoteNamesFromChordName2 = _interopRequireDefault(_getNoteNamesFromChordName);

var _getJSONFromMidiURL = require('./getJSONFromMidiURL');

var _getJSONFromMidiURL2 = _interopRequireDefault(_getJSONFromMidiURL);

var _getTracksAndMetaFromParsedMidi = require('./getTracksAndMetaFromParsedMidi');

var _getTracksAndMetaFromParsedMidi2 = _interopRequireDefault(_getTracksAndMetaFromParsedMidi);

var _getTracksAndMetaFromUrl = require('./getTracksAndMetaFromUrl');

var _getTracksAndMetaFromUrl2 = _interopRequireDefault(_getTracksAndMetaFromUrl);

var _getScaleNotes = require('./getScaleNotes');

var _getScaleNotes2 = _interopRequireDefault(_getScaleNotes);

var _isInHigherOctave = require('./isInHigherOctave');

var _isInHigherOctave2 = _interopRequireDefault(_isInHigherOctave);

var _updateTempo = require('./updateTempo');

var _updateTempo2 = _interopRequireDefault(_updateTempo);

var _createMelodyFromNotes = require('./createMelodyFromNotes');

var _createMelodyFromNotes2 = _interopRequireDefault(_createMelodyFromNotes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* mod */

var InstrumentHelpers = exports.InstrumentHelpers = {
  getUniqueNoteNames: _getUniqueNoteNames2.default,
  getUniqueNoteNamesNoOctave: _getUniqueNoteNamesNoOctave2.default,
  removeOctaveFromNoteName: _removeOctaveFromNoteName2.default,
  addOctaveToNoteName: _addOctaveToNoteName2.default,
  getInterval: _getInterval2.default,
  getIntervalPermutationsFromNoteNames: _getIntervalPermutationsFromNoteNames2.default,
  getScalesFromNoteNames: _getScalesFromNoteNames2.default,
  getNoteNamesFromIntervals: _getNoteNamesFromIntervals2.default,
  getNoteNamesFromChordName: _getNoteNamesFromChordName2.default,
  getJSONFromMidiURL: _getJSONFromMidiURL2.default,
  getTracksAndMetaFromParsedMidi: _getTracksAndMetaFromParsedMidi2.default,
  getTracksAndMetaFromUrl: _getTracksAndMetaFromUrl2.default,
  getScaleNotes: _getScaleNotes2.default,
  isInHigherOctave: _isInHigherOctave2.default,
  updateTempo: _updateTempo2.default,
  createMelodyFromNotes: _createMelodyFromNotes2.default
};

exports.getUniqueNoteNames = _getUniqueNoteNames2.default;
exports.getUniqueNoteNamesNoOctave = _getUniqueNoteNamesNoOctave2.default;
exports.removeOctaveFromNoteName = _removeOctaveFromNoteName2.default;
exports.addOctaveToNoteName = _addOctaveToNoteName2.default;
exports.getInterval = _getInterval2.default;
exports.getIntervalPermutationsFromNoteNames = _getIntervalPermutationsFromNoteNames2.default;
exports.getScalesFromNoteNames = _getScalesFromNoteNames2.default;
exports.getNoteNamesFromIntervals = _getNoteNamesFromIntervals2.default;
exports.getNoteNamesFromChordName = _getNoteNamesFromChordName2.default;
exports.getJSONFromMidiURL = _getJSONFromMidiURL2.default;
exports.getTracksAndMetaFromParsedMidi = _getTracksAndMetaFromParsedMidi2.default;
exports.getTracksAndMetaFromUrl = _getTracksAndMetaFromUrl2.default;
exports.getScaleNotes = _getScaleNotes2.default;
exports.isInHigherOctave = _isInHigherOctave2.default;
exports.updateTempo = _updateTempo2.default;
exports.createMelodyFromNotes = _createMelodyFromNotes2.default;
exports.default = InstrumentHelpers; // getUniqueNoteNames;

// export InstrumentHelpers