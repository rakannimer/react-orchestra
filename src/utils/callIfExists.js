const callIfExists = (fnc, ...args) => {
  if (fnc) {
    fnc(...args);
  }
};
export default callIfExists;
