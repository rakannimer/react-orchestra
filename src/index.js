// require("babel-core/register");
// require("babel-polyfill");

import {
  Note,
  Instrument,
  Orchestra,
} from './platforms/web/';

window.isTouchDevice = 'ontouchstart' in document.documentElement;
export default {
  Instrument,
  Note,
  Orchestra,
}

export {
  Instrument,
  Note,
  Orchestra,
};


// class App extends React.Component {
//   render() {
//     return <div>
//       <Note />
//       <Instrument />
//       <Orchestra />
//       Orchestra web main
//     </div>
//   }
// }
// export default App;
