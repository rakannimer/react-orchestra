import midiFileParser from 'midi-file-parser';
// import MidiWriterJS from 'midi-writer-js';
import _ from 'lodash';

import INSTRUMENT_MIDI_MAPPING from './constants/INSTRUMENT_MIDI_MAPPING';

const minutesInMS = 60000000;

class MidiIO {
  // static getWriter() {
  //   return MidiWriterJS;
  // }
  static getUniqueFromMidiNotes(notes) {
    const set = new Set();
    notes.forEach((note) => {
      set.add(note.noteName);
    });
    return Array.from(set);
  }
  static midiNoteNumberToName(midi) {
    const scaleIndexToNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(midi / 12) - 1;
    const note = midi % 12;
    return scaleIndexToNote[note] + octave;
  }

  static urlToJSON(midiURL) {
    return MidiIO.urlToBinaryString(midiURL).then(binaryStringMidi =>
       MidiIO.binaryStringToJSON(binaryStringMidi),
    );
  }
  static getAllMetadata(parsedMidi, tracks) {
    const metaTrack = parsedMidi.tracks[0];
    const indexedMeta = metaTrack.reduce((prev, current, i) => {
      const updated = Object.assign({}, prev, {
        [`${current.type}_${current.subtype}`]: current,
      });
      return updated;
    }, {});

    const {
      meta_setTempo,
      meta_keySignature,
      meta_timeSignature,
      meta_endOfTrack,
    } = indexedMeta;
    const ticksPerBeat = parsedMidi.header.ticksPerBeat;
    const microsecondsPerBeat = meta_setTempo.microsecondsPerBeat;

    const millisecondsPerTick = MidiIO.getMillisecondsPerTick(microsecondsPerBeat, ticksPerBeat);
    const tempo = meta_setTempo;
    const timeSignature = meta_timeSignature;
    const keySignature = meta_keySignature;
    const endOfTrack = meta_endOfTrack;
    const timeSignatureNumerator = timeSignature.numerator;
    const timeSignatureDenominator = timeSignature.denominator;
    const timeSignatureMetronome = timeSignature.metronome;
    const timeSignatureThirtyseconds = timeSignature.thirtyseconds;
    const instrumentNumbers = tracks.map(track => track.programChange[0].programNumber); // [0].programNumber
    const instrumentNames = instrumentNumbers.map(instrumentNumber =>
      Object.keys(INSTRUMENT_MIDI_MAPPING)
      .find(instrumentKey => (INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber)),
    );

    const { BPM } = MidiIO.getBPMData(microsecondsPerBeat, ticksPerBeat, timeSignature);

    const metaObject = {
      tempo,
      keySignature,
      timeSignature,
      timeSignatureNumerator,
      timeSignatureDenominator,
      timeSignatureMetronome,
      timeSignatureThirtyseconds,
      endOfTrack,
      trackCount: tracks.length,
      microsecondsPerBeat,
      instrumentNumbers,
      instrumentNames,
      millisecondsPerTick,
      ticksPerBeat,
      BPM,
    };
    return metaObject;
  }
  static indexMidiTrack(track) {
    const indexedTrack = track.reduce(
      (prev, current) => {
        const currentIndex = `${current.type}_${current.subtype}`;
        const updated = Object.assign({}, prev);
        if (!updated[currentIndex]) {
          updated[currentIndex] = [];
        }
        updated[currentIndex].push(current);
        return updated;
      },
      {},
    );
    return indexedTrack;
  }
  static getAllTracks(parsedMidi) {
    const tracks = parsedMidi.tracks.filter((track, i) => i >= 1);

    const indexedTracks = tracks.map((track, i) => {
      let previousNote;
      const indexedTrack = MidiIO.indexMidiTrack(track);
      const instrumentNumber = indexedTrack.channel_programChange[0].programNumber;
      const instrumentName = Object.keys(INSTRUMENT_MIDI_MAPPING).find(instrumentKey => (
        INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber),
      );

      return {
        controller: indexedTrack.channel_controller,
        programChange: indexedTrack.channel_programChange,
        trackname: indexedTrack.meta_trackName,
        noteOn: indexedTrack.channel_noteOn,
        noteOnValid: indexedTrack.channel_noteOn.filter(event => event.deltaTime > 0),
        noteOnInvalid: indexedTrack.channel_noteOn.filter(event => event.deltaTime === 0),
        noteOff: indexedTrack.channel_noteOff,
        endOfTrack: indexedTrack.meta_endOfTrack,
        noteCount: indexedTrack.channel_noteOn.filter(event => event.deltaTime > 0).length,
        instrumentNumber,
        instrumentName,
      };
    });
    const meta = MidiIO.getAllMetadata(parsedMidi, indexedTracks);
    return {
      meta,
      musicTracks: indexedTracks,
    };
  }
  static getInstrumentNameFromMidiTrack(track) {
    const instrument = track.find(event => event.type === 'channel' && event.subtype === 'programChange');
    // alert(`instrumentNumber ${instrument}`);
    const instrumentNumber = instrument.programNumber;
    // alert(`instrumentNumber ${instrumentNumber}`);
    const instrumentName = Object.keys(INSTRUMENT_MIDI_MAPPING).find(instrumentKey => (
      INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber),
    );
    return instrumentName;
  }

