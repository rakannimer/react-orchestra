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
const getTracksAndMetaFromParsedMidi = (midi) => {
  const meta = midi.meta;
  const tracks = midi.musicTracks.map((track, i) => {
    const noteOns = track.noteOnValid;
    const noteOffs = track.noteOff;
    const trackInstrumentName = meta.instrumentNames[i];
    const millisecondsPerTick = meta.millisecondsPerTick;
    let previousEndTime = 0;
    return noteOffs.map((noteOff) => {
      const {
        noteNumber,
        noteName,
        startTimeInMS,
        durationInMS,
        endTimeInMS,
        noteInstrumentName,
        deltaTime,
        msPerTick,
      } = MidiIO.noteOffEventToNote(
        noteOff,
        trackInstrumentName,
        previousEndTime,
        millisecondsPerTick
      );
      previousEndTime = endTimeInMS;
      const note = new Note({
        noteNumber,
        noteName,
        startTimeInMS,
        durationInMS,
        endTimeInMS,
        instrumentName: noteInstrumentName,
        deltaTime,
        msPerTick,
      });
      return note;
    });
  });
  return { meta, tracks };
};

export default getTracksAndMetaFromParsedMidi;
