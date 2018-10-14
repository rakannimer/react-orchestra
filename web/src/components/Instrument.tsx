import React from "react";
import classnames from "classnames";
import callIfExists from "../utils/callIfExists";

export type InstrumentProps = {
  onStartPlaying?: (noteName: string) => void;
  onStopPlaying?: (noteName: string) => void;
  onInstrumentLoaded?: (instrumentName: string, noteName: string) => void;
  name: string;
  loader?: any;
  style?: any;
  interactive?: boolean;
};

class Instrument extends React.Component<InstrumentProps> {
  loadingNotesCounter = 0;
  state = {
    isLoaded: false
  };
  static defaultProps = {
    name: "acoustic_grand_piano"
  };
  onStartPlaying = (noteName: string) => {
    callIfExists(this.props.onStartPlaying, noteName);
  };
  onStopPlaying = (noteName: string) => {
    callIfExists(this.props.onStopPlaying, noteName);
  };
  onNoteLoaded = (instrumentName: string, noteName: string) => {
    this.loadingNotesCounter += 1;
    const { children } = this.props;
    //@ts-ignore
    const noteCount = children ? children.length : 0;
    if (noteCount === this.loadingNotesCounter) {
      this.setState({ isLoaded: true });
      callIfExists(this.props.onInstrumentLoaded, this.props.name, noteName);
    }
  };
  render() {
    // Because I can !
    const loader = this.state.isLoaded ? null : this.props.loader ? (
      this.props.loader
    ) : (
      <div>
        <span>Loading Instrument 🚚 🚚 🚚</span>
      </div>
    );
    return (
      <div
        style={this.props.style}
        className={classnames(
          { "ro-instrument-loading": !this.state.isLoaded },
          { "ro-instrument-loaded": this.state.isLoaded }
        )}
      >
        {React.Children.map(this.props.children, (child: any) =>
          React.cloneElement(child, {
            instrumentName: child.props.instrumentName || this.props.name,
            onStartPlaying: this.onStartPlaying,
            onStopPlaying: this.onStopPlaying,
            onNoteLoaded: this.onNoteLoaded,
            interactive: this.props.interactive || true
          })
        )}
      </div>
    );
  }
}

export default Instrument;
