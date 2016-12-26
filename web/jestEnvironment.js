// import 'babel-core/polyfill';
import 'web-audio-test-api';

jest.mock('localforage', () => ({
  config: () => {},
  createInstance: () => ({
    getItem: () => {},
    setItem: () => {},
  }),
}));
