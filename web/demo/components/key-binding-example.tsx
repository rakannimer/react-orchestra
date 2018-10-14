import React from "react";
import { KeyBinding, Note } from "../../src/";

const renderNote = (instrumentName, noteName, shouldPlay) => (
  <div
    className={`button ${shouldPlay ? "is-primary" : ""}`}
    style={{ cursor: "pointer" }}
  >
    I am a note : {instrumentName} {noteName} You can click me ! or play me
    using your keyboard !
  </div>
);

class KeyBindingExample extends React.Component {
  state = {
    play: {}
  };
  onKeyDown = keyName => {
    console.warn(`NoteDown ${JSON.stringify(keyName, 2, 2)}`);
    this.setState({
      play: {
        [keyName]: true
      }
    });
  };
  onKeyUp = keyName => {
    console.warn(`NoteUp ${JSON.stringify(keyName, 2, 2)}`);
    this.setState({
      play: {
        [keyName]: false
      }
    });
  };
  render() {
    return (
      <div>
        <KeyBinding
          keyName="q"
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
        />
        <Note name="A3" instrumentName="alto_sax" play={this.state.play.q}>
          {renderNote("alto_sax", "A3", this.state.play.q)}
        </Note>
        <KeyBinding
          keyName="w"
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
        />
        <Note name="B3" instrumentName="alto_sax" play={this.state.play.w}>
          {renderNote("alto_sax", "B3", this.state.play.w)}
        </Note>
        <KeyBinding
          keyName="e"
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
        />
        <Note name="C3" instrumentName="alto_sax" play={this.state.play.e}>
          {renderNote("alto_sax", "C3", this.state.play.e)}
        </Note>
        <KeyBinding
          keyName="r"
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
        />
        <Note name="D3" instrumentName="alto_sax" play={this.state.play.r}>
          {renderNote("alto_sax", "D3", this.state.play.r)}
        </Note>
        <KeyBinding
          keyName="t"
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
        />
        <Note name="E3" instrumentName="alto_sax" play={this.state.play.t}>
          {renderNote("alto_sax", "E3", this.state.play.t)}
        </Note>
        <KeyBinding
          keyName="y"
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
        />
        <Note name="F3" instrumentName="alto_sax" play={this.state.play.y}>
          {renderNote("alto_sax", "F3", this.state.play.y)}
        </Note>
        <KeyBinding
          keyName="u"
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
        />
        <Note name="G3" instrumentName="alto_sax" play={this.state.play.u}>
          {renderNote("alto_sax", "G3", this.state.play.u)}
        </Note>
      </div>
    );
  }
}
export default KeyBindingExample;
