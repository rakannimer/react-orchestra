/* mod */
import reOrderNotes from './reOrderNotes';
import isInHigherOctave from './isInHigherOctave';
import SCALES from '../constants/SCALES';
import NOTES from '../constants/NOTES';

/**
 * getScaleNotes - Get notes for a given scale for _count_ octaves at _startOctave_
 *
 * @param  {string} note        noteName without octave
 * @param  {string} scale       scaleName must be one defined in constants/SCALES
 * @param  {number} startOctave starting octave
 * @param  {number} count       Number of octaves
 * @returns {array}            Array of note names with octave
 */
const getScaleNotes = (note, scale, startOctave, count) => {
  const startingNoteIndex = NOTES.indexOf(note);
  if (startingNoteIndex === -1) {
    throw new Error('NOTE IS NOT RECOGNIZED');
  }
  if (SCALES[scale] == null) {
    throw new Error('SCALE IS NOT RECOGNIZED');
  }
  const scaleSequence = SCALES[scale].sequence;
  const notes = reOrderNotes(note);
  const scaleNotes = scaleSequence.map(interval => notes[interval]);
  // scaleNotes = Musician.reOrderNotes('C', scaleNotes);
  let currentOctave = startOctave;
  let scaleNotesWithInterval = [];
  for (let i = startOctave; i < startOctave + count; i += 1) {
    let previousNote = scaleNotes[0];
    const currentNotes = scaleNotes.map((currentNote, j) => {
      if (j === 0 && i === startOctave) {
        previousNote = currentNote;
        return `${currentNote}${currentOctave}`;
      }
      if (isInHigherOctave(previousNote, currentNote)) {
        currentOctave += 1;
      }
      previousNote = currentNote;
      return `${currentNote}${currentOctave}`;
    });
    scaleNotesWithInterval = [...scaleNotesWithInterval, ...currentNotes];
  }
  return scaleNotesWithInterval;
};
export default getScaleNotes;
