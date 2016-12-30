/* eslint-env node, mocha */

import expect from 'expect';
import Note from 'src/Note';

window.delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let instruments;

describe('Note test', function () {
  this.timeout(25000);

  it('can say Hi because it\'s polite', () => {
    console.log('Hi');
  });

  it('can create note with no arguments', () => {
    const stringifiedNote = '{"payload":{"name":"A3","noteNumber":-1,"gain":1,"instrumentName":"acoustic_grand_piano","startTimeInMS":0,"durationInMS":100,"endTimeInMS":100,"fadeDurationInMS":1000,"deltaTime":0,"msPerTick":0,"id":"acoustic_grand_piano_A3"}}';
    const expectedNotePayload = {
      name: 'A3',
      noteNumber: -1,
      gain: 1,
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 100,
      endTimeInMS: 100,
      fadeDurationInMS: 1000,
      deltaTime: 0,
      msPerTick: 0,
      id: 'acoustic_grand_piano_A3',
    };
    const note = new Note();
    // expect(JSON.stringify(note)).toEqual(stringifiedNote);
    expect(note.payload).toEqual(expectedNotePayload);
  });
  it('can create note from object', () => {
    const expectedNotePayload = {
      name: 'C3',
      noteNumber: 22,
      gain: 3,
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 200,
      endTimeInMS: 200,
      fadeDurationInMS: 500,
      deltaTime: 22,
      msPerTick: 100,
      id: '122asdsadasd_asd',
    };
    const note = new Note(expectedNotePayload);
    expect(note.payload).toEqual(expectedNotePayload);
  });

  it('can change note instrument', () => {
    const expectedNotePayload = {
      name: 'A3',
      noteNumber: -1,
      gain: 1,
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 100,
      endTimeInMS: 100,
      fadeDurationInMS: 1000,
      deltaTime: 0,
      msPerTick: 0,
      id: 'acoustic_grand_piano_A3',
    };
    const note = new Note();
    expect(note.payload).toEqual(expectedNotePayload);

    const newInstrumentName = 'alto_sax';
    note.setInstrument(newInstrumentName);
    const newExpectedNotePayload = Object.assign(
      {},
      expectedNotePayload,
      {
        instrumentName: newInstrumentName,
      }
    );
    expect(note.payload).toEqual(newExpectedNotePayload);
  });

  it('can change note by passing new payload objects', () => {
    const note = new Note();

    const instrumentName = 'alto_sax';
    const gain = 5;
    note.update({
      instrumentName,
      gain,
    });
    expect(note.payload.instrumentName).toEqual(instrumentName);
    expect(note.payload.gain).toEqual(gain);
  });
});
