module.exports = {
  type: 'react-component',
  babel: {
    stage: 0,
    runtime: true,
  },
  npm: {
    esModules: true,
    umd: {
      global: 'ReactOrchestra',
      externals: {
        react: 'React'
      }
    }
  }
}
