import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import React, { Component } from 'react';
import { Note, InstrumentHelpers, Instrument } from '../../lib/';
import JSONTree from 'react-json-tree';
import './App.css';
// import JSONPretty from 'react-json-pretty';

var url = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
var instrument = new Instrument();

var theme = {
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
  base0F: '#cc6633'
};

var getUniqueNoteNamesTest = function getUniqueNoteNamesTest() {
  var notes = [new Note({ name: 'A3' }), new Note({ name: 'C3' }), new Note({ name: 'A3' }), new Note({ name: 'B3' }), new Note({ name: 'C3' })];
  var uniqueNoteNames = InstrumentHelpers.getUniqueNoteNames(notes);
  return { input: notes, output: uniqueNoteNames };
};
var getUniqueNoteNamesNoOctaveTest = function getUniqueNoteNamesNoOctaveTest() {
  var notes = [new Note({ name: 'A3' }), new Note({ name: 'C3' }), new Note({ name: 'A3' }), new Note({ name: 'B3' }), new Note({ name: 'C3' })];
  var uniqueNoteNamesNoOctave = InstrumentHelpers.getUniqueNoteNamesNoOctave(notes);
  return { input: notes, output: uniqueNoteNamesNoOctave };
};
var removeOctaveFromNoteNameTest = function removeOctaveFromNoteNameTest() {
  var noteNameNoOctave = InstrumentHelpers.removeOctaveFromNoteName('A3');
  return { input: 'A3', output: noteNameNoOctave };
};
var addOctaveToNoteNameTest = function addOctaveToNoteNameTest() {
  var noteName = InstrumentHelpers.addOctaveToNoteName('A', 3);
  return { input: '(A, 3)', output: noteName };
};
var getIntervalTest = function getIntervalTest() {
  var noteNameOne = 'C';
  var noteNameTwo = 'B';
  var interval = InstrumentHelpers.getInterval(noteNameTwo, noteNameOne);
  return { input: "('C', 'B')", output: interval };
};
var getIntervalPermutationsFromNoteNamesTest = function getIntervalPermutationsFromNoteNamesTest() {
  var noteNamesNoOctave = ['A', 'B', 'C'];
  var permutations = InstrumentHelpers.getIntervalPermutationsFromNoteNames(noteNamesNoOctave);
  return { input: noteNamesNoOctave, output: permutations };
};
var getScalesFromNoteNamesTest = function getScalesFromNoteNamesTest() {
  var noteNames = ['A3', 'B3', 'C3'];
  var permutations = InstrumentHelpers.getScalesFromNoteNames(noteNames);
  return { input: noteNames, output: permutations };
};
var getNoteNamesFromIntervalsTest = function getNoteNamesFromIntervalsTest() {
  var firstNoteName = 'A3';
  var intervals = [0, 2, 4];
  var noteNames = InstrumentHelpers.getNoteNamesFromIntervals(firstNoteName, intervals);
  return { input: '(' + firstNoteName + ', ' + _JSON$stringify(intervals) + ')', output: noteNames };
  // console.log('getNoteNamesFromIntervals');
};
var getNoteNamesFromChordNameTest = function getNoteNamesFromChordNameTest() {
  var firstNoteName = 'A3';
  var chordName = 'min';
  var noteNames = InstrumentHelpers.getNoteNamesFromChordName('A3', 'min');
  return { input: '(' + firstNoteName + ', ' + chordName + ')', output: noteNames };
};
var getJSONFromMidiURLTest = function getJSONFromMidiURLTest() {
  return InstrumentHelpers.getJSONFromMidiURL(url).then(function (output) {
    return { input: url, output: output };
  });
};
var getTracksAndMetaFromParsedMidiTest = function getTracksAndMetaFromParsedMidiTest() {
  return InstrumentHelpers.getJSONFromMidiURL(url).then(function (jsonParsedMidi) {
    return { jsonParsedMidi: jsonParsedMidi, tracksAndMeta: InstrumentHelpers.getTracksAndMetaFromParsedMidi(jsonParsedMidi) };
  }).then(function (result) {
    return { input: result.jsonParsedMidi, output: result.tracksAndMeta };
  });
};
var getTracksAndMetaFromUrlTest = function getTracksAndMetaFromUrlTest() {
  return InstrumentHelpers.getTracksAndMetaFromUrl(url).then(function (tracksAndMeta) {
    return { input: url, output: tracksAndMeta };
  });
};
var getScaleNotesTest = function getScaleNotesTest() {
  var note = 'A';
  var scale = 'aeolian';
  var startOctave = 3;
  var count = 3;
  var scaleNotes = InstrumentHelpers.getScaleNotes(note, scale, startOctave, count);
  return { input: '(' + note + ', ' + scale + ', ' + startOctave + ', ' + count + ')', output: scaleNotes };
};
var updateTempoTest = function updateTempoTest() {
  return InstrumentHelpers.getTracksAndMetaFromUrl(url).then(function (tracksAndMeta) {
    var BPM = 10;
    var trackIndex = 1;
    var updatedTracksAndMeta = InstrumentHelpers.updateTempo(tracksAndMeta, BPM, trackIndex);
    return { input: { tracksAndMeta: tracksAndMeta, BPM: BPM, trackIndex: trackIndex }, output: updatedTracksAndMeta };
  });
};

