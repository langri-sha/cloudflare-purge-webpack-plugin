module.exports = class CloudflarePurgeWebpackPlugin {
  constructor (options = {}) {
    this.options = options
    options.email = options.email || process.env['CLOUDFLARE_EMAIL'],
    options.key = options.key || process.env['CLOUDFLARE_KEY'],
    options.zone = options.zone || process.env['CLOUDFLARE_ZONE']
  }

  apply (compiler) {
    compiler.plugin('after-emit', (compilation, callack) => {})
  }
}
