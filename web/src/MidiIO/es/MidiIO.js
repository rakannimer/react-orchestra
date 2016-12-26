var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import midiFileParser from 'midi-file-parser';
import MidiWriterJS from 'midi-writer-js';
import _ from 'lodash';

import INSTRUMENT_MIDI_MAPPING from './constants/INSTRUMENT_MIDI_MAPPING';

var minutesInMS = 60000000;

var MidiIO = function () {
  MidiIO.getWriter = function getWriter() {
    return MidiWriterJS;
  };

  MidiIO.getUniqueFromMidiNotes = function getUniqueFromMidiNotes(notes) {
    var set = new Set();
    notes.forEach(function (note) {
      set.add(note.payload.noteName);
    });
    return Array.from(set);
  };

  MidiIO.midiNoteNumberToName = function midiNoteNumberToName(midi) {
    var scaleIndexToNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var octave = Math.floor(midi / 12) - 1;
    var note = midi % 12;
    return scaleIndexToNote[note] + octave;
  };

  MidiIO.urlToJSON = function urlToJSON(midiURL) {
    return MidiIO.urlToBinaryString(midiURL).then(function (binaryStringMidi) {
      return MidiIO.binaryStringToJSON(binaryStringMidi);
    });
  };

  MidiIO.getAllMetadata = function getAllMetadata(parsedMidi, tracks) {
    var metaTrack = parsedMidi.tracks[0];
    var indexedMeta = metaTrack.reduce(function (prev, current, i) {
      var _Object$assign;

      var updated = Object.assign({}, prev, (_Object$assign = {}, _Object$assign[current.type + '_' + current.subtype] = current, _Object$assign));
      return updated;
    }, {});

    var meta_setTempo = indexedMeta.meta_setTempo;
    var meta_keySignature = indexedMeta.meta_keySignature;
    var meta_timeSignature = indexedMeta.meta_timeSignature;
    var meta_endOfTrack = indexedMeta.meta_endOfTrack;

    var ticksPerBeat = parsedMidi.header.ticksPerBeat;
    var microsecondsPerBeat = meta_setTempo.microsecondsPerBeat;

    var millisecondsPerTick = MidiIO.getMillisecondsPerTick(microsecondsPerBeat, ticksPerBeat);
    var tempo = meta_setTempo;
    var timeSignature = meta_timeSignature;
    var keySignature = meta_keySignature;
    var endOfTrack = meta_endOfTrack;
    var timeSignatureNumerator = timeSignature.numerator;
    var timeSignatureDenominator = timeSignature.denominator;
    var timeSignatureMetronome = timeSignature.metronome;
    var timeSignatureThirtyseconds = timeSignature.thirtyseconds;
    var instrumentNumbers = tracks.map(function (track) {
      return track.programChange[0].programNumber;
    }); // [0].programNumber
    var instrumentNames = instrumentNumbers.map(function (instrumentNumber) {
      return Object.keys(INSTRUMENT_MIDI_MAPPING).find(function (instrumentKey) {
        return INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber;
      });
    });

    var _MidiIO$getBPMData = MidiIO.getBPMData(microsecondsPerBeat, ticksPerBeat, timeSignature);

    var BPM = _MidiIO$getBPMData.BPM;


    var metaObject = {
      tempo: tempo,
      keySignature: keySignature,
      timeSignature: timeSignature,
      timeSignatureNumerator: timeSignatureNumerator,
      timeSignatureDenominator: timeSignatureDenominator,
      timeSignatureMetronome: timeSignatureMetronome,
      timeSignatureThirtyseconds: timeSignatureThirtyseconds,
      endOfTrack: endOfTrack,
      trackCount: tracks.length,
      microsecondsPerBeat: microsecondsPerBeat,
      instrumentNumbers: instrumentNumbers,
      instrumentNames: instrumentNames,
      millisecondsPerTick: millisecondsPerTick,
      ticksPerBeat: ticksPerBeat,
      BPM: BPM
    };
    return metaObject;
  };

  MidiIO.getAllTracks = function getAllTracks(parsedMidi) {
    var tracks = parsedMidi.tracks.filter(function (track, i) {
      return i >= 1;
    });

    var indexedTracks = tracks.map(function (track, i) {
      var indexedTrack = track.reduce(function (prev, current) {
        var currentIndex = current.type + '_' + current.subtype;
        var updated = Object.assign({}, prev);
        if (!updated[currentIndex]) {
          updated[currentIndex] = [];
        }
        updated[currentIndex].push(current);
        return updated;
      }, {});
      var instrumentNumber = indexedTrack.channel_programChange[0].programNumber;
      var instrumentName = Object.keys(INSTRUMENT_MIDI_MAPPING).find(function (instrumentKey) {
        return INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber;
      });
      return {
        controller: indexedTrack.channel_controller,
        programChange: indexedTrack.channel_programChange,
        trackname: indexedTrack.meta_trackName,
        noteOn: indexedTrack.channel_noteOn,
        noteOnValid: indexedTrack.channel_noteOn.filter(function (event) {
          return event.deltaTime > 0;
        }),
        noteOnInvalid: indexedTrack.channel_noteOn.filter(function (event) {
          return event.deltaTime === 0;
        }),
        noteOff: indexedTrack.channel_noteOff,
        endOfTrack: indexedTrack.meta_endOfTrack,
        noteCount: indexedTrack.channel_noteOn.filter(function (event) {
          return event.deltaTime > 0;
        }).length,
        instrumentNumber: instrumentNumber,
        instrumentName: instrumentName
      };
    });
    var meta = MidiIO.getAllMetadata(parsedMidi, indexedTracks);
    return {
      meta: meta,
      musicTracks: indexedTracks
    };
  };

  MidiIO.getInstrumentNameFromMidiTrack = function getInstrumentNameFromMidiTrack(track) {
    var instrument = track.find(function (event) {
      return event.type === 'channel' && event.subtype === 'programChange';
    });
    // alert(`instrumentNumber ${instrument}`);
    var instrumentNumber = instrument.programNumber;
    // alert(`instrumentNumber ${instrumentNumber}`);
    var instrumentName = Object.keys(INSTRUMENT_MIDI_MAPPING).find(function (instrumentKey) {
      return INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber;
    });
    return instrumentName;
  };

  MidiIO.getInstrumentNumberFromMidiTrack = function getInstrumentNumberFromMidiTrack(track) {
    var instrument = track.find(function (event) {
      return event.type === 'channel' && event.subtype === 'programChange';
    });
    var instrumentNumber = void 0;
    try {
      instrumentNumber = instrument.programNumber;
    } catch (err) {
      instrumentNumber = 0;
      console.warn('COULDN\'T FIND INSTRUMENT NUMBER ' + instrumentNumber + ' defaulting to ' + instrumentNumber);
    }
    return instrumentNumber;
  };

  MidiIO.binaryStringToJSON = function binaryStringToJSON(binaryStringMidi) {
    var parsedMidi = midiFileParser(binaryStringMidi);
    return parsedMidi;
  };

  MidiIO.getNoteOnEvents = function getNoteOnEvents(track) {
    var noteOnEvents = track.filter(function (event) {
      return event.type === 'channel' && event.subtype === 'noteOn';
    });
    var invalidNoteOnEvents = noteOnEvents.filter(function (event) {
      return event.deltaTime === 0;
    });
    var validNoteOnEvents = noteOnEvents.filter(function (event) {
      return event.deltaTime > 0;
    });
    return { noteOnEvents: noteOnEvents, validNoteOnEvents: validNoteOnEvents, invalidNoteOnEvents: invalidNoteOnEvents };
  };

  MidiIO.getNoteOffEvents = function getNoteOffEvents(track) {
    var noteOffEvents = track.filter(function (event) {
      return event.type === 'channel' && event.subtype === 'noteOff';
    });
    var invalidNoteOffEvents = noteOffEvents.filter(function (event) {
      return event.deltaTime === 0;
    });
    var validNoteOffEvents = noteOffEvents.filter(function (event) {
      return event.deltaTime > 0;
    });
    return { noteOffEvents: noteOffEvents, validNoteOffEvents: validNoteOffEvents, invalidNoteOffEvents: invalidNoteOffEvents };
  };

  MidiIO.getTempoFromTrack = function getTempoFromTrack(track) {
    var setTempoEvent = track.find(function (event) {
      return event.type === 'meta' && event.subtype === 'setTempo';
    });
    var deltaTime = setTempoEvent.deltaTime;
    var microsecondsPerBeat = setTempoEvent.microsecondsPerBeat;

    return { deltaTime: deltaTime, microsecondsPerBeat: microsecondsPerBeat };
  };

  MidiIO.getMetadataFromTrack = function getMetadataFromTrack(track) {
    var _ref;

    var microsecondsPerBeat = void 0,
        keySignature = void 0,
        timeSignature = void 0,
        endOfTrack = void 0;
    track.filter(function (event) {
      return event.type === 'meta';
    }).forEach(function (event) {
      switch (event.subtype) {
        case 'setTempo':
          microsecondsPerBeat = event.microsecondsPerBeat;
          break;
        case 'keySignature':
          keySignature = {
            key: event.key,
            scale: event.scale
          };
          break;
        case 'timeSignature':
          timeSignature = {
            numerator: event.numerator,
            denominator: event.denominator,
            metronome: event.metronome,
            thirtyseconds: event.thirtyseconds
          };
          break;
        case 'endOfTrack':
          endOfTrack = {};
        default:
          return {
            name: event.subtype,
            payload: _extends({}, event)
          };
      }
    });
    return _ref = {
      microsecondsPerBeat: microsecondsPerBeat,
      keySignature: keySignature,
      timeSignature: timeSignature,
      endOfTrack: endOfTrack
    }, _ref[event.subtype] = _extends({}, event), _ref;
  };

  MidiIO.urlToBinaryString = function urlToBinaryString(midiURL) {
    return Promise.resolve(true).then(function () {
      return fetch(midiURL, {
        method: 'GET',
        headers: {
          Accept: 'audio/mid'
        }
      });
    }).then(function (response) {
      return response.blob();
    }).then(function (response) {
      return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onloadend = function () {
          var blob = reader.result;
          resolve(blob);
        };
        reader.readAsBinaryString(response);
      });
    }).catch(function (err) {
      console.warn('ERROR IN URLTOBINARYSTRING, ' + JSON.stringify(err));
    });
  };

  MidiIO.noteOffEventToNote = function noteOffEventToNote(noteOffEvent, noteInstrumentName, previousEndTime, msPerTick) {
    var noteNumber = noteOffEvent.noteNumber;
    var deltaTime = noteOffEvent.deltaTime;

    var noteName = MidiIO.midiNoteNumberToName(noteNumber);
    var startTimeInMS = previousEndTime;
    var durationInMS = deltaTime * msPerTick;
    var endTimeInMS = startTimeInMS + durationInMS;
    return { noteNumber: noteNumber, noteName: noteName, startTimeInMS: startTimeInMS, durationInMS: durationInMS, endTimeInMS: endTimeInMS, noteInstrumentName: noteInstrumentName, deltaTime: deltaTime, msPerTick: msPerTick };
  };

  MidiIO.getMillisecondsPerTick = function getMillisecondsPerTick(microsecondsPerBeat, ticksPerBeat) {
    var secondsPerBeat = microsecondsPerBeat / 1000000;
    var secondsPerTick = secondsPerBeat / ticksPerBeat;
    var millisecondsPerTick = secondsPerTick * 1000;
    return millisecondsPerTick;
  };

  MidiIO.getBPMData = function getBPMData(microSecondsPerBeat, ticksPerBeat, timeSignature) {
    // const ticksPerBeat = parsedMidi.header.ticksPerBeat;
    var timeSignatureNumerator = timeSignature.numerator;
    var timeSignatureDenominator = timeSignature.denominator;
    var secondsPerBeat = microSecondsPerBeat / 1000000;
    var secondsPerTick = secondsPerBeat / ticksPerBeat;
    var BPM = minutesInMS / microSecondsPerBeat * (timeSignatureDenominator / timeSignatureNumerator);
    // const millisecondsPerTick = secondsPerTick * 1000;
    return { BPM: BPM };
  };

  MidiIO.bpmToMSPerBeat = function bpmToMSPerBeat(BPM) {
    var timeSignatureNumerator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
    var timeSignatureDenominator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

    return minutesInMS / BPM * (timeSignatureNumerator / timeSignatureDenominator);
  };

  MidiIO.prototype.setBPM = function setBPM() {
    var BPM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;

    this.millisecondsPerTick = MidiIO.getMillisecondsPerTick(MidiIO.bpmToMSPerBeat(BPM, this.timeSignatureNumerator, this.timeSignatureDenominator), this.ticksPerBeat);
    this.BPM = BPM;
  };

  function MidiIO(userSettings) {
    _classCallCheck(this, MidiIO);

    this.settings = _.defaultsDeep(userSettings, {
      midiURL: null,
      parsedMidi: null,
      BPM: -1
    });
    this.isInitialised = false;
  }

  MidiIO.prototype.parseMidiOld = function parseMidiOld(parsedMidi) {
    var bpm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    this.parsedMidi = parsedMidi;
    this.ticksPerBeat = parsedMidi.header.ticksPerBeat;
    var trackMetadata = MidiIO.getMetadataFromTrack(parsedMidi.tracks[0]);
    var microsecondsPerBeat = trackMetadata.microsecondsPerBeat;
    var keySignature = trackMetadata.keySignature;
    var timeSignature = trackMetadata.timeSignature;
    var endOfTrack = trackMetadata.endOfTrack;

    this.noteOnEvents = MidiIO.getNoteOnEvents(parsedMidi.tracks[1]);
    this.noteOffEvents = MidiIO.getNoteOffEvents(parsedMidi.tracks[1]);
    this.millisecondsPerTick = MidiIO.getMillisecondsPerTick(microsecondsPerBeat, this.ticksPerBeat);
    // this.secondsPerTick = this.millisecondsPerTick * 10;
    try {
      this.mainInstrumentNumber = MidiIO.getInstrumentNumberFromMidiTrack(parsedMidi.tracks[1]);
    } catch (err) {}
    try {
      this.mainInstrumentName = MidiIO.getInstrumentNameFromMidiTrack(parsedMidi.tracks[1]);
    } catch (err) {
      this.mainInstrumentName = 'acoustic_grand_piano';
    }
    // this.mainInstrumentName = MidiIO.getInstrumentNameFromMidiTrack(parsedMidi.tracks[1]);
    this.isInitialised = true;
    this.timeSignature = timeSignature;
    this.timeSignatureNumerator = timeSignature.numerator;
    this.timeSignatureDenominator = timeSignature.denominator;

    var _MidiIO$getBPMData2 = MidiIO.getBPMData(microsecondsPerBeat, this.ticksPerBeat, timeSignature);

    var BPM = _MidiIO$getBPMData2.BPM;

    this.BPM = BPM;

    if (bpm !== -1) {
      this.setBPM(bpm);
    }
    return this;
  };

  MidiIO.parseMidi = function parseMidi(url) {
    return MidiIO.urlToJSON(url).then(function (parsedMidi) {
      var _MidiIO$getAllTracks = MidiIO.getAllTracks(parsedMidi);

      var meta = _MidiIO$getAllTracks.meta;
      var musicTracks = _MidiIO$getAllTracks.musicTracks;

      return {
        meta: meta,
        musicTracks: musicTracks
      };
    });
  };

  MidiIO.prototype.init = function init() {
    var _this = this;

    if (this.settings.midiURL) {
      return MidiIO.urlToJSON(this.settings.midiURL).then(function (parsedMidi) {
        // return this.getAllTracks,
        return _this.parseMidi(parsedMidi, _this.settings.BPM);
      }).catch();
    }
    return Promise.resolve(false);
  };

  return MidiIO;
}();

export { MidiIO as default };