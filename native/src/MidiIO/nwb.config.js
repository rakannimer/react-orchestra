module.exports = {
  type: 'web-module',
  babel: {
    stage: 0,
    runtime: true,
  },
  npm: {
    esModules: true,
    umd: {
      global: 'MidiIO',
      externals: {}
    }
  },
  karma: {
    browsers: ['Chrome'],
    plugins: [
      require('karma-chrome-launcher')
    ]
  }
}
