const noteNames = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];
const noteNamesWithOctaves = [];
const octaves = [0, 1, 2, 3, 4, 5, 6, 7];
octaves.forEach((octave) => {
  noteNames.forEach((noteName) => {
    noteNamesWithOctaves.push(`${noteName}${octave}`);
  });
});

export {
  noteNames,
  noteNamesWithOctaves,
  octaves,
};
