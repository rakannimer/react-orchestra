import _regeneratorRuntime from 'babel-runtime/regenerator';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import localforage from 'localforage';

var store = {
  init: function init() {
    localforage.config({
      // driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
      name: 'react_orchestra',
      version: 1.0,
      size: 4980736, // Size of database, in bytes. WebSQL-only for now.
      storeName: 'react_orchestra', // Should be alphanumeric, with underscores.
      description: 'React Orchestra storage to cache mp3 notes and store app state'
    });
    this.db = localforage.createInstance({
      name: 'react_orchestra'
    });
  },
  set: function set(key, value) {
    var _this = this;

    return _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _this.db.setItem(key, value);

            case 3:
              return _context.abrupt('return', _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);

              console.warn('Error : ' + _JSON$stringify(_context.t0.message, 2, 2));
              return _context.abrupt('return', null);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 6]]);
    }))();
  },
  get: function get(key) {
    var _this2 = this;

    return _asyncToGenerator(_regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _this2.db.getItem(key);

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](0);

              console.warn('Error : ' + _JSON$stringify(_context2.t0.message, 2, 2));
              return _context2.abrupt('return', null);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 6]]);
    }))();
  },
  exists: function exists(key) {
    var _this3 = this;

    return _asyncToGenerator(_regeneratorRuntime.mark(function _callee3() {
      var value;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _this3.db.getItem(key);

            case 3:
              value = _context3.sent;
              return _context3.abrupt('return', value !== null);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](0);

              console.warn('Error : ' + _JSON$stringify(_context3.t0.message, 2, 2));
              return _context3.abrupt('return', false);

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 7]]);
    }))();
  }
};

store.init();

export default store;