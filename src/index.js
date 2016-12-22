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
};

export {
  Instrument,
  Note,
  Orchestra,
};
