import React, { Component } from 'react';
import { Note, InstrumentHelpers, Instrument } from '../../lib/';
import JSONTree from 'react-json-tree';
import './App.css';
// import JSONPretty from 'react-json-pretty';

const url = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
const instrument = new Instrument();

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

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

const instrument_getTest = () => {
  const instrumentName = 'acoustic_grand_piano';
  return instrument.get(instrumentName).then(instrumentPromise => ({ input: instrumentName, output: instrumentPromise }));
};

const instrument_startPlayingNoteTest = () => {
  const note = new Note();
  return instrument.startPlayingNote(note).then(output => ({ input: note, output }));
};
const instrument_stopPlayingNoteTest = () => {
  const note = new Note();
  return instrument.stopPlayingNote(note).then(output => ({ input: note, output }));
};

const instrument_startPlayingChordByNoteNamesTest = () => {
  const noteSettings = {
    instrumentName: 'acoustic_grand_piano',
    startTimeInMS: 0,
    durationInMS: 5000,
    endTimeInMS: 5000,
    fadeDurationInMS:0,
  };
  const noteNames = ['A3', 'C3', 'E3'];
  return instrument.startPlayingChordByNoteNames(noteNames,
    noteSettings
  ).then(output => ({ input: { noteNames, noteSettings }, output }));
};
const instrument_stopPlayingChordByNoteNamesTest = () => {
  const noteSettings = {
    instrumentName: 'acoustic_grand_piano',
    startTimeInMS: 0,
    durationInMS: 2000,
    endTimeInMS: 2000,
  };
  const noteNames = ['A3', 'C3', 'E3'];
  return instrument.stopPlayingChordByNoteNames(noteNames,
    noteSettings
  ).then(output => ({ input: { noteNames, noteSettings }, output }));
};

const instrument_startPlayingChordByChordNameTest = () => {
  const noteSettings = {
    instrumentName: 'acoustic_grand_piano',
    startTimeInMS: 0,
    durationInMS: 2000,
    endTimeInMS: 2000,
  };
  const firstNoteName = 'A3';
  const chordName = 'maj';
  // const noteNames = ['A3', 'C3', 'E3'];
  return instrument.startPlayingChordByChordName(firstNoteName, chordName, noteSettings)
  .then(output => ({ input: { firstNoteName, chordName }, output }));
};

