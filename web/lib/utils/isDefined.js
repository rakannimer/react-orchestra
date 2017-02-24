'use strict';

exports.__esModule = true;
var isDefined = function isDefined(checkMe, defaultValue) {
  return typeof checkMe !== 'undefined' && checkMe !== null ? checkMe : defaultValue;
};

exports.default = isDefined;
module.exports = exports['default'];