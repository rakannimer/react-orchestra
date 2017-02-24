module.exports = {
  type: 'web-module',
  npm: {
    esModules: true,
    umd: {
      global: 'MidiIO',
      externals: {}
    }
  },
  karma: {
    browsers: ['Chrome'],
    plugins: [require('karma-chrome-launcher')]
  }
};