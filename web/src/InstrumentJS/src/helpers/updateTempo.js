/* mod */
import update from 'immutability-helper';
import MidiIO from '../../MidiIO';

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
const updateTempo = (tracksAndMeta, BPM, trackIndex = -1) => {
  const trackMeta = tracksAndMeta.meta;
  // const trackNotes = tracksAndMeta.notes[0];
  const newMSPerBeat = MidiIO.bpmToMSPerBeat(
    BPM,
    trackMeta.timeSignatureNumerator,
    trackMeta.timeSignatureDenominator
  );
  const newMSPerTick = MidiIO.getMillisecondsPerTick(newMSPerBeat / 1000, trackMeta.ticksPerBeat);
  const updatedMeta = update(trackMeta, {
    millisecondsPerTick: {
      $set: newMSPerTick,
    },
    BPM: {
      $set: BPM,
    },
  });
  let previousEndTime = 0;

  const updatedTracks = tracksAndMeta.tracks.map((track, i) => {
    if (trackIndex !== -1 && i !== trackIndex) {
      return track;
    }
    const updatedTrack = track.map((note, j) => {
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
        {
          deltaTime: note.payload.deltaTime,
          noteNumber: note.payload.noteNumber,
        },
        note.payload.instrumentName,
        previousEndTime,
        newMSPerTick
      );
      previousEndTime = endTimeInMS;
      const updatedNote = new Note({
        noteNumber,
        noteName,
        startTimeInMS,
        durationInMS,
        endTimeInMS,
        instrumentName: noteInstrumentName,
        deltaTime,
        msPerTick: newMSPerTick,
      });
      return updatedNote;
    });
    return updatedTrack;
  });
  return { meta: updatedMeta, tracks: updatedTracks };
};

export default updateTempo;
