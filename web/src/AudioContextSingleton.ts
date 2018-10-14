const getAudioContext = () => {
  const AudioContext =
    // @ts-ignore
    window.AudioContext || // Default
    // @ts-ignore
    window.webkitAudioContext || // Safari and old versions of Chrome
    false;
  if (!AudioContext) {
    console.warn(
      "Sorry but the WebAudio API is not supported on this browser. Please consider using Chrome or Safari for the best experience "
    );
    return {};
    // throw new Error('PLATFORM_NOT_SUPPORTED');
  }
  return new AudioContext();
};

const audioContext = getAudioContext();
export default audioContext;