const instrument_stopPlayingChordByChordNameTest = () => {
  const noteSettings = {
    instrumentName: 'acoustic_grand_piano',
    startTimeInMS: 0,
    durationInMS: 2000,
    endTimeInMS: 2000,
  };
  const firstNoteName = 'A3';
  const chordName = 'maj';
  // const noteNames = ['A3', 'C3', 'E3'];
  return instrument.stopPlayingChordByChordName(firstNoteName, chordName, noteSettings)
  .then(output => ({ input: { firstNoteName, chordName }, output }));
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTest: 'getUniqueNoteNames',
      testResult: getUniqueNoteNamesTest(),
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>InstrumentJS demo</h2>
        </div>
        <div className="container">
          <div className="logger">
            <h3>Logger</h3>
            <JSONTree data={this.state.testResult} theme={theme} isLightTheme={false} />
          </div>
          <div className="test-links">
            <h3>Instrument Helpers </h3>
            <a className={this.state.currentTest === 'getUniqueNoteNames' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'getUniqueNoteNames', testResult: getUniqueNoteNamesTest() })} ><h5>getUniqueNoteNames</h5></a>

            <a className={(this.state.currentTest === 'getUniqueNoteNamesNoOctaveTest') ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'getUniqueNoteNamesNoOctaveTest', testResult: getUniqueNoteNamesNoOctaveTest() })} ><h5>getUniqueNoteNamesNoOctave</h5></a>
            <a className={this.state.currentTest === 'removeOctaveFromNoteNameTest' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'removeOctaveFromNoteNameTest', testResult: removeOctaveFromNoteNameTest() })} ><h5>removeOctaveFromNoteName</h5></a>
            <a className={this.state.currentTest === 'addOctaveToNoteNameTest' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'addOctaveToNoteNameTest', testResult: addOctaveToNoteNameTest() })} ><h5>addOctaveToNoteName</h5></a>
            <a className={this.state.currentTest === 'getIntervalTest' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'getIntervalTest', testResult: getIntervalTest() })} ><h5>getInterval</h5></a>
            <a className={this.state.currentTest === 'getIntervalPermutationsFromNoteNamesTest' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'getIntervalPermutationsFromNoteNamesTest', testResult: getIntervalPermutationsFromNoteNamesTest() })} ><h5>getIntervalPermutationsFromNoteNames</h5></a>
            <a className={this.state.currentTest === 'getScalesFromNoteNamesTest' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'getScalesFromNoteNamesTest', testResult: getScalesFromNoteNamesTest() })}><h5>getScalesFromNoteNames</h5></a>
            <a className={this.state.currentTest === 'getNoteNamesFromIntervalsTest' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'getNoteNamesFromIntervalsTest', testResult: getNoteNamesFromIntervalsTest() })}><h5>getNoteNamesFromIntervals</h5></a>
            <a className={this.state.currentTest === 'getNoteNamesFromChordNameTest' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'getNoteNamesFromChordNameTest', testResult: getNoteNamesFromChordNameTest() })} >
              <h5>getNoteNamesFromChordName</h5></a>
            <a className={this.state.currentTest === 'getJSONFromMidiURLTest' ? 'clicked' : ''} onClick={() => { getJSONFromMidiURLTest().then(output => this.setState({ currentTest: 'getJSONFromMidiURLTest', testResult: output })); }}>
              <h5>getJSONFromMidiURL</h5>
            </a>
            <a className={this.state.currentTest === 'getTracksAndMetaFromParsedMidiTest' ? 'clicked' : ''} onClick={() => { getTracksAndMetaFromParsedMidiTest().then(output => this.setState({ currentTest: 'getTracksAndMetaFromParsedMidiTest', testResult: output })); }}>
              <h5>getTracksAndMetaFromParsedMidi</h5>
            </a>
            <a className={this.state.currentTest === 'getTracksAndMetaFromUrlTest' ? 'clicked' : ''} onClick={() => { getTracksAndMetaFromUrlTest().then(output => this.setState({ currentTest: 'getTracksAndMetaFromUrlTest', testResult: output })); }}>
              <h5>getTracksAndMetaFromUrl</h5>
            </a>
            <a className={this.state.currentTest === 'getScaleNotesTest' ? 'clicked' : ''} onClick={() => this.setState({ currentTest: 'getScaleNotesTest', testResult: getScaleNotesTest() })} >
              <h5>getScaleNotes</h5>
            </a>
            <a className={this.state.currentTest === 'updateTempoTest' ? 'clicked' : ''} onClick={() => { updateTempoTest().then(output => this.setState({ currentTest: 'updateTempoTest', testResult: output })); }}>
              <h5>updateTempo</h5>
            </a>
            <h3>Instrument </h3>
            <a className={this.state.currentTest === 'instrument_getTest' ? 'clicked' : ''} onClick={() => { instrument_getTest().then(output => this.setState({ currentTest: 'instrumet_getTest', testResult: output })); }}>
              <h5>instrument.get(instrumentName)</h5>
            </a>
            <a className={this.state.currentTest === 'instrument_startPlayingNoteTest' ? 'clicked' : ''} onClick={() => { instrument_startPlayingNoteTest().then(output => this.setState({ currentTest: 'instrument_startPlayingNoteTest', testResult: output })); }}>
              <h5>instrument.startPlayingNote(note)</h5>
            </a>
            <a className={this.state.currentTest === 'instrument_stopPlayingNoteTest' ? 'clicked' : ''} onClick={() => { instrument_stopPlayingNoteTest().then(output => this.setState({ currentTest: 'instrument_stopPlayingNoteTest', testResult: output })); }}>
              <h5>instrument.stopPlayingNote(note)</h5>
            </a>
            <a className={this.state.currentTest === 'instrument_startPlayingChordByNoteNamesTest' ? 'clicked' : ''} onClick={() => { instrument_startPlayingChordByNoteNamesTest().then(output => this.setState({ currentTest: 'instrument_startPlayingChordByNoteNamesTest', testResult: output })); }}>
              <h5>instrument.startPlayingChordByNoteNames(noteNames, noteSettings)</h5>
            </a>
            <a className={this.state.currentTest === 'instrument_stopPlayingChordByNoteNamesTest' ? 'clicked' : ''} onClick={() => { instrument_stopPlayingChordByNoteNamesTest().then(output => this.setState({ currentTest: 'instrument_stopPlayingChordByNoteNamesTest', testResult: output })); }}>
              <h5>instrument.stopPlayingChordByNoteNames(noteNames, noteSettings)</h5>
            </a>
            <a className={this.state.currentTest === 'instrument_startPlayingChordByChordNameTest' ? 'clicked' : ''} onClick={() => { instrument_startPlayingChordByChordNameTest().then(output => this.setState({ currentTest: 'instrument_startPlayingChordByChordNameTest', testResult: output })); }}>
              <h5>instrument.startPlayingChordByChordName(firstNoteName, chordName, noteSettings)</h5>
            </a>
            <a className={this.state.currentTest === 'instrument_stopPlayingChordByChordNameTest' ? 'clicked' : ''} onClick={() => { instrument_stopPlayingChordByChordNameTest().then(output => this.setState({ currentTest: 'instrument_stopPlayingChordByChordNameTest', testResult: output })); }}>
              <h5>instrument.stopPlayingChordByChordName(firstNoteName, chordName, noteSettings)</h5>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
