/* mod */
import update from 'immutability-helper';
import MidiIO from '../../../MidiIO/src/MidiIO';

import Note from '../Note';

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
  var newMSPerBeat = MidiIO.bpmToMSPerBeat(BPM, trackMeta.timeSignatureNumerator, trackMeta.timeSignatureDenominator);
  var newMSPerTick = MidiIO.getMillisecondsPerTick(newMSPerBeat / 1000, trackMeta.ticksPerBeat);
  var updatedMeta = update(trackMeta, {
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
      var _MidiIO$noteOffEventT = MidiIO.noteOffEventToNote({
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
      var updatedNote = new Note({
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
};

export default updateTempo;