/* mod */
import MidiIO from '../../../MidiIO/src/MidiIO';

import Note from '../Note';

/**
 * getTracksAndMetaFromParsedMidi - Convert a json midi file parsed with MidiIO into clean meta and tracks object
 *
 * @param  {array} noteNames    noteNames with octave
 * @returns {object}            Array of note names with octave
 *                            [{firstNoteName: string, intervals: number, guessedScales: array}]
 * @example
 * const parsedMidi = await getJSONFromMidiURL(url);
 * getTracksAndMetaFromParsedMidi(parsedMidi);
 * // Returns
 * //   {
 * //     meta: object,
 * //     tracks: array,
 * //   }
 */
var getTracksAndMetaFromParsedMidi = function getTracksAndMetaFromParsedMidi(midi) {
  var meta = midi.meta;
  var tracks = midi.musicTracks.map(function (track, i) {
    var noteOns = track.noteOnValid;
    var noteOffs = track.noteOff;
    var trackInstrumentName = meta.instrumentNames[i];
    var millisecondsPerTick = meta.millisecondsPerTick;
    var previousEndTime = 0;
    return noteOffs.map(function (noteOff) {
      var _MidiIO$noteOffEventT = MidiIO.noteOffEventToNote(noteOff, trackInstrumentName, previousEndTime, millisecondsPerTick),
          noteNumber = _MidiIO$noteOffEventT.noteNumber,
          noteName = _MidiIO$noteOffEventT.noteName,
          startTimeInMS = _MidiIO$noteOffEventT.startTimeInMS,
          durationInMS = _MidiIO$noteOffEventT.durationInMS,
          endTimeInMS = _MidiIO$noteOffEventT.endTimeInMS,
          noteInstrumentName = _MidiIO$noteOffEventT.noteInstrumentName,
          deltaTime = _MidiIO$noteOffEventT.deltaTime,
          msPerTick = _MidiIO$noteOffEventT.msPerTick;

      previousEndTime = endTimeInMS;
      var note = new Note({
        noteNumber: noteNumber,
        noteName: noteName,
        startTimeInMS: startTimeInMS,
        durationInMS: durationInMS,
        endTimeInMS: endTimeInMS,
        instrumentName: noteInstrumentName,
        deltaTime: deltaTime,
        msPerTick: msPerTick
      });
      return note;
    });
  });
  return { meta: meta, tracks: tracks };
};

export default getTracksAndMetaFromParsedMidi;