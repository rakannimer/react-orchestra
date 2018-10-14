//@ts-ignore

//@ts-ignore
import midiFileParser from "midi-file-parser";
//@ts-ignore
import MidiWriterJS from "midi-writer-js";

import INSTRUMENT_MIDI_MAPPING from "./constants/INSTRUMENT_MIDI_MAPPING";

const minutesInMS = 60000000;
import {
  NoteType,
  Midi,
  ProgramChangeEvent,
  KeySignatureEvent,
  TimeSignatureEvent,
  SetTempoEvent,
  NoteOnEvent,
  NoteOffEvent,
  MidiEvent,
  Track,
  ROMidiFormat
} from "../types";

export const getWriter = () => MidiWriterJS;
export const getUniqueFromMidiNotes = (notes: NoteType[]) => {
  const set = new Set();
  notes.forEach(note => {
    set.add(note.noteName);
  });
  return Array.from(set);
};
export const getAllMetadata = (parsedMidi: Midi, tracks: any[]) => {
  const metaTrack = parsedMidi.tracks[0];
  const indexedMeta = metaTrack.reduce(
    (prev, current, i) => {
      const updated = Object.assign({}, prev, {
        [`${current.type}_${current.subtype}`]: current
      });
      return updated;
    },
    {} as { [key: string]: any }
  );

  const {
    meta_setTempo,
    meta_keySignature,
    meta_timeSignature,
    meta_endOfTrack
  } = indexedMeta;
  const ticksPerBeat = parsedMidi.header.ticksPerBeat;
  const microsecondsPerBeat = meta_setTempo.microsecondsPerBeat;

  const millisecondsPerTick = getMillisecondsPerTick(
    microsecondsPerBeat,
    ticksPerBeat
  );
  const tempo = meta_setTempo;
  const timeSignature = meta_timeSignature;
  const keySignature = meta_keySignature;
  const endOfTrack = meta_endOfTrack;
  const timeSignatureNumerator = timeSignature.numerator;
  const timeSignatureDenominator = timeSignature.denominator;
  const timeSignatureMetronome = timeSignature.metronome;
  const timeSignatureThirtyseconds = timeSignature.thirtyseconds;
  const instrumentNumbers = tracks.map(
    track => track.programChange[0].programNumber
  ); // [0].programNumber
  const instrumentNames = instrumentNumbers.map(instrumentNumber =>
    Object.keys(INSTRUMENT_MIDI_MAPPING).find(
      instrumentKey =>
        INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber
    )
  );

  const { BPM } = getBPMData(microsecondsPerBeat, ticksPerBeat, timeSignature);

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
    BPM
  };
  return metaObject;
};

export const midiNoteNumberToName = (midi: number) => {
  const scaleIndexToNote = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
  ];
  const octave = Math.floor(midi / 12) - 1;
  const note = midi % 12;
  return scaleIndexToNote[note] + octave;
};
export const urlToJSON = (midiURL: string) => {
  return urlToBinaryString(midiURL).then(binaryStringMidi =>
    binaryStringToJSON(binaryStringMidi)
  );
};

