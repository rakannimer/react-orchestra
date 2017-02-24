import _regeneratorRuntime from "babel-runtime/regenerator";
import _asyncToGenerator from "babel-runtime/helpers/asyncToGenerator";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";

var Sound = function () {
  function Sound(localPath) {
    _classCallCheck(this, Sound);

    this.id = localPath;
    this.localPath = localPath;
    return this;
  }

  Sound.prototype.load = function () {
    var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(remotePath) {
      var note;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
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

export default Sound;