  static getInstrumentNumberFromMidiTrack(track) {
    const instrument = track.find(event => event.type === 'channel' && event.subtype === 'programChange');
    let instrumentNumber;
    try {
      instrumentNumber = instrument.programNumber;
    } catch (err) {
      instrumentNumber = 0;
      console.warn(`COULDN'T FIND INSTRUMENT NUMBER ${instrumentNumber} defaulting to ${instrumentNumber}`);
    }
    return instrumentNumber;
  }

  static binaryStringToJSON(binaryStringMidi) {
    const parsedMidi = midiFileParser(binaryStringMidi);
    return parsedMidi;
  }
  static getNoteOnEvents(track) {
    const noteOnEvents = track.filter(event =>
      event.type === 'channel' && event.subtype === 'noteOn',
    );
    const invalidNoteOnEvents = noteOnEvents.filter(event => event.deltaTime === 0);
    const validNoteOnEvents = noteOnEvents.filter(event => event.deltaTime > 0);
    return { noteOnEvents, validNoteOnEvents, invalidNoteOnEvents };
  }

  static getNoteOffEvents(track) {
    const noteOffEvents = track.filter(event =>
      event.type === 'channel' && event.subtype === 'noteOff',
    );
    const invalidNoteOffEvents = noteOffEvents.filter(event => event.deltaTime === 0);
    const validNoteOffEvents = noteOffEvents.filter(event => event.deltaTime > 0);
    return { noteOffEvents, validNoteOffEvents, invalidNoteOffEvents };
  }

