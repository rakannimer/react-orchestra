/* mod */
import getJSONFromMidiURL from './getJSONFromMidiURL';
import getTracksAndMetaFromParsedMidi from './getTracksAndMetaFromParsedMidi';

/**
 * get all tracks and meta information from  a midi url hosted online
 * @param  {string} url  url of midi file that needs to be converted
 * @example
 * getTracksAndMetaFromUrl('https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid') // returns {tracks: [], meta: {}}
 * @return {object} {tracks: [], meta: {}}
 */
var getTracksAndMetaFromUrl = function getTracksAndMetaFromUrl(url) {
  return getJSONFromMidiURL(url).then(getTracksAndMetaFromParsedMidi);
};

export default getTracksAndMetaFromUrl;