'use strict';

exports.__esModule = true;

var _MidiIO = require('../../MidiIO');

var _MidiIO2 = _interopRequireDefault(_MidiIO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Download midi from url and parse it into JSON {meta, musicTracks}.
 * Wrapper around MidiIO.parseMidi(url)
 * @function
 * @name getJSONFromMidiURL
 * @param {string} url - URL to a midi file.
 * @example
 * getJSONFromMidiURL('https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid')
 * .then((metaAndMusicTracks) => {
 *   const {meta, musicTracks} = metaAndMusicTracks;
 * })
 * @return {Promise.<object>}
 */

var getJSONFromMidiURL = function getJSONFromMidiURL(url) {
  return _MidiIO2.default.parseMidi(url);
}; /* mod */
exports.default = getJSONFromMidiURL;
module.exports = exports['default'];