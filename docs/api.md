## API

<a id="Note"></a>
### `<Note>`

An HOC that gives functionality to a child UI element

#### Props


* `play` (*Boolean*) Play note. Useful when a note is a controlled component.
* `name` (*String*): Note names from octave 1 to octave 7 [Full list of
 supported notes](/web/src/constants/NOTE_NAMES.js).
* `instrumentName` (*String*): Instrument name from the MusyngKite soundfont. [Full list of supported instruments](/web/src/constants/INSTRUMENTS.js). This is optional if the <Note/> is a child of an <Instrument/>
* `onNoteLoaded` (*Function*) A callback fired when note is loaded ( from network or cache ).
* `onStopPlayingNote` (*Function*) A callback fired when a note is played.
* `onStartPlayingNote` (*Function*) A callback fired when note stops being played.
* `interactive` (*Boolean*) Determines if a component should listen to click/tap events.
* `fadeOutDuration` (*Number*) Fadeout time in milliseconds of a note after it is released. Default is 600 ms.
* `gain` (*Number*) Sound gain. Defaults to 1.
* `loader` (*ReactElement*) A loader to render while note is being loaded.
* `children` (*ReactElement*) A UI component that represents the DOM or native environment.

#### Example

```js
ReactDOM.render(
  <Instrument name="acoustic_grand_piano">
    <Note name="A3">
      <MyCustomNoteUI />
    </Note>
  </Instrument>,
  rootEl
)
// OR
ReactDOM.render(
  <Note name="A3" instrumentName="acoustic_grand_piano">
    <MyCustomNoteUI />
  </Note>,
  rootEl
)
```

<a id="Instrument"></a>
### `<Instrument>`

A wrapper component to control multiple notes.

#### Props

* `name` (*String*): Instrument name from the MusyngKite soundfont. [Full list of supported instruments](/web/src/constants/INSTRUMENTS.js).
* `loader` (*ReactElement*) A loader to render while instrument is being loaded.

#### Example

```js
ReactDOM.render(
  <Instrument name="acoustic_grand_piano">
    <Note name="A3">
      <MyCustomNoteUI />
    </Note>
  </Instrument>,
  rootEl
)
```

<a id="Orchestra"></a>
### `<Orchestra>`

A component that renders a midiURL as interactive, playable notes.

#### Props

* `play` (*Boolean*) Play midi track. Useful when Orchestra is a controlled component.
* `midiURL` (*String*): Note names from octave 1 to octave 7 [Full list of
 supported notes](/web/src/constants/NOTE_NAMES.js).
* `selectedTracks` (*[Integer]*): tracks of midi file to play.
* `onMidiLoaded` (*Function*) A callback fired when midi file is loaded ( from network or cache ) and parsed.
* `onInstrumentsReady` (*Function*) A callback fired when all the notes in the selected midi tracks are loaded ( from network or cache ).
* `onNotePlayed` (*Function*) A callback fired when a note is played either by the user clicking it or by being controlled by the Orchestra component
* `renderNote` (*Function(instrumentName, noteName)*) A callback fired for each note that is being rendered by the orchestra. Should return a valid *ReactElement*.
 released. Default is 600 ms.
* `loader` (*ReactElement*) A loader to render while Orchestra is being loaded.

#### Example

Check [examples directory](/web/demo/src/components/).

<a id="NoteFactory"></a>
### `<NoteFactory>`

A component that renders notes based on a given rule (scale for now, chords and midiURL in the roadmap).

#### Props

* `type` (*String*): Generator type. `scale`.
* `scaleName` (*String*): Scale name, full list [available here](/web/src/constants/SCALES.js)
* `noteName` (*String*) First note name to generated the scale based on.
* `instrumentName` (*String*): Instrument name from the MusyngKite soundfont. [Full list of supported instruments](/web/src/constants/INSTRUMENTS.js). This is optional if the <Note/> is a child of an <Instrument/>
* `startOctave` (*Integer*) Starting octave for note generation.
* `octaveCount` (*Integer*) Number of octaves to render.
* `renderNote` (*Function(instrumentName, noteName)*) A callback fired for each note that is being rendered by the NoteFactory. Should return a valid *ReactElement*.
 released. Default is 600 ms.

#### Example

Check [examples directory](/web/demo/src/components/).

<a id="KeyBinding"></a>
### `<KeyBinding>` (*web only*)

A micro helper component that listens to keyboard events to help controlling note state with keyboard.

#### Props

* `keyName` (*String*): Keyboard keys and shortcuts to listen to. Wrapper to [react-keymaster](https://github.com/RakanNimer/react-keymaster)
* `onKeyDown` (*Function(keyName)*) A callback fired when ``` keyName ``` is pressed on the keyboard
* `onKeyUp` (*Function(keyName)*) A callback fired when ``` keyName ``` stops being pressed on the keyboard

#### Example

Check [examples directory](/web/demo/src/components/).