  static getTempoFromTrack(track) {
    const setTempoEvent = track.find(event => event.type === 'meta' && event.subtype === 'setTempo');
    const { deltaTime, microsecondsPerBeat } = setTempoEvent;
    return { deltaTime, microsecondsPerBeat };
  }
  static getMetadataFromTrack(track) {
    let microsecondsPerBeat,
      keySignature,
      timeSignature,
      endOfTrack;
    track.filter(event => event.type === 'meta').forEach((event) => {
      switch (event.subtype) {
        case 'setTempo':
          microsecondsPerBeat = event.microsecondsPerBeat;
          break;
        case 'keySignature':
          keySignature = {
            key: event.key,
            scale: event.scale,
          };
          break;
        case 'timeSignature':
          timeSignature = {
            numerator: event.numerator,
            denominator: event.denominator,
            metronome: event.metronome,
            thirtyseconds: event.thirtyseconds,
          };
          break;
        case 'endOfTrack':
          endOfTrack = {};
          break;
        default:
          return {
            name: event.subtype,
            payload: { ...event },
          };
      }
    });
    return {
      microsecondsPerBeat,
      keySignature,
      timeSignature,
      endOfTrack,
      [event.subtype]: { ...event },
    };
  }
  static urlToBinaryString(midiURL) {
    return Promise.resolve(true)
      .then(() => fetch(midiURL,
        {
          method: 'GET',
          headers: {
            Accept: 'audio/mid',
          },
        },
      ))
      .then(response => response.blob())
      .then(response =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const blob = reader.result;
            resolve(blob);
          };
          reader.readAsBinaryString(response);
        }),
      )
      .catch((err) => {
        console.warn(`ERROR IN URLTOBINARYSTRING, ${JSON.stringify(err)}`);
      });
  }

  static noteOffEventToNote(noteOffEvent, noteInstrumentName, previousEndTime, msPerTick) {
    const { noteNumber, deltaTime } = noteOffEvent;
    const noteName = MidiIO.midiNoteNumberToName(noteNumber);
    const startTimeInMS = previousEndTime;
    const durationInMS = deltaTime * msPerTick;
    const endTimeInMS = startTimeInMS + durationInMS;
    return { noteNumber, noteName, startTimeInMS, durationInMS, endTimeInMS, noteInstrumentName, deltaTime, msPerTick };
  }

  static getMillisecondsPerTick(microsecondsPerBeat, ticksPerBeat) {
    const secondsPerBeat = microsecondsPerBeat / 1000000;
    const secondsPerTick = secondsPerBeat / ticksPerBeat;
    const millisecondsPerTick = secondsPerTick * 1000;
    return millisecondsPerTick;
  }

  static getBPMData(microSecondsPerBeat, ticksPerBeat, timeSignature) {
    // const ticksPerBeat = parsedMidi.header.ticksPerBeat;
    const timeSignatureNumerator = timeSignature.numerator;
    const timeSignatureDenominator = timeSignature.denominator;
    const secondsPerBeat = microSecondsPerBeat / 1000000;
    const secondsPerTick = secondsPerBeat / ticksPerBeat;
    const BPM = (minutesInMS / microSecondsPerBeat) *
      (timeSignatureDenominator / timeSignatureNumerator);
    // const millisecondsPerTick = secondsPerTick * 1000;
    return { BPM };
  }

  static bpmToMSPerBeat(BPM, timeSignatureNumerator = 4, timeSignatureDenominator = 4) {
    return (minutesInMS / BPM) *
      (timeSignatureNumerator / timeSignatureDenominator);
  }

  setBPM(BPM = 60) {
    this.millisecondsPerTick = MidiIO.getMillisecondsPerTick(MidiIO.bpmToMSPerBeat(BPM, this.timeSignatureNumerator, this.timeSignatureDenominator), this.ticksPerBeat);
    this.BPM = BPM;
  }

  constructor(userSettings) {
    this.settings = _.defaultsDeep(userSettings, {
      midiURL: null,
      parsedMidi: null,
      BPM: -1,
    });
    this.isInitialised = false;
  }

  parseMidiOld(parsedMidi, bpm = -1) {
    this.parsedMidi = parsedMidi;
    this.ticksPerBeat = parsedMidi.header.ticksPerBeat;
    const trackMetadata = MidiIO.getMetadataFromTrack(parsedMidi.tracks[0]);
    const {
      microsecondsPerBeat,
      keySignature,
      timeSignature,
      endOfTrack,
    } = trackMetadata;
    this.noteOnEvents = MidiIO.getNoteOnEvents(parsedMidi.tracks[1]);
    this.noteOffEvents = MidiIO.getNoteOffEvents(parsedMidi.tracks[1]);
    this.millisecondsPerTick = MidiIO.getMillisecondsPerTick(microsecondsPerBeat, this.ticksPerBeat);
    // this.secondsPerTick = this.millisecondsPerTick * 10;
    try {
      this.mainInstrumentNumber = MidiIO.getInstrumentNumberFromMidiTrack(parsedMidi.tracks[1]);
    } catch (err) {
    }
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

    const { BPM } = MidiIO.getBPMData(microsecondsPerBeat, this.ticksPerBeat, timeSignature);
    this.BPM = BPM;

    if (bpm !== -1) {
      this.setBPM(bpm);
    }
    return this;
  }
  static parseMidi(url) {
    return MidiIO.urlToJSON(url).then((parsedMidi) => {
      const { meta, musicTracks } = MidiIO.getAllTracks(parsedMidi);
      return {
        meta,
        musicTracks,
      };
    }).catch((err) => {
      alert(`COULDNT PARSE midi ${err.message}`);
    });
  }
  static getTracksAndMetaFromParsedMidi(parsedMidi) {
    const { meta, musicTracks } = parsedMidi;
    const tracks = musicTracks.map((track, i) => {
      const noteOns = track.noteOnValid;
      const noteOffs = track.noteOff;
      const trackInstrumentName = meta.instrumentNames[i];
      const millisecondsPerTick = meta.millisecondsPerTick;
      let previousEndTime = 0;
      let previousNote = {};
      return noteOffs.map((noteOff) => {
        const {
          noteNumber,
          noteName,
          startTimeInMS,
          durationInMS,
          endTimeInMS,
          noteInstrumentName,
          deltaTime,
          msPerTick,
        } = MidiIO.noteOffEventToNote(
          noteOff,
          trackInstrumentName,
          previousEndTime,
          millisecondsPerTick,
        );
        if (deltaTime === 0) {
          const note = Object.assign({},
            previousNote,
            { noteNumber, noteName, instrumentName: noteInstrumentName },
          );
          previousNote = note;
          return note;
        }
        previousEndTime = endTimeInMS;
        const note = {
          noteNumber,
          noteName,
          startTimeInMS,
          durationInMS,
          endTimeInMS,
          instrumentName: noteInstrumentName,
          deltaTime,
          msPerTick,
        };
        previousNote = note;
        return note;
      });
    });
    return { meta, tracks };
  }
  init() {
    if (this.settings.midiURL) {
      return MidiIO.urlToJSON(this.settings.midiURL)
      .then(parsedMidi =>
        // return this.getAllTracks,
         this.parseMidi(parsedMidi, this.settings.BPM)).catch();
    }
    return Promise.resolve(false);
  }
}
export default MidiIO;
