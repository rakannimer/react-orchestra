# React Orchestra


[![CircleCI](https://circleci.com/gh/RakanNimer/react-orchestra.svg?style=shield&circle-token=6fe92a6008747c5902e40a5038690d7e0118865d)](https://circleci.com/gh/RakanNimer/react-orchestra)


A toolbox to build interactive and smart instruments on the web and mobile.

## Getting Started

React Orchestra can be integrated easily into any project.

### Prerequisites

#### Native

##### Installing peer dependencies
Under the hood RO uses [react-native-sound](https://github.com/zmxv/react-native-sound) to play and generate instrument notes.

In your project root :

**Install it :**

**With npm**

```
npm install --save react-native-sound
```
##### With yarn
```
yarn add react-native-sound
```

**Then link it :**

```
react-native link react-native-sound
```

#### Web

**IMPORTANT READ THIS:**

The sound generation and playback for the web orchestra depends on the WebAudio API. Check support for your platform target [here](http://caniuse.com/#feat=audio-api).
If your targeted platform is supported you can go ahead and install it.


### Install react-orchestra

**With npm**

```
npm install --save react-native-sound
```
##### With yarn
```
yarn add react-native-sound
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
yarn add react-native-sound || { npm i -S react-native-sound; }
react-native link react-native-sound
yarn add react-orchestra || { npm i -S react-orchestra; }
```

## API + Examples

Let's build a couple of use-cases to get familiar with the API.

**1. A non-interactive instrument that can play notes and sync ui.**

```javascript
import React from 'react';
import { Instrument, Note } from 'react-orchestra';

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
import { Instrument, Note } from 'react-orchestra';

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
import { Orchestra } from 'react-orchestra';

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
        selectedTracks={tracks => tracks}
        onNotePlayed={this.onNotePlayed}
      >
        <div> This is an orchestra it can play complex melodies ! </div>
      </Orchestra>
    );
  }
}
export default App;
```



The examples assume your project has a couple of babel plugins, if they don't work out of the box, check the [Babel Config](TODO: Build Babel config section :D ) section.



## Running the tests

```
npm test
```

Tests lint all js files using the js airbnb coding style and runs the jest tests in \_\_tests__ directory.



## Contributing

You can contribute by submitting, and responding to issues. If you'd like to add a new feature PRs are very welcome, but please open an issue beforehand so we can discuss the optimal way to go when adding the feature !


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
