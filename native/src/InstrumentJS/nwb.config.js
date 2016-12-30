module.exports = {
  type: 'web-module',
  npm: {
    esModules: true,
    umd: {
      global: 'InstrumentJS',
      externals: {}
    }
  },
  karma: {
    browsers: ['Chrome'],
    plugins: [
      require('karma-chrome-launcher')
    ],
    extra: {
      browserNoActivityTimeout: 100000
    }
  }
}