var instrument_getTest = function instrument_getTest() {
  var instrumentName = 'acoustic_grand_piano';
  return instrument.get(instrumentName).then(function (instrumentPromise) {
    return { input: instrumentName, output: instrumentPromise };
  });
};

var instrument_startPlayingNoteTest = function instrument_startPlayingNoteTest() {
  var note = new Note();
  return instrument.startPlayingNote(note).then(function (output) {
    return { input: note, output: output };
  });
};
var instrument_stopPlayingNoteTest = function instrument_stopPlayingNoteTest() {
  var note = new Note();
  return instrument.stopPlayingNote(note).then(function (output) {
    return { input: note, output: output };
  });
};

var instrument_startPlayingChordByNoteNamesTest = function instrument_startPlayingChordByNoteNamesTest() {
  var noteSettings = {
    instrumentName: 'acoustic_grand_piano',
    startTimeInMS: 0,
    durationInMS: 5000,
    endTimeInMS: 5000,
    fadeDurationInMS: 0
  };
  var noteNames = ['A3', 'C3', 'E3'];
  return instrument.startPlayingChordByNoteNames(noteNames, noteSettings).then(function (output) {
    return { input: { noteNames: noteNames, noteSettings: noteSettings }, output: output };
  });
};
var instrument_stopPlayingChordByNoteNamesTest = function instrument_stopPlayingChordByNoteNamesTest() {
  var noteSettings = {
    instrumentName: 'acoustic_grand_piano',
    startTimeInMS: 0,
    durationInMS: 2000,
    endTimeInMS: 2000
  };
  var noteNames = ['A3', 'C3', 'E3'];
  return instrument.stopPlayingChordByNoteNames(noteNames, noteSettings).then(function (output) {
    return { input: { noteNames: noteNames, noteSettings: noteSettings }, output: output };
  });
};

var instrument_startPlayingChordByChordNameTest = function instrument_startPlayingChordByChordNameTest() {
  var noteSettings = {
    instrumentName: 'acoustic_grand_piano',
    startTimeInMS: 0,
    durationInMS: 2000,
    endTimeInMS: 2000
  };
  var firstNoteName = 'A3';
  var chordName = 'maj';
  // const noteNames = ['A3', 'C3', 'E3'];
  return instrument.startPlayingChordByChordName(firstNoteName, chordName, noteSettings).then(function (output) {
    return { input: { firstNoteName: firstNoteName, chordName: chordName }, output: output };
  });
};

