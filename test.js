const MemoryFs = require('memory-fs')
const test = require('ava')
const webpack = require('webpack')

function compile (plugin = null) {
  const compiler = webpack({
    entry: [
      'foo.txt',
      'bar.txt'
    ],
    resolve: {
      modules: ['./fixtures']
    },
    output: {
      path: '/',
      filename: 'index.js',
      publicPath: 'http://example.com'
    },
    module: {
      rules: [{
        test: /\.txt$/,
        use: 'raw'
      }]
    },
    plugins: plugin && [plugin] || []
  })
  compiler.fileSystem = new MemoryFs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err)

      if (stats.hasErrors() || stats.hasWarnings()) {
        return reject(new Error(stats.toString({
          errorDetails: true,
          warnings: true
        })))
      }

      resolve({compiler, stats})
    })
  })
}

test('Test Webpack compiler setup', async t => {
  t.plan(2)

  t.notThrows(async () => {
    await compile()
  })

  class TestPlugin {
    apply (compiler) {
      compiler.plugin('emit', (compilation, callback) => {
        t.pass()
        callback()
      })
    }
  }

  await compile(new TestPlugin())
})
