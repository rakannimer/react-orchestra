"use strict";

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sound = function () {
  function Sound(localPath) {
    (0, _classCallCheck3.default)(this, Sound);

    this.id = localPath;
    this.localPath = localPath;
    return this;
  }

  Sound.prototype.load = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(remotePath) {
      var note;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(remotePath);

            case 2:
              note = _context.sent;
              return _context.abrupt("return", { note: note, localPath: this.localPath });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function load(_x) {
      return _ref.apply(this, arguments);
    }

    return load;
  }();

  return Sound;
}();

exports.default = Sound;
module.exports = exports["default"];