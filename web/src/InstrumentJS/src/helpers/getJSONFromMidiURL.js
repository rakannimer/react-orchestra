/* mod */
import MidiIO from '../../MidiIO';

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

const getJSONFromMidiURL = url => MidiIO.parseMidi(url);

export default getJSONFromMidiURL;