export const getAllTracks = (parsedMidi: Midi) => {
  // Use slice
  const tracks = parsedMidi.tracks.filter((track, i) => i >= 1);

  const indexedTracks = tracks.map((track, i) => {
    const indexedTrack = track.reduce(
      (prev, current) => {
        const currentIndex = `${current.type}_${current.subtype}`;
        if (!prev[currentIndex]) {
          prev[currentIndex] = [];
        }
        prev[currentIndex].push(current);
        return prev;
      },
      {} as { [eventType: string]: MidiEvent[] }
    );
    const programChangeEvent = indexedTrack
      .channel_programChange[0] as ProgramChangeEvent;
    const instrumentNumber = programChangeEvent.programNumber;
    const instrumentName = Object.keys(INSTRUMENT_MIDI_MAPPING).find(
      instrumentKey =>
        INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber
    );
    return {
      controller: indexedTrack.channel_controller,
      programChange: indexedTrack.channel_programChange,
      trackname: indexedTrack.meta_trackName,
      noteOn: indexedTrack.channel_noteOn,
      noteOnValid: indexedTrack.channel_noteOn.filter(
        event => event.deltaTime > 0
      ),
      noteOnInvalid: indexedTrack.channel_noteOn.filter(
        event => event.deltaTime === 0
      ),
      noteOff: indexedTrack.channel_noteOff,
      endOfTrack: indexedTrack.meta_endOfTrack,
      noteCount: indexedTrack.channel_noteOn.filter(
        event => event.deltaTime > 0
      ).length,
      instrumentNumber,
      instrumentName
    };
  });
  const meta = getAllMetadata(parsedMidi, indexedTracks);
  return {
    meta,
    musicTracks: indexedTracks
  };
};

export const getInstrumentNameFromMidiTrack = (track: Track) => {
  const instrument = track.find(
    event => event.type === "channel" && event.subtype === "programChange"
  ) as ProgramChangeEvent;
  // alert(`instrumentNumber ${instrument}`);
  const instrumentNumber = instrument.programNumber;
  // alert(`instrumentNumber ${instrumentNumber}`);
  const instrumentName = Object.keys(INSTRUMENT_MIDI_MAPPING).find(
    instrumentKey => INSTRUMENT_MIDI_MAPPING[instrumentKey] === instrumentNumber
  );
  return instrumentName;
};

export const binaryStringToJSON = (binaryStringMidi: string) => {
  const parsedMidi = midiFileParser(binaryStringMidi);
  return parsedMidi;
};

export const getNoteOnEvents = (track: Track) => {
  const noteOnEvents = track.filter(
    event => event.type === "channel" && event.subtype === "noteOn"
  );
  const invalidNoteOnEvents = noteOnEvents.filter(
    event => event.deltaTime === 0
  );
  const validNoteOnEvents = noteOnEvents.filter(event => event.deltaTime > 0);
  return { noteOnEvents, validNoteOnEvents, invalidNoteOnEvents };
};

export const getNoteOffEvents = (track: Track) => {
  const noteOffEvents = track.filter(
    event => event.type === "channel" && event.subtype === "noteOff"
  );
  const invalidNoteOffEvents = noteOffEvents.filter(
    event => event.deltaTime === 0
  );
  const validNoteOffEvents = noteOffEvents.filter(event => event.deltaTime > 0);
  return { noteOffEvents, validNoteOffEvents, invalidNoteOffEvents };
};

export const getTempoFromTrack = (track: Track) => {
  const setTempoEvent = track.find(
    event => event.type === "meta" && event.subtype === "setTempo"
  ) as SetTempoEvent;
  const { deltaTime, microsecondsPerBeat } = setTempoEvent;
  return { deltaTime, microsecondsPerBeat };
};

export const getMetadataFromTrack = (track: Track) => {
  let microsecondsPerBeat, keySignature, timeSignature, endOfTrack;
  const metaEvents = track.filter(event => event.type === "meta");
  metaEvents.forEach(event => {
    switch (event.subtype) {
      case "setTempo":
        const setTempoEvent = event as SetTempoEvent;
        microsecondsPerBeat = setTempoEvent.microsecondsPerBeat;
        break;
      case "keySignature":
        const { key, scale } = event as KeySignatureEvent;
        keySignature = {
          key,
          scale
        };
        break;
      case "timeSignature":
        const {
          numerator,
          denominator,
          metronome,
          thirtyseconds
        } = event as TimeSignatureEvent;
        timeSignature = {
          numerator,
          denominator,
          metronome,
          thirtyseconds
        };
        break;
      case "endOfTrack":
        endOfTrack = {};
        break;
      default:
        return;
    }
  });
  return {
    microsecondsPerBeat,
    keySignature,
    timeSignature,
    endOfTrack
    // [event.subtype]: { ...event }
  };
};
export const urlToBinaryString = async (midiURL: string) => {
  const response = await fetch(midiURL, {
    method: "GET",
    headers: {
      Accept: "audio/mid"
    }
  });
  const data = await response.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = reader.result;
      resolve(blob as string);
    };
    reader.readAsBinaryString(data);
  }) as Promise<string>;
};

