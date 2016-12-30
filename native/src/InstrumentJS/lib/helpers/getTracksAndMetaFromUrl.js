'use strict';

exports.__esModule = true;

var _getJSONFromMidiURL = require('./getJSONFromMidiURL');

var _getJSONFromMidiURL2 = _interopRequireDefault(_getJSONFromMidiURL);

var _getTracksAndMetaFromParsedMidi = require('./getTracksAndMetaFromParsedMidi');

var _getTracksAndMetaFromParsedMidi2 = _interopRequireDefault(_getTracksAndMetaFromParsedMidi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get all tracks and meta information from  a midi url hosted online
 * @param  {string} url  url of midi file that needs to be converted
 * @example
 * getTracksAndMetaFromUrl('https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid') // returns {tracks: [], meta: {}}
 * @return {object} {tracks: [], meta: {}}
 */
/* mod */
var getTracksAndMetaFromUrl = function getTracksAndMetaFromUrl(url) {
  return (0, _getJSONFromMidiURL2.default)(url).then(_getTracksAndMetaFromParsedMidi2.default);
};

exports.default = getTracksAndMetaFromUrl;
module.exports = exports['default'];