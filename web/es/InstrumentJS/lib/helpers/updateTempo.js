'use strict';

exports.__esModule = true;

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _MidiIO = require('../../../MidiIO/src/MidiIO');

var _MidiIO2 = _interopRequireDefault(_MidiIO);

var _Note = require('../Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * reorder a set of notes such that it starts with the firstNote
 * @function
 * @name updateTempo
 * @param {object} tracksAndMeta from getTracksAndMetaFromParsedMidi getTracksAndMetaFromUrl
 * @param {array} notes
 * @example
 * const newBPM = 60;
 * const trackIndex = 1;
 * const tracksAndMeta = await getTracksAndMetaFromUrl(url);
 * const updatedTracksAndMeta = updateTempo(tracksAndMeta, newBPM, trackIndex);
 * updateTempo('A' , ['C', 'B', 'A']); // returns ['A', 'B', 'C']
 * reOrderNotes('B'); // returns ['B', 'C', 'D', 'E', 'F', 'G', 'A']
 * @return {object} tracksAndMeta
 */
var updateTempo = function updateTempo(tracksAndMeta, BPM) {
  var trackIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

  var trackMeta = tracksAndMeta.meta;
  // const trackNotes = tracksAndMeta.notes[0];
  var newMSPerBeat = _MidiIO2.default.bpmToMSPerBeat(BPM, trackMeta.timeSignatureNumerator, trackMeta.timeSignatureDenominator);
  var newMSPerTick = _MidiIO2.default.getMillisecondsPerTick(newMSPerBeat / 1000, trackMeta.ticksPerBeat);
  var updatedMeta = (0, _immutabilityHelper2.default)(trackMeta, {
    millisecondsPerTick: {
      $set: newMSPerTick
    },
    BPM: {
      $set: BPM
    }
  });
  var previousEndTime = 0;

  var updatedTracks = tracksAndMeta.tracks.map(function (track, i) {
    if (trackIndex !== -1 && i !== trackIndex) {
      return track;
    }
    var updatedTrack = track.map(function (note, j) {
      var _MidiIO$noteOffEventT = _MidiIO2.default.noteOffEventToNote({
        deltaTime: note.payload.deltaTime,
        noteNumber: note.payload.noteNumber
      }, note.payload.instrumentName, previousEndTime, newMSPerTick),
          noteNumber = _MidiIO$noteOffEventT.noteNumber,
          noteName = _MidiIO$noteOffEventT.noteName,
          startTimeInMS = _MidiIO$noteOffEventT.startTimeInMS,
          durationInMS = _MidiIO$noteOffEventT.durationInMS,
          endTimeInMS = _MidiIO$noteOffEventT.endTimeInMS,
          noteInstrumentName = _MidiIO$noteOffEventT.noteInstrumentName,
          deltaTime = _MidiIO$noteOffEventT.deltaTime,
          msPerTick = _MidiIO$noteOffEventT.msPerTick;

      previousEndTime = endTimeInMS;
      var updatedNote = new _Note2.default({
        noteNumber: noteNumber,
        noteName: noteName,
        startTimeInMS: startTimeInMS,
        durationInMS: durationInMS,
        endTimeInMS: endTimeInMS,
        instrumentName: noteInstrumentName,
        deltaTime: deltaTime,
        msPerTick: newMSPerTick
      });
      return updatedNote;
    });
    return updatedTrack;
  });
  return { meta: updatedMeta, tracks: updatedTracks };
}; /* mod */
exports.default = updateTempo;
module.exports = exports['default'];