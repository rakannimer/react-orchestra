import _ from 'lodash';

/** Note class. Must be used to create and play notes. */
class Note {
  constructor(note = {}) {
    this.payload = _.defaultsDeep(note, {
      name: 'A3',
      noteNumber: -1,
      gain: 1,
      instrumentName: 'acoustic_grand_piano',
      startTimeInMS: 0,
      durationInMS: 100,
      endTimeInMS: 100,
      fadeDurationInMS: 1000,
      deltaTime: 0,
      msPerTick: 0,
    });
    this.payload.id = note.id ? note.id : `${this.payload.instrumentName}_${this.payload.name}`;
  }
  /**
   * Updates note instrument
   * @param instrumentName. List of all instrument names in src/constants/INSTRUMENTS
   */
  setInstrument(instrumentName) {
    this.payload.instrumentName = instrumentName;
  }
  /**
   * Update note
   * @param updatedPayloadFields. Object containing all or part of the payload fields.
   * @returns {object} this
   */
  update(updatedPayloadFields) {
    this.payload = Object.assign({}, this.payload, updatedPayloadFields);
    return this;
  }
}
export default Note;
