'use strict';

exports.__esModule = true;
var noteNames = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];
var noteNamesWithOctaves = [];
var octaves = [0, 1, 2, 3, 4, 5, 6, 7];
octaves.forEach(function (octave) {
  noteNames.forEach(function (noteName) {
    noteNamesWithOctaves.push('' + noteName + octave);
  });
});

exports.noteNames = noteNames;
exports.noteNamesWithOctaves = noteNamesWithOctaves;
exports.octaves = octaves;