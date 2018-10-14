import React from "react";
import Note from "./Note";

import callIfExists from "../utils/callIfExists";
import getScaleNotes from "../utils/get-scale-notes";

const createNotesFromScale = (
  noteName = "C",
  scaleName = "ionian",
  startOctave = 2,
  octaveCount = 1
) => getScaleNotes(noteName, scaleName, startOctave, octaveCount);

// createNote

export type NoteFactoryProps = {
  noteName: string;
  scaleName: string;
  instrumentName: string;
  startOctave: number;
  octaveCount: number;
  noteProps: any;
  renderNote: (a: any) => any;
  type: "scale";
};

class NoteFactory extends React.Component<NoteFactoryProps> {
  renderNotesFromScale() {
    const {
      noteName,
      scaleName,
      instrumentName,
      startOctave,
      octaveCount
    } = this.props;
    const notes = createNotesFromScale(
      noteName,
      scaleName,
      startOctave,
      octaveCount
    );
    const notesElements = notes.map((currentNoteName, i) => (
      <Note
        key={i}
        name={currentNoteName}
        instrumentName={instrumentName}
        startOctave={startOctave}
        octaveCount={octaveCount}
        {...this.props.noteProps}
      >
        {callIfExists(
          this.props.renderNote,
          instrumentName,
          currentNoteName,
          i
        )}
      </Note>
    ));
    return notesElements;
  }

  render() {
    let renderedNotes;
    switch (this.props.type) {
      case "scale":
        renderedNotes = this.renderNotesFromScale();
        break;
      default:
        renderedNotes = null;
        break;
    }
    return <div>{renderedNotes}</div>;
  }
}
export default NoteFactory;
