import Chance from 'chance';
import Note from '../Note';

var chance = null;

var getRandomGenerator = function getRandomGenerator() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.randomSeed;

  chance = chance === null ? new Chance(seed ? seed : window.randomSeed ? window.randomSeed : undefined) : chance;
  return chance;
};

var createMelodyFromNotes = function createMelodyFromNotes(notes) {
  var durationInMS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var numberOfNotes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

  var durationInSeconds = durationInMS / 1000;
  var noteCount = numberOfNotes === -1 ? getRandomGenerator().integer({ min: durationInSeconds / 2, max: durationInSeconds * 2 }) : numberOfNotes;

  var generatedDuration = 0;
  var generatedNotes = Array.apply(undefined, Array(noteCount)).map(function () {
    var selectedNote = getRandomGenerator().integer({ min: 0, max: notes.length - 1 });
    var noteName = notes[selectedNote];
    return noteName;
  }).map(function (noteName, i) {
    var noteDurationInMS = getRandomGenerator().integer({
      min: durationInMS / noteCount - durationInMS / 10,
      max: durationInMS / noteCount + durationInMS / 10
    });
    if (i === noteCount - 1) {
      noteDurationInMS = durationInMS - generatedDuration;
    }
    // const noteDurationInMS = noteDurationInMS;
    var startTimeInMS = getRandomGenerator().integer({
      min: 0,
      max: durationInMS - noteDurationInMS });
    var endTimeInMS = startTimeInMS + noteDurationInMS;
    generatedDuration += noteDurationInMS;
    return new Note({ noteName: noteName, durationInMS: noteDurationInMS, startTimeInMS: startTimeInMS, endTimeInMS: endTimeInMS });
  }).sort(function (previous, current) {
    if (previous.payload.startTimeInMS < current.payload.startTimeInMS) {
      return -1;
    }
    if (previous.payload.startTimeInMS > current.payload.startTimeInMS) {
      return 1;
    }
    return 0;
  });
  return generatedNotes;
  // return new Melody({ notes: generatedNotes });
};

export default createMelodyFromNotes;