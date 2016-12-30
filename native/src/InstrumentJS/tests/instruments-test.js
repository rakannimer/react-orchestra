/* eslint-env node, mocha */

import expect from 'expect';
// import AudioContext from 'src/AudioContext';
import Instruments from 'src/Instruments';
import Note from 'src/Note';
// import Melody from 'src/Melody';
// import Musician from 'src/Musician';

// const instrumentName = 'acoustic_grand_piano';

window.delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let instruments;

describe('Instruments test', function () {
  this.timeout(25000);
  before(() => {
    instruments = new Instruments();
  });
  it('can say Hi', () => {
    console.log('Hi');
  });
  it('can get Instrument by name', () => {
    const stringifiedInstrument = '{"context":{},"out":{},"opts":{"gain":1,"attack":0.01,"decay":0.1,"sustain":0.9,"release":0.3,"loop":false,"cents":0,"loopStart":0,"loopEnd":0},"buffers":{"21":{},"22":{},"23":{},"24":{},"25":{},"26":{},"27":{},"28":{},"29":{},"30":{},"31":{},"32":{},"33":{},"34":{},"35":{},"36":{},"37":{},"38":{},"39":{},"40":{},"41":{},"42":{},"43":{},"44":{},"45":{},"46":{},"47":{},"48":{},"49":{},"50":{},"51":{},"52":{},"53":{},"54":{},"55":{},"56":{},"57":{},"58":{},"59":{},"60":{},"61":{},"62":{},"63":{},"64":{},"65":{},"66":{},"67":{},"68":{},"69":{},"70":{},"71":{},"72":{},"73":{},"74":{},"75":{},"76":{},"77":{},"78":{},"79":{},"80":{},"81":{},"82":{},"83":{},"84":{},"85":{},"86":{},"87":{},"88":{},"89":{},"90":{},"91":{},"92":{},"93":{},"94":{},"95":{},"96":{},"97":{},"98":{},"99":{},"100":{},"101":{},"102":{},"103":{},"104":{},"105":{},"106":{},"107":{},"108":{}},"url":"https://d2ovwkm0xvqw0n.cloudfront.net/MusyngKite/acoustic_grand_piano-mp3.js","name":"acoustic_grand_piano"}';
    return instruments.get('acoustic_grand_piano').then((result) => {
      expect(JSON.stringify(result)).toEqual(stringifiedInstrument);
    });
  });
  it('can startPlayingNote', () => {
    const note = new Note();
    return instruments.startPlayingNote(note); // .then(() => delay(2000));
  });

  it('can play delayed notes', () => {
    const note = new Note({
      startTimeInMS: 2000,
      endTimeInMS: 3000,
      durationInMS: 1000,
    });
    return instruments.startPlayingNote(note); // .then(() => delay(2000));
  });

  it('can stopPlayingNote', () => {
    const note = new Note({
      startTimeInMS: 0,
      endTimeInMS: 3000,
      durationInMS: -1,
      fadeDurationInMS: 0,
    });
    return instruments.startPlayingNote(note).then(() => delay(100))
    .then(() => {
      return instruments.stopPlayingNote(note, 0);
    });
  });
  it('can startPlayingChordByNoteNames', () => {
    const noteSettings = {
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 2000,
      endTimeInMS: 2000,
    };
    return instruments.startPlayingChordByNoteNames(['A3', 'C3', 'E3'],
      noteSettings
    );
  });
  it('can stopPlayingChordByNoteNames', () => {
    const noteSettings = {
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 2000,
      endTimeInMS: 2000,
      fadeDurationInMS: 0,
    };
    instruments.startPlayingChordByNoteNames(['A3', 'C3', 'E3'],
      noteSettings
    );
    return window.delay(100).then(() => instruments.stopPlayingChordByNoteNames(['A3', 'C3', 'E3'], noteSettings));
  });
  it('can startPlayingChordByChordName', () => {
    const noteSettings = {
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 2000,
      endTimeInMS: 2000,
      fadeDurationInMS: 0,
    };
    return instruments.startPlayingChordByChordName('A3', 'maj', noteSettings)
    .then(() =>
      instruments.startPlayingChordByChordName('D3', 'maj', noteSettings)
    )
    .then(() =>
      instruments.startPlayingChordByChordName('E3', 'maj', noteSettings)
    );
  });
  it('can stopPlayingChordByChordName', () => {
    const noteSettings = {
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 2000,
      endTimeInMS: 2000,
      fadeDurationInMS: 0,
    };
    instruments.startPlayingChordByChordName('A3', 'maj', noteSettings);
    return delay(100).then(() => {
      instruments.stopPlayingChordByChordName('A3', 'maj', noteSettings);
    });
  });
});
