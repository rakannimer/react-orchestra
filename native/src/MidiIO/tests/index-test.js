import expect from 'expect';
import midiFileParser from 'midi-file-parser';
import MidiWriterJS from 'midi-writer-js';
import prettyjson from 'prettyjson';

import MidiIO from 'src/MidiIO';

const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
const pokemonMidiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/Pokemon-Theme-Song.mid';
const fullMidiUrl = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/full-tracks/Celine_Dion_-_All_By_Myself.midi';
const expectedTicksPerBeat = 960;
const expectedMicrosecondsPerBeat = 428571;// JSON.stringify({"name":"setTempo","payload":{"microsecondsPerBeat":428571}});
const expectedKeySignature = JSON.stringify({ key: 0, scale: 0 }); // JSON.stringify({"name":"keySignature","payload":{"key":0,"scale":0}});
const expectedTimeSignature = JSON.stringify({ numerator: 4, denominator: 4, metronome: 24, thirtyseconds: 8 });
const expectedEndOfTrack = JSON.stringify({});

describe('MIDI Parsing', function () {
  this.timeout(35000);
  it(`
  can download a midi file and read it as a binary string
  ⚙   MidiIO.urlToBinaryString(midiURL) : blob  ⚙
      `, () => {
    return MidiIO.urlToBinaryString(midiURL).then((blob) => {
      expect(typeof blob).toEqual('string');
    });
  });
  it('can parse midi binary string to json', () => {
    const expectedParsedMidi = require('./parsedMidiJSON');
    return MidiIO.urlToJSON(midiURL).then((parsedMidi) => {
      expect(parsedMidi).toBeAn('object');
    });
  });


  it(`can parse midi and return it in the following form :
    {
      meta: {
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
      },
      musicTracks,
    }
    functions :
    ⚙  MidiIO.parseMidi: midiUrl: string  ⚙

  `, () => {
    // return MidiIO.parseMidi(fullMidiUrl);
    return MidiIO.parseMidi(fullMidiUrl).then((parsedMidi) => {
    //
      console.log(Object.keys(parsedMidi.meta));
      expect(parsedMidi.meta).toExist();
      expect(parsedMidi.musicTracks).toExist();
    //
      expect(parsedMidi.meta.ticksPerBeat).toExist();
      expect(parsedMidi.meta.microsecondsPerBeat).toExist();
      expect(parsedMidi.meta.millisecondsPerTick).toExist();
      expect(parsedMidi.meta.timeSignature).toExist();
      expect(parsedMidi.meta.timeSignatureNumerator).toExist();
      expect(parsedMidi.meta.timeSignatureDenominator).toExist();
      expect(parsedMidi.meta.timeSignatureMetronome).toExist();
      expect(parsedMidi.meta.timeSignatureThirtyseconds).toExist();
      expect(parsedMidi.meta.instrumentNumbers).toExist();
      expect(parsedMidi.meta.instrumentNames).toExist();
      expect(parsedMidi.meta.BPM).toExist();
    // //
    // //   //
    // //   // // values
      expect(parsedMidi.meta.ticksPerBeat).toEqual(120);
      expect(parsedMidi.meta.microsecondsPerBeat).toEqual(967742);
      expect(parsedMidi.meta.millisecondsPerTick).toEqual(8.064516666666668);
      expect(parsedMidi.meta.timeSignatureNumerator).toEqual(4);
      expect(parsedMidi.meta.timeSignatureDenominator).toEqual(4);
      expect(parsedMidi.meta.timeSignatureMetronome).toEqual(24);
      expect(parsedMidi.meta.timeSignatureThirtyseconds).toEqual(8);
      expect(parsedMidi.meta.instrumentNumbers).toEqual([0, 35, 5, 65, 48, 48, 24, 26, 0]);
      expect(parsedMidi.meta.instrumentNames).toEqual(['acoustic_grand_piano', 'fretless_bass', 'electric_piano_2', 'alto_sax', 'string_ensemble_1', 'string_ensemble_1', 'acoustic_guitar_nylon', 'electric_guitar_jazz', 'acoustic_grand_piano']);
      expect(parsedMidi.meta.BPM).toEqual(61.99999586666694);
    //   // console.log()
    });
  });

  it(`
    can get Instrument name and MidiNumber from track
    functions :
    ⚙  getInstrumentNumberFromMidiTrack: object track from parsedMidi  ⚙
    ⚙  getInstrumentNameFromMidiTrack: object track from parsedMidi  ⚙
    `, () => {
    return MidiIO.urlToJSON(midiURL).then((parsedMidi) => {
      const instrumentNumber = MidiIO.getInstrumentNumberFromMidiTrack(parsedMidi.tracks[1]);
      const instrumentName = MidiIO.getInstrumentNameFromMidiTrack(parsedMidi.tracks[1]);
      expect(instrumentName).toEqual('acoustic_grand_piano');
      expect(instrumentNumber).toEqual(0);
    });
  });

  it(`
    can get all tracks from midi in format :
      {
        meta: {
          tempo
          keySignature
          timeSignature
          endOfTrack,
          trackCount
        },
        musicTracks: [
          {
            controller
            programChange
            trackname
            noteOn
            noteOnValid
            noteOnInvalid
            noteOff
            endOfTrack
            instrumentNumber
          }
        ],
      }
    functions:
    ⚙  getAllTracks ⚙

    `, () => {
    return MidiIO.urlToJSON(fullMidiUrl).then((parsedMidi) => {
      const tracks = MidiIO.getAllTracks(parsedMidi);

      expect(tracks.meta).toExist();
      expect(tracks.meta.tempo).toExist();
      expect(tracks.meta.keySignature).toExist();
      expect(tracks.meta.timeSignature).toExist();
      expect(tracks.meta.endOfTrack).toExist();
      expect(tracks.meta.trackCount).toExist();
      expect(tracks.meta.trackCount).toEqual(9);

      expect(tracks.musicTracks).toExist();

      const expectedResultLength = {
        controllersLength: [
          293, 10, 40, 909, 5, 5, 126, 98, 28,
        ],
        programChangesLength: [
          1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        tracknamesLength: [
          1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        noteOnsLength: [
          1311, 187, 186, 186, 280, 80, 54, 51, 664,
        ],
        noteOffsLength: [
          1311, 187, 186, 186, 280, 80, 54, 51, 664,
        ],
        endOfTracksLength: [
          1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        instrumentNumbers: [
          0, 35, 5, 65, 48, 48, 24, 26, 0,
        ],
        instrumentNames: [
          'acoustic_grand_piano',
          'fretless_bass',
          'electric_piano_2',
          'alto_sax',
          'string_ensemble_1',
          'string_ensemble_1',
          'acoustic_guitar_nylon',
          'electric_guitar_jazz',
          'acoustic_grand_piano',
        ],
      };
      tracks.musicTracks.forEach((track, i) => {
        expect(track.controller).toExist();
        expect(track.controller.length).toEqual(expectedResultLength.controllersLength[i]);
        expect(track.programChange).toExist();
        expect(track.programChange.length).toEqual(expectedResultLength.programChangesLength[i]);
        expect(track.trackname).toExist();
        expect(track.trackname.length).toEqual(expectedResultLength.tracknamesLength[i]);
        expect(track.noteOn).toExist();
        expect(track.noteOn.length).toEqual(expectedResultLength.noteOnsLength[i]);
        expect(track.noteOnValid).toExist();
        expect(track.noteOnInvalid).toExist();
        expect(track.noteOff).toExist();
        expect(track.noteOff.length).toEqual(expectedResultLength.noteOffsLength[i]);
        expect(track.endOfTrack).toExist();
        expect(track.endOfTrack.length).toEqual(expectedResultLength.endOfTracksLength[i]);
        expect(track.instrumentNumber).toBeA('number');
        expect(track.instrumentNumber).toEqual(expectedResultLength.instrumentNumbers[i]);
        expect(track.instrumentName).toExist();
        expect(track.instrumentName).toEqual(expectedResultLength.instrumentNames[i]);
      });
    });
  });
});
