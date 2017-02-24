var isDefined = function isDefined(checkMe, defaultValue) {
  return typeof checkMe !== 'undefined' && checkMe !== null ? checkMe : defaultValue;
};

export default isDefined;