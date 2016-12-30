// /* eslint-env node, mocha */

import expect from 'expect';
import {
  getUniqueNoteNames,
  getUniqueNoteNamesNoOctave,
  removeOctaveFromNoteName,
  addOctaveToNoteName,
  getInterval,
  getIntervalPermutationsFromNoteNames,
  getScalesFromNoteNames,
  getNoteNamesFromIntervals,
  getNoteNamesFromChordName,
  getJSONFromMidiURL,
  getTracksAndMetaFromParsedMidi,
  getTracksAndMetaFromUrl,
  getScaleNotes,
  updateTempo,
} from 'src/helpers/';

import Note from 'src/Note';

describe('Helpers test', function () {
  this.timeout(25000);
  it('can getUniqueNoteNames(notes)', () => {
    const notes = [
      new Note({ name: 'A3' }),
      new Note({ name: 'C3' }),
      new Note({ name: 'A3' }),
      new Note({ name: 'B3' }),
      new Note({ name: 'C3' }),
    ];
    const uniqueNoteNames = getUniqueNoteNames(notes);
    expect(uniqueNoteNames).toEqual(['A3', 'C3', 'B3']);
  });

  it('can getUniqueNoteNamesNoOctave(notes)', () => {
    const notes = [
      new Note({ name: 'A3' }),
      new Note({ name: 'C3' }),
      new Note({ name: 'A3' }),
      new Note({ name: 'B3' }),
      new Note({ name: 'C3' }),
    ];
    const uniqueNoteNamesNoOctave = getUniqueNoteNamesNoOctave(notes);
    expect(uniqueNoteNamesNoOctave).toEqual(['A', 'C', 'B']);
  });
  it('can removeOctaveFromNoteName(noteName)', () => {
    const noteNameNoOctave = removeOctaveFromNoteName('A3');
    expect(noteNameNoOctave).toEqual('A');
  });
  it('can addOctaveToNoteName(notes)', () => {
    const noteNameWithOctave = addOctaveToNoteName('A', 3);
    expect(noteNameWithOctave).toEqual('A3');
  });
  it('can getInterval(noteOne, noteTwo)', () => {
    const noteNameOne = 'C';
    const noteNameTwo = 'B';
    const interval = getInterval(noteNameTwo, noteNameOne);
    expect(interval).toEqual(1);
  });

  it('can getIntervalPermutationsFromNoteNames(noteNamesNoOctave)', () => {
    const noteNamesNoOctave = ['A', 'B', 'C'];
    const expectedPermutations = [
      { firstNoteName: 'A', intervals: [0, 2, 3], guessedScales: [] },
      { firstNoteName: 'B', intervals: [0, 1, 10], guessedScales: [] },
      { firstNoteName: 'C', intervals: [0, 9, 11], guessedScales: [] },
    ];
    const permutations = getIntervalPermutationsFromNoteNames(noteNamesNoOctave);
    expect(permutations).toEqual(expectedPermutations);
  });

  it('can getScalesFromNoteNames(noteNamesNoOctave)', () => {
    const noteNames = ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3']; // ["C3", "D3", "D#3", "F3", "G3", "G#3", "A#3"]; // ['A33', 'B3', 'C3'];
    const expectedPermutations = [
      { firstNoteName: 'A', intervals: [0, 9, 10], guessedScales: ['dorian', 'mixolydian', 'acoustic', 'algerian', 'majorBlues'] },
      { firstNoteName: 'B', intervals: [0, 2, 11], guessedScales: ['ionian', 'lydian', 'harmonicMinor', 'melodicMinorAsc'] },
      { firstNoteName: 'C', intervals: [0, 1, 3], guessedScales: ['phrygian', 'locrian', 'altered'] },
    ];
    const permutations = getScalesFromNoteNames(noteNames);
    console.log(JSON.stringify({ permutations }, 2, 2));
    // expect(permutations).toEqual(expectedPermutations);
  });

  // TODO : Fix this to account for intervals spanning multiple octaves.
  it('can getNoteNamesFromIntervals(firstNoteName, intervals, octave = 3)', () => {
    const noteNames = getNoteNamesFromIntervals('A3', [0, 2, 4]);
    expect(noteNames).toEqual(['A3', 'B3', 'C#3']);
  });
  it('can getNoteNamesFromChordName(firstNoteName, chordName)', () => {
    const noteNames = getNoteNamesFromChordName('A3', 'min'); // 'A3', [0, 2, 4]);
    expect(noteNames).toEqual(['A3', 'C3', 'E3']);
  });

  const url = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';

  it('can getJSONFromMidiURL(url)', () => {
    return getJSONFromMidiURL(url).then((jsonParsedMidi) => {
      expect(jsonParsedMidi.meta).toExist();
      expect(jsonParsedMidi.meta).toBeAn('object');
      expect(jsonParsedMidi.musicTracks).toExist();
      expect(jsonParsedMidi.musicTracks).toBeAn('array');
    });
  });

  it('can getTracksAndMetaFromParsedMidi(jsonMidi)', () => {
    return getJSONFromMidiURL(url).then((jsonParsedMidi) => {
      const tracksAndMeta = getTracksAndMetaFromParsedMidi(jsonParsedMidi);
      expect(tracksAndMeta.meta).toExist();
      expect(tracksAndMeta.meta).toBeAn('object');
      expect(tracksAndMeta.tracks).toExist();
      expect(tracksAndMeta.tracks).toBeAn('array');
    });
  });

  it('can getTracksAndMetaFromUrl(url)', () => {
    return getTracksAndMetaFromUrl(url).then((tracksAndMeta) => {
      expect(tracksAndMeta.meta).toExist();
      expect(tracksAndMeta.meta).toBeAn('object');
      expect(tracksAndMeta.tracks).toExist();
      expect(tracksAndMeta.tracks).toBeAn('array');
    });
  });

  it('can getScaleNotes(note, scale, startOctave, count)', () => {
    const note = 'A';
    const scale = 'aeolian';
    const startOctave = 3;
    const count = 3;
    const scaleNotes = getScaleNotes(note, scale, startOctave, count);
    expect(scaleNotes).toEqual(
      [
        'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4',
        'A5', 'B5', 'C6', 'D6', 'E6', 'F6', 'G6',
        'A7', 'B7', 'C8', 'D8', 'E8', 'F8', 'G8',
      ]
    );
  });
  it('can updateTempo(tracksAndMeta, BPM, trackIndex)', () => {
    expect(updateTempo).toBeA('function');
    return getTracksAndMetaFromUrl(url).then((tracksAndMeta) => {
      const BPM = 60;
      const trackIndex = 1;
      const updatedTracksAndMeta = updateTempo(tracksAndMeta, BPM, trackIndex);
      const updatedBPM = updatedTracksAndMeta.meta.BPM;
      expect(updatedTracksAndMeta.meta).toExist();
      expect(updatedTracksAndMeta.tracks).toExist();
      expect(updatedBPM).toEqual(BPM);
      expect(updatedTracksAndMeta.meta.millisecondsPerTick).toEqual(0.0010416666666666667);
    });
  });
});