var instrument_stopPlayingChordByChordNameTest = function instrument_stopPlayingChordByChordNameTest() {
  var noteSettings = {
    instrumentName: 'acoustic_grand_piano',
    startTimeInMS: 0,
    durationInMS: 2000,
    endTimeInMS: 2000
  };
  var firstNoteName = 'A3';
  var chordName = 'maj';
  // const noteNames = ['A3', 'C3', 'E3'];
  return instrument.stopPlayingChordByChordName(firstNoteName, chordName, noteSettings).then(function (output) {
    return { input: { firstNoteName: firstNoteName, chordName: chordName }, output: output };
  });
};

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      currentTest: 'getUniqueNoteNames',
      testResult: getUniqueNoteNamesTest()
    };
    return _this;
  }

  App.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement(
        'div',
        { className: 'App-header' },
        React.createElement(
          'h2',
          null,
          'InstrumentJS demo'
        )
      ),
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'logger' },
          React.createElement(
            'h3',
            null,
            'Logger'
          ),
          React.createElement(JSONTree, { data: this.state.testResult, theme: theme, isLightTheme: false })
        ),
        React.createElement(
          'div',
          { className: 'test-links' },
          React.createElement(
            'h3',
            null,
            'Instrument Helpers '
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getUniqueNoteNames' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getUniqueNoteNames', testResult: getUniqueNoteNamesTest() });
              } },
            React.createElement(
              'h5',
              null,
              'getUniqueNoteNames'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getUniqueNoteNamesNoOctaveTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getUniqueNoteNamesNoOctaveTest', testResult: getUniqueNoteNamesNoOctaveTest() });
              } },
            React.createElement(
              'h5',
              null,
              'getUniqueNoteNamesNoOctave'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'removeOctaveFromNoteNameTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'removeOctaveFromNoteNameTest', testResult: removeOctaveFromNoteNameTest() });
              } },
            React.createElement(
              'h5',
              null,
              'removeOctaveFromNoteName'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'addOctaveToNoteNameTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'addOctaveToNoteNameTest', testResult: addOctaveToNoteNameTest() });
              } },
            React.createElement(
              'h5',
              null,
              'addOctaveToNoteName'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getIntervalTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getIntervalTest', testResult: getIntervalTest() });
              } },
            React.createElement(
              'h5',
              null,
              'getInterval'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getIntervalPermutationsFromNoteNamesTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getIntervalPermutationsFromNoteNamesTest', testResult: getIntervalPermutationsFromNoteNamesTest() });
              } },
            React.createElement(
              'h5',
              null,
              'getIntervalPermutationsFromNoteNames'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getScalesFromNoteNamesTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getScalesFromNoteNamesTest', testResult: getScalesFromNoteNamesTest() });
              } },
            React.createElement(
              'h5',
              null,
              'getScalesFromNoteNames'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getNoteNamesFromIntervalsTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getNoteNamesFromIntervalsTest', testResult: getNoteNamesFromIntervalsTest() });
              } },
            React.createElement(
              'h5',
              null,
              'getNoteNamesFromIntervals'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getNoteNamesFromChordNameTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getNoteNamesFromChordNameTest', testResult: getNoteNamesFromChordNameTest() });
              } },
            React.createElement(
              'h5',
              null,
              'getNoteNamesFromChordName'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getJSONFromMidiURLTest' ? 'clicked' : '', onClick: function onClick() {
                getJSONFromMidiURLTest().then(function (output) {
                  return _this2.setState({ currentTest: 'getJSONFromMidiURLTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'getJSONFromMidiURL'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getTracksAndMetaFromParsedMidiTest' ? 'clicked' : '', onClick: function onClick() {
                getTracksAndMetaFromParsedMidiTest().then(function (output) {
                  return _this2.setState({ currentTest: 'getTracksAndMetaFromParsedMidiTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'getTracksAndMetaFromParsedMidi'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getTracksAndMetaFromUrlTest' ? 'clicked' : '', onClick: function onClick() {
                getTracksAndMetaFromUrlTest().then(function (output) {
                  return _this2.setState({ currentTest: 'getTracksAndMetaFromUrlTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'getTracksAndMetaFromUrl'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'getScaleNotesTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getScaleNotesTest', testResult: getScaleNotesTest() });
              } },
            React.createElement(
              'h5',
              null,
              'getScaleNotes'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'updateTempoTest' ? 'clicked' : '', onClick: function onClick() {
                updateTempoTest().then(function (output) {
                  return _this2.setState({ currentTest: 'updateTempoTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'updateTempo'
            )
          ),
          React.createElement(
            'h3',
            null,
            'Instrument '
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_getTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_getTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrumet_getTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'instrument.get(instrumentName)'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_startPlayingNoteTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_startPlayingNoteTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_startPlayingNoteTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'instrument.startPlayingNote(note)'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_stopPlayingNoteTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_stopPlayingNoteTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_stopPlayingNoteTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'instrument.stopPlayingNote(note)'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_startPlayingChordByNoteNamesTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_startPlayingChordByNoteNamesTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_startPlayingChordByNoteNamesTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'instrument.startPlayingChordByNoteNames(noteNames, noteSettings)'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_stopPlayingChordByNoteNamesTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_stopPlayingChordByNoteNamesTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_stopPlayingChordByNoteNamesTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'instrument.stopPlayingChordByNoteNames(noteNames, noteSettings)'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_startPlayingChordByChordNameTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_startPlayingChordByChordNameTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_startPlayingChordByChordNameTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'instrument.startPlayingChordByChordName(firstNoteName, chordName, noteSettings)'
            )
          ),
          React.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_stopPlayingChordByChordNameTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_stopPlayingChordByChordNameTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_stopPlayingChordByChordNameTest', testResult: output });
                });
              } },
            React.createElement(
              'h5',
              null,
              'instrument.stopPlayingChordByChordName(firstNoteName, chordName, noteSettings)'
            )
          )
        )
      )
    );
  };

  return App;
}(Component);

export default App;