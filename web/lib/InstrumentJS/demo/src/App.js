'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib/');

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

require('./App.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import JSONPretty from 'react-json-pretty';

var url = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
var instrument = new _lib.Instrument();

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
  var notes = [new _lib.Note({ name: 'A3' }), new _lib.Note({ name: 'C3' }), new _lib.Note({ name: 'A3' }), new _lib.Note({ name: 'B3' }), new _lib.Note({ name: 'C3' })];
  var uniqueNoteNames = _lib.InstrumentHelpers.getUniqueNoteNames(notes);
  return { input: notes, output: uniqueNoteNames };
};
var getUniqueNoteNamesNoOctaveTest = function getUniqueNoteNamesNoOctaveTest() {
  var notes = [new _lib.Note({ name: 'A3' }), new _lib.Note({ name: 'C3' }), new _lib.Note({ name: 'A3' }), new _lib.Note({ name: 'B3' }), new _lib.Note({ name: 'C3' })];
  var uniqueNoteNamesNoOctave = _lib.InstrumentHelpers.getUniqueNoteNamesNoOctave(notes);
  return { input: notes, output: uniqueNoteNamesNoOctave };
};
var removeOctaveFromNoteNameTest = function removeOctaveFromNoteNameTest() {
  var noteNameNoOctave = _lib.InstrumentHelpers.removeOctaveFromNoteName('A3');
  return { input: 'A3', output: noteNameNoOctave };
};
var addOctaveToNoteNameTest = function addOctaveToNoteNameTest() {
  var noteName = _lib.InstrumentHelpers.addOctaveToNoteName('A', 3);
  return { input: '(A, 3)', output: noteName };
};
var getIntervalTest = function getIntervalTest() {
  var noteNameOne = 'C';
  var noteNameTwo = 'B';
  var interval = _lib.InstrumentHelpers.getInterval(noteNameTwo, noteNameOne);
  return { input: "('C', 'B')", output: interval };
};
var getIntervalPermutationsFromNoteNamesTest = function getIntervalPermutationsFromNoteNamesTest() {
  var noteNamesNoOctave = ['A', 'B', 'C'];
  var permutations = _lib.InstrumentHelpers.getIntervalPermutationsFromNoteNames(noteNamesNoOctave);
  return { input: noteNamesNoOctave, output: permutations };
};
var getScalesFromNoteNamesTest = function getScalesFromNoteNamesTest() {
  var noteNames = ['A3', 'B3', 'C3'];
  var permutations = _lib.InstrumentHelpers.getScalesFromNoteNames(noteNames);
  return { input: noteNames, output: permutations };
};
var getNoteNamesFromIntervalsTest = function getNoteNamesFromIntervalsTest() {
  var firstNoteName = 'A3';
  var intervals = [0, 2, 4];
  var noteNames = _lib.InstrumentHelpers.getNoteNamesFromIntervals(firstNoteName, intervals);
  return { input: '(' + firstNoteName + ', ' + (0, _stringify2.default)(intervals) + ')', output: noteNames };
  // console.log('getNoteNamesFromIntervals');
};
var getNoteNamesFromChordNameTest = function getNoteNamesFromChordNameTest() {
  var firstNoteName = 'A3';
  var chordName = 'min';
  var noteNames = _lib.InstrumentHelpers.getNoteNamesFromChordName('A3', 'min');
  return { input: '(' + firstNoteName + ', ' + chordName + ')', output: noteNames };
};
var getJSONFromMidiURLTest = function getJSONFromMidiURLTest() {
  return _lib.InstrumentHelpers.getJSONFromMidiURL(url).then(function (output) {
    return { input: url, output: output };
  });
};
var getTracksAndMetaFromParsedMidiTest = function getTracksAndMetaFromParsedMidiTest() {
  return _lib.InstrumentHelpers.getJSONFromMidiURL(url).then(function (jsonParsedMidi) {
    return { jsonParsedMidi: jsonParsedMidi, tracksAndMeta: _lib.InstrumentHelpers.getTracksAndMetaFromParsedMidi(jsonParsedMidi) };
  }).then(function (result) {
    return { input: result.jsonParsedMidi, output: result.tracksAndMeta };
  });
};
var getTracksAndMetaFromUrlTest = function getTracksAndMetaFromUrlTest() {
  return _lib.InstrumentHelpers.getTracksAndMetaFromUrl(url).then(function (tracksAndMeta) {
    return { input: url, output: tracksAndMeta };
  });
};
var getScaleNotesTest = function getScaleNotesTest() {
  var note = 'A';
  var scale = 'aeolian';
  var startOctave = 3;
  var count = 3;
  var scaleNotes = _lib.InstrumentHelpers.getScaleNotes(note, scale, startOctave, count);
  return { input: '(' + note + ', ' + scale + ', ' + startOctave + ', ' + count + ')', output: scaleNotes };
};
var updateTempoTest = function updateTempoTest() {
  return _lib.InstrumentHelpers.getTracksAndMetaFromUrl(url).then(function (tracksAndMeta) {
    var BPM = 10;
    var trackIndex = 1;
    var updatedTracksAndMeta = _lib.InstrumentHelpers.updateTempo(tracksAndMeta, BPM, trackIndex);
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
  var note = new _lib.Note();
  return instrument.startPlayingNote(note).then(function (output) {
    return { input: note, output: output };
  });
};
var instrument_stopPlayingNoteTest = function instrument_stopPlayingNoteTest() {
  var note = new _lib.Note();
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
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      currentTest: 'getUniqueNoteNames',
      testResult: getUniqueNoteNamesTest()
    };
    return _this;
  }

  App.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      { className: 'App' },
      _react2.default.createElement(
        'div',
        { className: 'App-header' },
        _react2.default.createElement(
          'h2',
          null,
          'InstrumentJS demo'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'logger' },
          _react2.default.createElement(
            'h3',
            null,
            'Logger'
          ),
          _react2.default.createElement(_reactJsonTree2.default, { data: this.state.testResult, theme: theme, isLightTheme: false })
        ),
        _react2.default.createElement(
          'div',
          { className: 'test-links' },
          _react2.default.createElement(
            'h3',
            null,
            'Instrument Helpers '
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getUniqueNoteNames' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getUniqueNoteNames', testResult: getUniqueNoteNamesTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getUniqueNoteNames'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getUniqueNoteNamesNoOctaveTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getUniqueNoteNamesNoOctaveTest', testResult: getUniqueNoteNamesNoOctaveTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getUniqueNoteNamesNoOctave'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'removeOctaveFromNoteNameTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'removeOctaveFromNoteNameTest', testResult: removeOctaveFromNoteNameTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'removeOctaveFromNoteName'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'addOctaveToNoteNameTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'addOctaveToNoteNameTest', testResult: addOctaveToNoteNameTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'addOctaveToNoteName'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getIntervalTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getIntervalTest', testResult: getIntervalTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getInterval'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getIntervalPermutationsFromNoteNamesTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getIntervalPermutationsFromNoteNamesTest', testResult: getIntervalPermutationsFromNoteNamesTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getIntervalPermutationsFromNoteNames'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getScalesFromNoteNamesTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getScalesFromNoteNamesTest', testResult: getScalesFromNoteNamesTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getScalesFromNoteNames'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getNoteNamesFromIntervalsTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getNoteNamesFromIntervalsTest', testResult: getNoteNamesFromIntervalsTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getNoteNamesFromIntervals'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getNoteNamesFromChordNameTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getNoteNamesFromChordNameTest', testResult: getNoteNamesFromChordNameTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getNoteNamesFromChordName'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getJSONFromMidiURLTest' ? 'clicked' : '', onClick: function onClick() {
                getJSONFromMidiURLTest().then(function (output) {
                  return _this2.setState({ currentTest: 'getJSONFromMidiURLTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getJSONFromMidiURL'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getTracksAndMetaFromParsedMidiTest' ? 'clicked' : '', onClick: function onClick() {
                getTracksAndMetaFromParsedMidiTest().then(function (output) {
                  return _this2.setState({ currentTest: 'getTracksAndMetaFromParsedMidiTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getTracksAndMetaFromParsedMidi'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getTracksAndMetaFromUrlTest' ? 'clicked' : '', onClick: function onClick() {
                getTracksAndMetaFromUrlTest().then(function (output) {
                  return _this2.setState({ currentTest: 'getTracksAndMetaFromUrlTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getTracksAndMetaFromUrl'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'getScaleNotesTest' ? 'clicked' : '', onClick: function onClick() {
                return _this2.setState({ currentTest: 'getScaleNotesTest', testResult: getScaleNotesTest() });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'getScaleNotes'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'updateTempoTest' ? 'clicked' : '', onClick: function onClick() {
                updateTempoTest().then(function (output) {
                  return _this2.setState({ currentTest: 'updateTempoTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'updateTempo'
            )
          ),
          _react2.default.createElement(
            'h3',
            null,
            'Instrument '
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_getTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_getTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrumet_getTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'instrument.get(instrumentName)'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_startPlayingNoteTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_startPlayingNoteTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_startPlayingNoteTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'instrument.startPlayingNote(note)'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_stopPlayingNoteTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_stopPlayingNoteTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_stopPlayingNoteTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'instrument.stopPlayingNote(note)'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_startPlayingChordByNoteNamesTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_startPlayingChordByNoteNamesTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_startPlayingChordByNoteNamesTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'instrument.startPlayingChordByNoteNames(noteNames, noteSettings)'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_stopPlayingChordByNoteNamesTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_stopPlayingChordByNoteNamesTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_stopPlayingChordByNoteNamesTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'instrument.stopPlayingChordByNoteNames(noteNames, noteSettings)'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_startPlayingChordByChordNameTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_startPlayingChordByChordNameTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_startPlayingChordByChordNameTest', testResult: output });
                });
              } },
            _react2.default.createElement(
              'h5',
              null,
              'instrument.startPlayingChordByChordName(firstNoteName, chordName, noteSettings)'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: this.state.currentTest === 'instrument_stopPlayingChordByChordNameTest' ? 'clicked' : '', onClick: function onClick() {
                instrument_stopPlayingChordByChordNameTest().then(function (output) {
                  return _this2.setState({ currentTest: 'instrument_stopPlayingChordByChordNameTest', testResult: output });
                });
              } },
            _react2.default.createElement(
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
}(_react.Component);

exports.default = App;
module.exports = exports['default'];