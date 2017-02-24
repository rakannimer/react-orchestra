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
var getScaleNotes = function getScaleNotes(note, scale, startOctave, count) {
  var startingNoteIndex = NOTES.indexOf(note);
  if (startingNoteIndex === -1) {
    throw new Error('NOTE IS NOT RECOGNIZED');
  }
  if (SCALES[scale] == null) {
    throw new Error('SCALE IS NOT RECOGNIZED');
  }
  var scaleSequence = SCALES[scale].sequence;
  var notes = reOrderNotes(note);
  var scaleNotes = scaleSequence.map(function (interval) {
    return notes[interval];
  });
  // scaleNotes = Musician.reOrderNotes('C', scaleNotes);
  var currentOctave = startOctave;
  var scaleNotesWithInterval = [];

  var _loop = function _loop(i) {
    var previousNote = scaleNotes[0];
    var currentNotes = scaleNotes.map(function (currentNote, j) {
      if (j === 0 && i === startOctave) {
        previousNote = currentNote;
        return '' + currentNote + currentOctave;
      }
      if (isInHigherOctave(previousNote, currentNote)) {
        currentOctave += 1;
      }
      previousNote = currentNote;
      return '' + currentNote + currentOctave;
    });
    scaleNotesWithInterval = [].concat(scaleNotesWithInterval, currentNotes);
  };

  for (var i = startOctave; i < startOctave + count; i += 1) {
    _loop(i);
  }
  return scaleNotesWithInterval;
};
export default getScaleNotes;