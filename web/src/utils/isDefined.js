const isDefined = (checkMe, defaultValue) =>
  (typeof checkMe !== 'undefined' && checkMe !== null ? checkMe : defaultValue);

export default isDefined;