export const noteOffEventToNote = (
  noteOffEvent: any,
  noteInstrumentName: string,
  previousEndTime: number,
  msPerTick: number
) => {
  const { noteNumber, deltaTime } = noteOffEvent;
  const noteName = midiNoteNumberToName(noteNumber);
  const startTimeInMS = previousEndTime;
  const durationInMS = deltaTime * msPerTick;
  const endTimeInMS = startTimeInMS + durationInMS;
  return {
    noteNumber,
    noteName,
    startTimeInMS,
    durationInMS,
    endTimeInMS,
    noteInstrumentName,
    deltaTime,
    msPerTick
  };
};

export const getMillisecondsPerTick = (
  microsecondsPerBeat: number,
  ticksPerBeat: number
) => {
  const secondsPerBeat = microsecondsPerBeat / 1000000;
  const secondsPerTick = secondsPerBeat / ticksPerBeat;
  const millisecondsPerTick = secondsPerTick * 1000;
  return millisecondsPerTick;
};

export const getBPMData = (
  microSecondsPerBeat: number,
  ticksPerBeat: number,
  timeSignature: { numerator: number; denominator: number }
) => {
  // const ticksPerBeat = parsedMidi.header.ticksPerBeat;
  const timeSignatureNumerator = timeSignature.numerator;
  const timeSignatureDenominator = timeSignature.denominator;
  const secondsPerBeat = microSecondsPerBeat / 1000000;
  const secondsPerTick = secondsPerBeat / ticksPerBeat;
  const BPM =
    (minutesInMS / microSecondsPerBeat) *
    (timeSignatureDenominator / timeSignatureNumerator);
  // const millisecondsPerTick = secondsPerTick * 1000;
  return { BPM };
};

export const bpmToMSPerBeat = (
  BPM: number,
  timeSignatureNumerator = 4,
  timeSignatureDenominator = 4
) => {
  return (
    (minutesInMS / BPM) * (timeSignatureNumerator / timeSignatureDenominator)
  );
};

export const getTracksAndMetaFromParsedMidi = (
  parsedMidi: Partial<Midi> & { musicTracks: any[] }
) => {
  const { meta, musicTracks } = parsedMidi;
  const tracks = musicTracks.map((track, i) => {
    const noteOns = track.noteOnValid;
    const noteOffs = track.noteOff as NoteOffEvent[];
    const trackInstrumentName = meta.instrumentNames[i];
    const millisecondsPerTick = meta.millisecondsPerTick;
    let previousEndTime = 0;
    return noteOffs.map(noteOff => {
      const {
        noteNumber,
        noteName,
        startTimeInMS,
        durationInMS,
        endTimeInMS,
        noteInstrumentName,
        deltaTime,
        msPerTick
      } = noteOffEventToNote(
        noteOff,
        trackInstrumentName,
        previousEndTime,
        millisecondsPerTick
      );
      previousEndTime = endTimeInMS;
      const note = {
        noteNumber,
        noteName,
        startTimeInMS,
        durationInMS,
        endTimeInMS,
        instrumentName: noteInstrumentName,
        deltaTime,
        msPerTick
      };
      return note;
    });
  });
  return { meta, tracks } as ROMidiFormat;
};

export const parseMidi = (url: string) => {
  return urlToJSON(url).then(parsedMidi => {
    const { meta, musicTracks } = getAllTracks(parsedMidi);
    return {
      meta,
      musicTracks
    };
  });
};
