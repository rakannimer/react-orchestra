const callIfExists = (fnc, ...args) => {
  if (fnc) {
    return fnc(...args);
  }
  return null;
};
export default callIfExists;
