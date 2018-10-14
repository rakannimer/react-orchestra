import React from "react";
//@ts-ignore
import ReactKeyMaster from "react-keymaster";
import callIfExists from "../utils/callIfExists";
type KeyBindingProps = {
  keyName: string;
  onKeyDown?: (...args: any[]) => any;
  onKeyUp?: (...args: any[]) => any;
};
// import Note from '../utils/callIfExists';
export default class KeyBinding extends React.Component<KeyBindingProps, {}> {
  render() {
    return (
      <ReactKeyMaster
        keyName={this.props.keyName}
        onKeyDown={(keyName: string) => {
          callIfExists(this.props.onKeyDown, keyName);
        }}
        onKeyUp={(keyName: string) => {
          callIfExists(this.props.onKeyUp, keyName);
        }}
      />
    );
  }
}
