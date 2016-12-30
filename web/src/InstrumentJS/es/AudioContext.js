var getAudioContext = function getAudioContext() {
  var AudioContext = window.AudioContext // Default
  || window.webkitAudioContext // Safari and old versions of Chrome
  || false;
  if (!AudioContext) {
    alert('Sorry but the WebAudio API is not supported on this browser. Please consider using Chrome or Safari for the best experience ');
    return null;
  }
  return new AudioContext();
};

var audioContext = getAudioContext();
export default audioContext;