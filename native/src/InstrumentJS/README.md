# InstrumentJS
[![CircleCI](https://circleci.com/gh/RakanNimer/InstrumentJS.svg?style=shield&circle-token=a8f9a00f2444ffc5ed93d542155bb256860e0243)](https://circleci.com/gh/RakanNimer/InstrumentJS)

A suite of helpers and objects to play and compose music from your browser.

## Installation

```sh
  npm install --save git+https://a616ae14b9b11774d04278d924c162e3f9276e9b:x-oauth-basic@github.com/rakannimer/InstrumentJS.git
```

You can now use it by importing it in your app :

```javascript

import { Note, Instrument, InstrumentHelpers } from 'InstrumentJS';

```
## API

### Functional Helpers 

Data in, data out : 
```javascript
import { Note, Instrument, InstrumentHelpers } from 'InstrumentJS';

const getUniqueNoteNamesTest = () => {
  const notes = [
    new Note({ name: 'A3' }),
    new Note({ name: 'C3' }),
    new Note({ name: 'A3' }),
    new Note({ name: 'B3' }),
    new Note({ name: 'C3' }),
  ];
  const uniqueNoteNames = InstrumentHelpers.getUniqueNoteNames(notes);
  return { input: notes, output: uniqueNoteNames };
};

const getUniqueNoteNamesNoOctaveTest = () => {
  const notes = [
    new Note({ name: 'A3' }),
    new Note({ name: 'C3' }),
    new Note({ name: 'A3' }),
    new Note({ name: 'B3' }),
    new Note({ name: 'C3' }),
  ];
  const uniqueNoteNamesNoOctave = InstrumentHelpers.getUniqueNoteNamesNoOctave(notes);
  return { input: notes, output: uniqueNoteNamesNoOctave };
};

const removeOctaveFromNoteNameTest = () => {
  const noteNameNoOctave = InstrumentHelpers.removeOctaveFromNoteName('A3');
  return { input: 'A3', output: noteNameNoOctave };
};

const addOctaveToNoteNameTest = () => {
  const noteName = InstrumentHelpers.addOctaveToNoteName('A', 3);
  return { input: '(A, 3)', output: noteName };
};

const getIntervalTest = () => {
  const noteNameOne = 'C';
  const noteNameTwo = 'B';
  const interval = InstrumentHelpers.getInterval(noteNameTwo, noteNameOne);
  return { input: "('C', 'B')", output: interval };
};

const getIntervalPermutationsFromNoteNamesTest = () => {
  const noteNamesNoOctave = ['A', 'B', 'C'];
  const permutations = InstrumentHelpers.getIntervalPermutationsFromNoteNames(noteNamesNoOctave);
  return { input: noteNamesNoOctave, output: permutations };
};

const getScalesFromNoteNamesTest = () => {
  const noteNames = ['A3', 'B3', 'C3'];
  const permutations = InstrumentHelpers.getScalesFromNoteNames(noteNames);
  return { input: noteNames, output: permutations };
};

const getNoteNamesFromIntervalsTest = () => {
  const firstNoteName = 'A3';
  const intervals = [0, 2, 4];
  const noteNames = InstrumentHelpers.getNoteNamesFromIntervals(firstNoteName, intervals);
  return { input: `(${firstNoteName}, ${JSON.stringify(intervals)})`, output: noteNames };
  // console.log('getNoteNamesFromIntervals');
};

const getNoteNamesFromChordNameTest = () => {
  const firstNoteName = 'A3';
  const chordName = 'min';
  const noteNames = InstrumentHelpers.getNoteNamesFromChordName('A3', 'min');
  return { input: `(${firstNoteName}, ${chordName})`, output: noteNames };
};

const getJSONFromMidiURLTest = () => {
  return InstrumentHelpers.getJSONFromMidiURL(url).then(output => ({ input: url, output }));
};

const getTracksAndMetaFromParsedMidiTest = () => {
  return InstrumentHelpers.getJSONFromMidiURL(url)
  .then(jsonParsedMidi => ({ jsonParsedMidi, tracksAndMeta: InstrumentHelpers.getTracksAndMetaFromParsedMidi(jsonParsedMidi) }))
  .then(result => ({ input: result.jsonParsedMidi, output: result.tracksAndMeta }));
};

const getTracksAndMetaFromUrlTest = () => {
  return InstrumentHelpers.getTracksAndMetaFromUrl(url)
  .then(tracksAndMeta => (
    { input: url, output: tracksAndMeta }
  ));
};

const getScaleNotesTest = () => {
  const note = 'A';
  const scale = 'aeolian';
  const startOctave = 3;
  const count = 3;
  const scaleNotes = InstrumentHelpers.getScaleNotes(note, scale, startOctave, count);
  return { input: `(${note}, ${scale}, ${startOctave}, ${count})`, output: scaleNotes };
};

const updateTempoTest = () =>
  InstrumentHelpers.getTracksAndMetaFromUrl(url).then((tracksAndMeta) => {
    const BPM = 10;
    const trackIndex = 1;
    const updatedTracksAndMeta = InstrumentHelpers.updateTempo(tracksAndMeta, BPM, trackIndex);
    return { input: { tracksAndMeta, BPM, trackIndex }, output: updatedTracksAndMeta };
  })
;

```


### Classes
