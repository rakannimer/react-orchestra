# React Orchestra

[![CircleCI](https://circleci.com/gh/RakanNimer/react-orchestra.svg?style=shield&circle-token=6fe92a6008747c5902e40a5038690d7e0118865d)](https://circleci.com/gh/RakanNimer/react-orchestra)


A toolbox to build interactive and smart instruments on the web and mobile.

Web example can be seen [here](http://react-orchestra.surge.sh/)

### [Web example repo](https://github.com/RakanNimer/react-orchestra-web-demo)

### [Native example repo](https://github.com/RakanNimer/react-orchestra-native-demo)

## Getting Started

React Orchestra can be integrated easily into any project.

### Prerequisites

#### Native

##### Installing peer dependencies
Under the hood RO uses :

[react-native-sound](https://github.com/zmxv/react-native-sound) to play mp3 sounds.

[react-native-fs](https://github.com/johanneslumpe/react-native-fs) to cache sounds in the filesystem.

[realm](https://github.com/realm/realm-js) as an offline store for caching and state storage ( might remove this in future versions unless I or someone builds up on realm features to improve react-orchestra functionality )


In your project root :

**Install it :**

**With npm**

```
npm install --save react-native-sound react-native-fs realm
```
##### With yarn
```
yarn add react-native-sound react-native-fs realm
```

**Then link it :**

```
react-native link
```

#### Web

**IMPORTANT READ THIS:**

The sound generation and playback for the web orchestra depends on the WebAudio API. Check support for your platform target [here](http://caniuse.com/#feat=audio-api).
If your targeted platform is supported you can go ahead and install it.


### Install react-orchestra

**With npm**

```
npm install --save react-orchestra
```
##### With yarn
```
yarn add react-orchestra
```

No need to link it ! It's plain JS.

And you're good to go 💃.

Let's start writing some instruments.

### TLDR; I just want to copy paste stuff !

There you go :

#### Web

```
yarn add react-orchestra || { npm i -S react-orchestra; }

```
#### Native
```
yarn add react-native-sound react-native-fs realm || { npm i -S react-native-sound react-native-fs realm; }
react-native link react-native-sound react-native-fs realm
yarn add react-orchestra || { npm i -S react-orchestra; }
```

## API + Examples

Let's build a couple of use-cases to get familiar with the API.
Or you can directly check out and run the examples :

- Web example :
```sh
git clone git@github.com:RakanNimer/react-orchestra.git
cd  react-orchestra/web/
{yarn && yarn start} || {npm i && npm start}
```

- Native example :
```sh
git clone git@github.com:RakanNimer/react-orchestra.git
cd  react-orchestra/ReactOrchestraNativeDemo/
yarn || {npm i;}
npm run init-app
react-native run-ios # or run-android
```

**1. A non-interactive instrument that can play notes and sync ui.**

```javascript
import React from 'react';
import { Instrument, Note } from 'react-orchestra/web';
// If you're using react-native then it's :
// import { Instrument, Note } from 'react-orchestra/native';

const delay = ms => new Promise(resolve => setTimeout(ms, resolve));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playA: false,
      playC: false,
    };
  }
  componentDidMount() {
    this.playMelody();
  }
  async playMelody() {
    await delay(1000);
    this.setState({ playA: true });
    await delay(1000);
    this.setState({ playB: true, playA: false });
    await delay(1000);
    this.setState({ playB: false });
  }
  render() {
    return (
      <Instrument name={'acoustic_grand_piano'} interactive={false}>
        <Note name={'A3'} play={this.state.playA}>
          {/*
            You can put any react element here native or web.
          */}
          <div> This is what I want my note to look like ! I can put anything in here.
            <img
              alt="Some pic"
              src="https://s-media-cache-ak0.pinimg.com/originals/36/43/e7/3643e7e8dab9b88b3972ee1c9f909dea.jpg"
            />
          </div>
        </Note>
        <Note name={'C3'} play={this.state.playC}><div>Another note</div></Note>
      </Instrument>
    );
  }
}
export default App;

```

The API aims to be self-explanatory, for example, in the code above we're creating two controlled note components, that we can play and stop using the play prop.

When the component mounts, we start playing a simple melody.

**2. An interactive instrument that the end-user controls.**

Let's build an instrument that the user can play by clicking or tapping on notes.


```javascript
import React from 'react';
import { Instrument, Note } from 'react-orchestra/web';
// If you're using react-native then it's :
// import { Instrument, Note } from 'react-orchestra/native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onStartPlaying.bind(this);
    this.onStopPlaying.bind(this);
  }
  onStartPlaying(noteName) {
    console.warn(`Note played ${noteName}. Use this function if you want to sync your state with the instrument, dispatch redux action or alter mobx observable or just setting state inside your component`);
  }
  onStopPlaying(noteName) {
    console.warn(`Stopped playing ${noteName}. Use this function if you want to sync your state with the instrument, dispatch redux action or alter mobx observable or just setting state inside your component`);
  }
  render() {
    return (
      <Instrument name={'acoustic_grand_piano'} onStartPlaying={this.onStartPlaying} onStopPlaying={this.onStopPlaying} interactive>
        <Note name={'A3'}>
          <div>
            <div>Click me to play A3</div>
          </div>
        </Note>
        <Note name={'C3'}><div>Click me to play C3</div></Note>
      </Instrument>
    );
  }
}
export default App;

```
You don't need to listen to clicks or taps setting the ```interactive``` prop to true will attach the right events and clean them up for you !

The onPlay handler can be used to manage your state.


**3. Playing midi and displaying playback.**

As any orchestra, react-orchestra can learn and play music tracks !
For now, it understands MIDI out of the box, more input sources are in the roadmap.

Let's play Beethoven Moonlight's sonata.

```javascript
import React from 'react';
import { Orchestra } from 'react-orchestra/web';
// If you're using react-native then it's :
// import { Orchestra } from 'react-orchestra/native';
const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playSong: false,
    };
    this.onMidiLoaded = this.onMidiLoaded.bind(this);
    this.onInstrumentsReady = this.onInstrumentsReady.bind(this);
  }
  componentDidMount() {

  }
  onMidiLoaded(parsedMidi) {
    console.warn(`Midi loaded ${JSON.stringify(parsedMidi, 2, 2)}. Loading instruments now ...`);
    return parsedMidi;
  }
  onInstrumentsReady(instruments) {
    console.warn(`Instruments ${JSON.stringify(instruments, 2, 2)} are loaded into memory and ready !`);
    this.setState({ play: true });
    return instruments;
  }
  onNotePlayed(noteName) {
    console.warn(`Note ${noteName} was played, optionally handle this event`);
  }
  render() {
    return (
      <Orchestra
        midiURL={midiURL}
        onMidiLoaded={this.onMidiLoaded}
        onInstrumentsReady={this.onInstrumentsReady}
        play={this.state.playSong}
        selectedTracks={[0, 1]}
        onNotePlayed={this.onNotePlayed}
      >
        <div> This is an orchestra it can play complex melodies ! </div>
      </Orchestra>
    );
  }
}
export default App;
```

**4. Creating a note factory **

This is useful when you want to generate notes that follow a given rule

Example : Render the C Major scale starting at the third octave over 2 octaves

```javascript
import React from 'react';
import { NoteFactory } from 'react-orchestra/web';

const renderNote = (instrumentName, noteName) => <div style={{ cursor: 'pointer' }}> I am a note : {instrumentName} {noteName} You can click me ! </div>;

class NoteFactoryExample extends React.Component {
  render() {
    return (
      <NoteFactory
        type="scale"
        scaleName="ionian"
        noteName="C"
        instrumentName="acoustic_grand_piano"
        startOctave="3"
        octaveCount="1"
        renderNote={renderNote}
      />
    );
  }
}
export default NoteFactoryExample;

```
## Documentation

- [API](docs/api.md#api)
  - [`<Note>`](docs/api.md#Note)
  - [`<Instrument>`](docs/api.md#Instrument)
  - [`<Orchestra>`](docs/api.md#Orchestra)
  - [`<NoteFactory>`](docs/api.md#NoteFactory)
  - [`<KeyBinding>` (*web only*)](docs/api.md#KeyBinding)

## Showcase

Did you build something cool with this library ?

Show it off here by [submittiing a pull request](https://github.com/RakanNimer/react-orchestra/compare).

## Running the tests

```
npm test
```

Tests lint all js files using the js airbnb coding style and runs the jest tests in \_\_tests__ directory.



## Contributing

You can contribute by submitting, and responding to issues. If you'd like to add a new feature PRs are very welcome, but please open an issue beforehand so we can discuss the optimal way to go when adding the feature !


## Roadmap

- [x] Create NoteFactory component that takes in a scale name or chord name or Midi URL and creates user-rendered Notes.
- [ ] Add tests that run on browser
- [ ] Add react-orchestra/native jest tests
- [ ] Add more web jest tests


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
