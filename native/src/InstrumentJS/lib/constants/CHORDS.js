'use strict';

exports.__esModule = true;
var chords = {
  maj: {
    name: 'Major',
    sequence: [0, 4, 7]
  },
  min: {
    name: 'Minor',
    sequence: [0, 3, 7]
  },
  dom7: {
    name: 'Dominant Seventh',
    sequence: [0, 4, 7, 10]
  },
  min7: {
    name: 'Minor Seventh',
    sequence: [0, 3, 7, 10]
  },
  sus4: {
    name: 'Suspended Fourth',
    sequence: [0, 6, 7]
  },
  maj6: {
    name: 'Sixth',
    sequence: [0, 4, 7, 9]
  },
  min6: {
    name: 'Minor Sixth',
    sequence: [0, 3, 7, 9]
  },
  aug: {
    name: 'Augmented',
    sequence: [0, 4, 8]
  },
  dim: {
    name: 'Diminished Seventh',
    sequence: [0, 3, 6]
  },
  '7dim5': {
    // 7dim5
    name: 'Seventh Diminished Fifth',
    sequence: [0, 4, 6, 10]
  },
  '7aug5': {
    // C E G# A#
    name: 'Seventh Augmented Fifth',
    sequence: [0, 4, 8, 10]
  },
  min7dim5: {
    name: 'Half Diminished Seventh',
    sequence: [0, 3, 6, 10]
  },
  min5maj7: {
    name: 'Minor/Major Seventh',
    sequence: [0, 3, 7, 11]
  },
  maj7aug5: {
    name: 'Major Seventh Augmented Fifth',
    sequence: [0, 4, 8, 11]
  },
  maj7dim5: {
    // C E F# B
    name: 'Major Seventh Diminished Fifth',
    sequence: [0, 4, 6, 11]
  },
  maj9: {
    // C E G A# D
    name: 'Ninth',
    sequence: [0, 4, 7, 10, 14]
  },
  min9: {
    // C D# G A# D
    name: 'Minor ninth',
    sequence: [0, 3, 7, 10, 14]
  }
};
exports.default = chords;
module.exports = exports['default'];