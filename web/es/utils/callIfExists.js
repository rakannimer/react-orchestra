var callIfExists = function callIfExists(fnc) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (fnc) {
    return fnc.apply(undefined, args);
  }
  return null;
};
export default callIfExists;