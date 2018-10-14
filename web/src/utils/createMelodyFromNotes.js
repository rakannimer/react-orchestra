import Chance from 'chance';
import Note from '../Note';

let chance = null;

const getRandomGenerator = (seed = window.randomSeed) => {
  chance =
    chance === null ?
      new Chance(
        seed ?
          seed :
          (
            window.randomSeed ?
              window.randomSeed :
              undefined
          )
        ) :
      chance;
  return chance;
}

const createMelodyFromNotes = (notes, durationInMS = 1000, numberOfNotes = -1) => {
  const durationInSeconds = durationInMS / 1000;
  const noteCount = (numberOfNotes === -1) ?
    getRandomGenerator().integer({ min: durationInSeconds / 2, max: durationInSeconds * 2 }) :
    numberOfNotes;

  let generatedDuration = 0;
  const generatedNotes = Array(...Array(noteCount)).map(() => {
    const selectedNote = getRandomGenerator().integer({ min: 0, max: notes.length - 1 });
    const noteName = notes[selectedNote];
    return noteName;
  }).map((noteName, i) => {
    let noteDurationInMS = getRandomGenerator().integer(
      {
        min: (durationInMS / noteCount) - (durationInMS / 10),
        max: (durationInMS / noteCount) + (durationInMS / 10),
      }
    );
    if (i === (noteCount - 1)) {
      noteDurationInMS = durationInMS - generatedDuration;
    }
    // const noteDurationInMS = noteDurationInMS;
    const startTimeInMS = getRandomGenerator().integer(
      {
        min: 0,
        max: durationInMS - noteDurationInMS, // (durationInMS / noteCount) + (durationInMS / 10),
      }
    );
    const endTimeInMS = startTimeInMS + noteDurationInMS;
    generatedDuration += noteDurationInMS;
    return new Note({ noteName, durationInMS: noteDurationInMS, startTimeInMS, endTimeInMS });
  }).sort((previous, current) => {
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
