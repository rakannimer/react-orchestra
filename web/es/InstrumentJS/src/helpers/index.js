/* mod */

import getUniqueNoteNames from './getUniqueNoteNames';
import getUniqueNoteNamesNoOctave from './getUniqueNoteNamesNoOctave';
import removeOctaveFromNoteName from './removeOctaveFromNoteName';
import addOctaveToNoteName from './addOctaveToNoteName';
import getInterval from './getInterval';
import getIntervalPermutationsFromNoteNames from './getIntervalPermutationsFromNoteNames';
import getScalesFromNoteNames from './getScalesFromNoteNames';
import getNoteNamesFromIntervals from './getNoteNamesFromIntervals';
import getNoteNamesFromChordName from './getNoteNamesFromChordName';
import getJSONFromMidiURL from './getJSONFromMidiURL';
import getTracksAndMetaFromParsedMidi from './getTracksAndMetaFromParsedMidi';
import getTracksAndMetaFromUrl from './getTracksAndMetaFromUrl';
import getScaleNotes from './getScaleNotes';
import isInHigherOctave from './isInHigherOctave';
import updateTempo from './updateTempo';
import createMelodyFromNotes from './createMelodyFromNotes';

export var InstrumentHelpers = {
  getUniqueNoteNames: getUniqueNoteNames,
  getUniqueNoteNamesNoOctave: getUniqueNoteNamesNoOctave,
  removeOctaveFromNoteName: removeOctaveFromNoteName,
  addOctaveToNoteName: addOctaveToNoteName,
  getInterval: getInterval,
  getIntervalPermutationsFromNoteNames: getIntervalPermutationsFromNoteNames,
  getScalesFromNoteNames: getScalesFromNoteNames,
  getNoteNamesFromIntervals: getNoteNamesFromIntervals,
  getNoteNamesFromChordName: getNoteNamesFromChordName,
  getJSONFromMidiURL: getJSONFromMidiURL,
  getTracksAndMetaFromParsedMidi: getTracksAndMetaFromParsedMidi,
  getTracksAndMetaFromUrl: getTracksAndMetaFromUrl,
  getScaleNotes: getScaleNotes,
  isInHigherOctave: isInHigherOctave,
  updateTempo: updateTempo,
  createMelodyFromNotes: createMelodyFromNotes
};

export { getUniqueNoteNames, getUniqueNoteNamesNoOctave, removeOctaveFromNoteName, addOctaveToNoteName, getInterval, getIntervalPermutationsFromNoteNames, getScalesFromNoteNames, getNoteNamesFromIntervals, getNoteNamesFromChordName, getJSONFromMidiURL, getTracksAndMetaFromParsedMidi, getTracksAndMetaFromUrl, getScaleNotes, isInHigherOctave, updateTempo, createMelodyFromNotes };

export default InstrumentHelpers; // getUniqueNoteNames;

// export InstrumentHelpers