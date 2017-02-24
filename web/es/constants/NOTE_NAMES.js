var noteNames = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];
var noteNamesWithOctaves = [];
var octaves = [0, 1, 2, 3, 4, 5, 6, 7];
octaves.forEach(function (octave) {
  noteNames.forEach(function (noteName) {
    noteNamesWithOctaves.push('' + noteName + octave);
  });
});

export { noteNames, noteNamesWithOctaves, octaves };