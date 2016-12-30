/*
import expect from 'expect';
import AudioContext from 'src/AudioContext';
import Instruments from 'src/Instruments';
import Note from 'src/Note';
import Melody from 'src/Melody';
import Musician from 'src/Musician';

const instrumentName = 'acoustic_grand_piano';

window.delay = ms => new Promise(resolve => setTimeout(resolve, ms));


describe('Music Player', function () {
  this.timeout(25000);

  it('can initialize AudioContext Singleton', () => {
    expect(AudioContext).toExist();
  });

  it('can initialize Instruments Instance', () => {
    const instruments = new Instruments();
    expect(instruments).toExist();
  });

  it('can load instrument', () => {
    this.timeout(25000);
    // const instrumentName = 'acoustic_grand_piano'; // , 'alto_sax'];
    const instruments = new Instruments();
    return instruments.get(instrumentName)
      .then((instrument) => {
        expect(instrument).toExist();
        expect(instrumentName in instruments.instruments).toBe(true);
        expect(instruments.instruments[instrumentName]).toExist();
      });
  });

  it('can used cached version of the instrument', () => {
    const instruments = new Instruments();
    return instruments.get(instrumentName)
      .then((instrument) => {
        expect(instrument).toExist();
        expect(instrumentName in instruments.instruments).toBe(true);
        expect(instruments.instruments[instrumentName]).toExist();
        return instruments.get(instrumentName);
      }).then((instrument) => {
        expect(instrument).toExist();
        expect(instrumentName in instruments.instruments).toBe(true);
        expect(instruments.instruments[instrumentName]).toExist();
      });
  });


  it('can play chord with instrument', () => {
    const instruments = new Instruments();
    return instruments.startPlayingChordByNoteNames(instrumentName, ['A3', 'C3', 'G3'], 1)
      .then(() => delay(500))
      .then(() => instruments.stopPlayingChordByNoteNames(instrumentName, ['A3', 'C3', 'G3']));
  });

  it('can start playing note with instrument', () => {
    const instruments = new Instruments();
    const note = new Note({
      noteName: 'A4',
      gain: 2,
      instrumentName: 'acoustic_grand_piano',
    });
    return instruments.startPlayingNote(note)
      .then(() => {
        return instruments.stopPlayingNote(note, 500);
      });
  });

  it('can stop playing chord with instrument', () => {
    const instruments = new Instruments();
    return instruments.startPlayingChordByNoteNames(instrumentName, ['A5', 'C5', 'G5']).then(() => {
      return instruments.stopPlayingChordByNoteNames(instrumentName, ['A5', 'C5', 'G5']);
    })
      .then(() => {
        return delay(1000);
      });
  });

  it('can init Note', () => {
    const note = new Note({
      name: 'A4',
      gain: 2,
      instrumentName: 'alto_sax',
      startTime: 3,
      endTime: 100,
      duration: 97,
      fadeDurationInMS: 300,
      // deltaTime: 3,
      // msPerTick: 2
    });
    expect(note.payload.name).toBe('A4');
    expect(note.payload.gain).toBe(2);
    expect(note.payload.instrumentName).toBe('alto_sax');
    expect(note.payload.startTime).toBe(3);
    expect(note.payload.endTime).toBe(100);
    expect(note.payload.duration).toBe(97);
    expect(note.payload.deltaTime).toBe(0);
    expect(note.payload.msPerTick).toBe(0);
  });


  it('can read a midifile from the internet and parse it into notes and metadata. Uses *RakanNimer/MidiIO*', () => {
    const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
    return Instruments.urlToNotesAndMeta(midiURL).then((notesAndMeta) => {
      const { notes, meta } = notesAndMeta;
      expect(notes).toExist();
      expect(meta).toExist();
      expect(notes).toBeAn('array');
      expect(meta).toBeAn('object');
    });
  });

  it('can read a midifile from the internet and parse it into notes and metadata, then play its first track. Uses *RakanNimer/MidiIO*', () => {
    const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
    const instruments = new Instruments();

    return Instruments.urlToNotesAndMeta(midiURL).then((notesAndMeta) => {
      const { notes, meta } = notesAndMeta;
      instruments.play(notes[0], meta);
      return window.delay(5000).then(() => {
        console.log('stopping');
        return instruments.stop(notes[0], meta);
      }).then(() => {
        console.log('stopped');
        return window.delay(5000);
      });
    });
  });

  it('can read a midifile from the internet and parse it into notes and metadata, then play 2 tracks concurrently. Uses *RakanNimer/MidiIO*', () => {
    // const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
    // const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/full-tracks/Celine_Dion_-_All_By_Myself.midi';
    // const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/full-tracks/Beethoven_Ludwig_van_-_Beethoven_Symphony_No._5_4th.midi';
    const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/full-tracks/2-track-test-uptown-girl.mid';
    return Instruments.urlToNotesAndMeta(midiURL).then((notesAndMeta) => {
      const { notes, meta } = notesAndMeta;
      console.log('playing , ', notes[0].length);
      const firstInstrument = new Instruments();
      const secondInstrument = new Instruments();
      firstInstrument.play(notes[0], meta);
      secondInstrument.play(notes[1], meta);
      return window.delay(10000).then(() => {
        console.log('finished playing');
        firstInstrument.stop(notes[0], meta);
        return secondInstrument.stop(notes[1], meta);
      }).then(() => delay(10000));
    });
  });

  it('can read a midifile from the internet and parse it into notes and metadata, divide its tempo by 10 and then play its first track. Uses *RakanNimer/MidiIO*', () => {
    // const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
    const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/full-tracks/2-track-test-uptown-girl.mid';
    const instruments = new Instruments();

    return Instruments.urlToNotesAndMeta(midiURL).then((notesAndMeta) => {
      const updatedNotesAndMeta = Instruments.setTempo(notesAndMeta, 300);
      const { notes, meta } = updatedNotesAndMeta;
      // console.log(JSON.stringify(notes[0]));
      instruments.play(notes[0], meta);
      return window.delay(5000).then(() => {
        console.log('stopping');
        return instruments.stop(notes[0], meta);
      }).then(() => {
        console.log('stopped');

        return window.delay(5000);
      });
    });
  });

  it('can play a bunch of notes', () => {
    const notes = [
      new Note({
        noteNumber: '',
        noteName: 'C4',
        startTimeInMS: 0,
        durationInMS: 100,
        endTimeInMS: 100,
        instrumentName: 'acoustic_grand_piano',
      }),
      new Note({
        noteNumber: '',
        noteName: 'E4',
        startTimeInMS: 100,
        durationInMS: 100,
        endTimeInMS: 200,
        instrumentName: 'acoustic_grand_piano',
      }),
      new Note({
        noteNumber: '',
        noteName: 'G4',
        startTimeInMS: 200,
        durationInMS: 100,
        endTimeInMS: 300,
        instrumentName: 'acoustic_grand_piano',
      }),
      new Note({
        noteNumber: '',
        noteName: 'G4',
        startTimeInMS: 300,
        durationInMS: 100,
        endTimeInMS: 400,
        instrumentName: 'acoustic_grand_piano',
      }),
      new Note({
        noteNumber: '',
        noteName: 'E4',
        startTimeInMS: 400,
        durationInMS: 100,
        endTimeInMS: 500,
        instrumentName: 'acoustic_grand_piano',
      }),
      new Note({
        noteNumber: '',
        noteName: 'C4',
        startTimeInMS: 500,
        durationInMS: 100,
        endTimeInMS: 600,
        instrumentName: 'acoustic_grand_piano',
      }),
    ];
    const instruments = new Instruments();
    return instruments.play(notes, {})
    .then(() => window.delay(1000))
      .then(() => {
        console.log('Stopping melody');
        return instruments.stop(notes, {});
      })
      .then(() => window.delay(1000));
  });

  it('can change instrument from midi ', () => {
    // const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
    const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/full-tracks/2-track-test-uptown-girl.mid';
    const instruments = new Instruments();

    return Instruments.urlToNotesAndMeta(midiURL).then((notesAndMeta) => {
      const updatedNotesAndMeta = Instruments.setInstrument(notesAndMeta, 'alto_sax');
      const { notes, meta } = updatedNotesAndMeta;
      // console.log(JSON.stringify(notes[0]));
      instruments.play(notes[0], meta);
      return window.delay(5000).then(() => {
        console.log('stopping');
        return instruments.stop(notes[0], meta);
      }).then(() => {
        console.log('stopped');

        return window.delay(5000);
      });
    });
  });

  it('extract unique notes from midi', function () {
    this.timeout(35000);
    const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
    const instruments = new Instruments();
    return Instruments.urlToNotesAndMeta(midiURL).then((notesAndMeta) => {
      const updatedNotesAndMeta = Instruments.setInstrument(notesAndMeta, 'alto_sax');
      const { notes, meta } = updatedNotesAndMeta;
      // console.log(JSON.stringify(notes[0]));
      const notesAll = Instruments.getUniqueNotes(notes[0]);
      console.log(notesAll);
      expect(notesAll).toEqual(['D4', 'B3', 'C#4', 'G4', 'E4', 'F#4', 'A#3', 'D#4', 'F4', 'G#4', 'A3', 'A4', 'G#3', 'C4']);
    });
  });

  it('can get interval between two note names ', () => {
    let interval = Instruments.getInterval('A', 'B');
    expect(interval).toEqual(2);
    interval = Instruments.getInterval('A', 'C');
    expect(interval).toEqual(3);
    interval = Instruments.getInterval('G', 'G#');
    expect(interval).toEqual(1);
    interval = Instruments.getInterval('G', 'A');
    expect(interval).toEqual(2);
    interval = Instruments.getInterval('G', 'A#');
    expect(interval).toEqual(3);
    interval = Instruments.getInterval('G', 'G');
    expect(interval).toEqual(0);
  });

  it('can get interval permutations from noteNames', () => {
    const noteNames = ['A3', 'B3', 'C3'];
    const uniqueNoteNames = Instruments.getUniqueNotesNoOctave(noteNames);
    const scale = Instruments.getIntervalPermutationsFromNoteNames(uniqueNoteNames);
    expect(scale).toEqual([{ firstNoteName: 'A', guessedScales: [], intervals: [0, 9, 10] }, { firstNoteName: 'B', guessedScales: [], intervals: [0, 2, 11] }, { firstNoteName: 'C', guessedScales: [], intervals: [0, 1, 3] }]);
  });

  it('can guess scale from noteNames', () => {
    const noteNames = ['A3', 'B3', 'C3'];
    const uniqueNoteNames = Instruments.getUniqueNotesNoOctave(noteNames);
    const guessedScales = Instruments.getScaleFromNoteNames(uniqueNoteNames);
    expect(guessedScales).toEqual([{ firstNoteName: 'A', guessedScales: ['dorian', 'mixolydian', 'acoustic', 'algerian', 'majorBlues'], intervals: [0, 9, 10] }, { firstNoteName: 'B', guessedScales: ['ionian', 'lydian', 'harmonicMinor', 'melodicMinorAsc'], intervals: [0, 2, 11] }, { firstNoteName: 'C', guessedScales: ['phrygian', 'locrian', 'altered'], intervals: [0, 1, 3] }]);
    // return guessedScales;
  });

  it('can build chord from intervals and first note', () => {
    let chordNotes = Instruments.getNoteNamesFromIntervals('A', [0, 2, 4], 4);
    expect(chordNotes).toEqual(['A4', 'B4', 'C#4']);
    chordNotes = Instruments.getNoteNamesFromIntervals('A', [0, 2, 4], 3);
    expect(chordNotes).toEqual(['A3', 'B3', 'C#3']);
  });

  it('can build chord from intervals and first note and play it', () => {
    const chordNotes = Instruments.getNoteNamesFromIntervals('A', [0, 2, 4], 4);
    const instruments = new Instruments();
    return instruments.startPlayingChordByNoteNames(instrumentName, chordNotes, 1)
    .then(() => delay(500))
    .then(() => instruments.stopPlayingChordByNoteNames(instrumentName, chordNotes));
  });

  it('can play chord by chord name', () => {
    const noteNames = Instruments.getNoteNamesFromChordName('A', 'min', 3);
    expect(noteNames).toEqual(['A3', 'C3', 'E3']);
    const instruments = new Instruments();
    return instruments.startPlayingChordByNoteNames(instrumentName, noteNames, 1)
    .then(() => delay(500))
    .then(() => instruments.stopPlayingChordByNoteNames(instrumentName, noteNames));
  });

  it('can ignore second note if it\'s already playing', () => {
    const note = new Note({
      noteNumber: '',
      noteName: 'C4',
      startTimeInMS: 500,
      durationInMS: 100,
      endTimeInMS: 600,
      instrumentName: 'acoustic_grand_piano',
    });
    const instruments = new Instruments();
    instruments.startPlayingNote(note);
    instruments.startPlayingNote(note);
    instruments.startPlayingNote(note);
    instruments.startPlayingNote(note);
    instruments.startPlayingNote(note);
    return delay(5000).then(() => {
      return instruments.stopPlayingNote(note);
    });
  });


//   // it('can compare notes', () => {
//   //   let result = Musician.isInHigherOctave('C', 'D');
//   //   expect(result).toEqual(false);
//   //   result = Musician.isInHigherOctave('D', 'C');
//   //   expect(result).toEqual(true);
//   // });
//   // it('can generate scale notes', () => {
//   //   const scaleNotes1 = Musician.getScaleNotes('C', 'ionian', 3, 4);
//   //   expect(scaleNotes1).toEqual(['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']);
//   //   const scaleNotes2 = Musician.getScaleNotes('A', 'aeolian', 3, 4);
//   //   expect(scaleNotes2).toEqual(['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A5', 'B5', 'C6', 'D6', 'E6', 'F6', 'G6']);
//   //   const scaleNotes3 = Musician.getScaleNotes('A', 'phrygian', 3, 4);
//   //   expect(scaleNotes3).toEqual(['A3', 'A#3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A5', 'A#5', 'C6', 'D6', 'E6', 'F6', 'G6']);
//   // });
//   //
//   // it('can create melody from notes', () => {
//   //   const noteNames = Musician.getScaleNotes('C', 'ionian', 3, 4);
//   //   window.randomSeed = 42;
//   //   const melody = Musician.createMelodyFromNotes(noteNames, 5000);
//   //   expect(JSON.stringify(melody)).toEqual('{"payload":{"notes":[{"payload":{"noteName":"E3","durationInMS":656,"startTimeInMS":434,"endTimeInMS":1090,"name":"A3","noteNumber":-1,"gain":1,"instrumentName":"acoustic_grand_piano","fadeDurationInMS":1000,"id":"acoustic_grand_piano_A3"}},{"payload":{"noteName":"F4","durationInMS":2031,"startTimeInMS":991,"endTimeInMS":3022,"name":"A3","noteNumber":-1,"gain":1,"instrumentName":"acoustic_grand_piano","fadeDurationInMS":1000,"id":"acoustic_grand_piano_A3"}},{"payload":{"noteName":"B4","durationInMS":656,"startTimeInMS":1937,"endTimeInMS":2593,"name":"A3","noteNumber":-1,"gain":1,"instrumentName":"acoustic_grand_piano","fadeDurationInMS":1000,"id":"acoustic_grand_piano_A3"}},{"payload":{"noteName":"F4","durationInMS":558,"startTimeInMS":2040,"endTimeInMS":2598,"name":"A3","noteNumber":-1,"gain":1,"instrumentName":"acoustic_grand_piano","fadeDurationInMS":1000,"id":"acoustic_grand_piano_A3"}},{"payload":{"noteName":"G4","durationInMS":1099,"startTimeInMS":2328,"endTimeInMS":3427,"name":"A3","noteNumber":-1,"gain":1,"instrumentName":"acoustic_grand_piano","fadeDurationInMS":1000,"id":"acoustic_grand_piano_A3"}}],"gain":1,"midiIO":null}}');
//   // });
//   //
//   // it('can play a melody it generated', () => {
//   //   const noteNames = Musician.getScaleNotes('C', 'ionian', 3, 4);
//   //   const melody = Musician.createMelodyFromNotes(noteNames, 5000);
//   //   const musician = new Musician();
//   //   return musician.init().then(() => musician.playMelody(melody));
//   // });
});
*/
