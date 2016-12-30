const chords = {
  maj: {
    name: 'Major',
    sequence: [0, 4, 7],
  },
  min: {
    name: 'Minor',
    sequence: [0, 3, 7],
  },
  dom7: {
    name: 'Dominant Seventh',
    sequence: [0, 4, 7, 10],
    // C E G A#
  },
  min7: {
    name: 'Minor Seventh',
    sequence: [0, 3, 7, 10],
    // C D# G A#
    // c c# d d# e f f# g g# a a# b
  },
  sus4: {
    name: 'Suspended Fourth',
    sequence: [0, 6, 7],
    // C F G
  },
  maj6: {
    name: 'Sixth',
    sequence: [0, 4, 7, 9],
    //  C E G A
  },
  min6: {
    name: 'Minor Sixth',
    sequence: [0, 3, 7, 9],
    // C D# G A
  },
  aug: {
    name: 'Augmented',
    sequence: [0, 4, 8],
    // C E G#
  },
  dim: {
    name: 'Diminished Seventh',
    sequence: [0, 3, 6],
    // C D# F#
  },
  '7dim5': {
    // 7dim5
    name: 'Seventh Diminished Fifth',
    sequence: [0, 4, 6, 10],
    // C E F# A#
  },
  '7aug5': {
    // C E G# A#
    name: 'Seventh Augmented Fifth',
    sequence: [0, 4, 8, 10],
  },
  min7dim5: {
    name: 'Half Diminished Seventh',
    sequence: [0, 3, 6, 10],
    // C D# F# A#
  },
  min5maj7: {
    name: 'Minor/Major Seventh',
    sequence: [0, 3, 7, 11],
    // C D# G B
    // m/maj7
  },
  maj7aug5: {
    name: 'Major Seventh Augmented Fifth',
    sequence: [0, 4, 8, 11],
    // C E G# B
  },
  maj7dim5: {
    // C E F# B
    name: 'Major Seventh Diminished Fifth',
    sequence: [0, 4, 6, 11],
  },
  maj9: {
    // C E G A# D
    name: 'Ninth',
    sequence: [0, 4, 7, 10, 14],
  },
  min9: {
    // C D# G A# D
    name: 'Minor ninth',
    sequence: [0, 3, 7, 10, 14],
  },
};
export default chords;
