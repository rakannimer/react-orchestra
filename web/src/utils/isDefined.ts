const isDefined = (checkMe: any, defaultValue: any) =>
  typeof checkMe !== "undefined" && checkMe !== null ? checkMe : defaultValue;

export default isDefined;
