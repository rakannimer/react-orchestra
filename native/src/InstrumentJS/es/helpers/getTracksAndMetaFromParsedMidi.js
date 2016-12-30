/* mod */
import MidiIO from '../../MidiIO';

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
      var _MidiIO$noteOffEventT = MidiIO.noteOffEventToNote(noteOff, trackInstrumentName, previousEndTime, millisecondsPerTick);

      var noteNumber = _MidiIO$noteOffEventT.noteNumber;
      var noteName = _MidiIO$noteOffEventT.noteName;
      var startTimeInMS = _MidiIO$noteOffEventT.startTimeInMS;
      var durationInMS = _MidiIO$noteOffEventT.durationInMS;
      var endTimeInMS = _MidiIO$noteOffEventT.endTimeInMS;
      var noteInstrumentName = _MidiIO$noteOffEventT.noteInstrumentName;
      var deltaTime = _MidiIO$noteOffEventT.deltaTime;
      var msPerTick = _MidiIO$noteOffEventT.msPerTick;

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