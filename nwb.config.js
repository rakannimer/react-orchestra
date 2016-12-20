module.exports = {
  type: 'react-component',
  babel: {
    stage: 0,
    runtime: true,
  },
  webpack: {
    loaders: {
      worker: {
        output: {
          filename: 'hash.worker.js',
          chunkFilename: '[id].hash.worker.js',
        },
      },
    },
  },
  npm: {
    esModules: true,
    umd: {
      global: 'ReactOrchestra',
      externals: {
        react: 'React',
      },
    },
  },
};
