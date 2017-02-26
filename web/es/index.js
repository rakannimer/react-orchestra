import Instrument from './components/Instrument';
import Note from './components/Note';
import Orchestra from './components/Orchestra';
import NoteFactory from './components/NoteFactory';
import KeyBinding from './components/KeyBinding';
import MusicManager from './MusicManager';
// import NoteHelpers from './utils/NoteHelpers';

window.isTouchDevice = 'ontouchstart' in document.documentElement;

export default {
  Instrument: Instrument,
  Note: Note,
  Orchestra: Orchestra,
  NoteFactory: NoteFactory,
  KeyBinding: KeyBinding,
  MusicManager: MusicManager
};

export { Instrument, Note, Orchestra, NoteFactory, KeyBinding, MusicManager };