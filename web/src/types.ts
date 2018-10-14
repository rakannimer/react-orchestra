export type NoteType = {
  noteName: string;
  instrumentName: string;
  durationInMS: number;
};

export type ROMidiFormat = {
  meta: any;
  tracks: any[];
};

export type Midi = {
  meta: any;
  tracks: Track[];
  header: {
    ticksPerBeat: number;
  };
};

export interface ProgramChangeEvent extends MidiTrackEvent {
  programNumber: number;
}
export interface MidiTrackEvent {
  type: string;
  subtype: string;
  deltaTime: number;
}
export interface KeySignatureEvent extends MidiTrackEvent {
  key: string;
  scale: string;
}

export interface TimeSignatureEvent extends MidiTrackEvent {
  numerator: number;
  denominator: number;
  metronome: number;
  thirtyseconds: number;
}
export interface EndOfTrackEvent extends MidiTrackEvent {}

export type SetTempoEvent = {
  type: string;
  subtype: string;
  deltaTime: number;
  microsecondsPerBeat: number;
};
export type NoteOnEvent = {
  type: string;
  subtype: string;
  deltaTime: number;
};
export type NoteOffEvent = {
  type: string;
  subtype: string;
  deltaTime: number;
};

export type MidiEvent =
  | TimeSignatureEvent
  | EndOfTrackEvent
  | KeySignatureEvent
  | SetTempoEvent
  | NoteOnEvent
  | ProgramChangeEvent
  | NoteOffEvent;

export type Track = (MidiEvent)[];
