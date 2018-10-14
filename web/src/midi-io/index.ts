import defaultsDeep from "lodash/defaultsDeep";
import * as MidiUtils from "./midi-utils";

type Midi = any;

export default class MidiIO {
  millisecondsPerTick?: number;
  timeSignatureNumerator?: number;
  timeSignatureDenominator?: number;
  ticksPerBeat?: number;
  BPM?: number;
  settings = {
    midiURL: null as string | null,
    parsedMidi: null as Midi | null,
    BPM: -1 as number
  };
  isInitialised = false;

  constructor(userSettings: MidiIO["settings"]) {
    this.settings = defaultsDeep(userSettings, {
      midiURL: null,
      parsedMidi: null,
      BPM: -1
    });
  }
  setBPM(BPM = 60) {
    this.millisecondsPerTick = MidiIO.getMillisecondsPerTick(
      MidiIO.bpmToMSPerBeat(
        BPM,
        this.timeSignatureNumerator,
        this.timeSignatureDenominator
      ),
      // @ts-ignore
      this.ticksPerBeat
    );
    this.BPM = BPM;
  }

  static parseMidi = MidiUtils.parseMidi;
  static getTracksAndMetaFromParsedMidi =
    MidiUtils.getTracksAndMetaFromParsedMidi;
  static getWriter = MidiUtils.getWriter;
  static getUniqueFromMidiNotes = MidiUtils.getUniqueFromMidiNotes;
  static midiNoteNumberToName = MidiUtils.midiNoteNumberToName;
  static urlToJSON = MidiUtils.urlToJSON;
  static getAllMetadata = MidiUtils.getAllMetadata;
  static getAllTracks = MidiUtils.getAllTracks;
  static getInstrumentNumberFromMidiTrack =
    MidiUtils.getInstrumentNameFromMidiTrack;
  static binaryStringToJSON = MidiUtils.binaryStringToJSON;
  static getNoteOnEvents = MidiUtils.getNoteOnEvents;
  static getNoteOffEvents = MidiUtils.getNoteOffEvents;
  static getTempoFromTrack = MidiUtils.getTempoFromTrack;
  static getMetadataFromTrack = MidiUtils.getMetadataFromTrack;
  static urlToBinaryString = MidiUtils.urlToBinaryString;
  static noteOffEventToNote = MidiUtils.noteOffEventToNote;
  static getMillisecondsPerTick = MidiUtils.getMillisecondsPerTick;
  static getBPMData = MidiUtils.getBPMData;
  static bpmToMSPerBeat = MidiUtils.bpmToMSPerBeat;
}
