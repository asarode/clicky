var config = {}

var isProd = process.env.NODE_ENV === 'production'
if (isProd) {
  config = require('./config/webpack.config.prod')
} else {
  config = require('./config/webpack.config.dev')
}

module.exports = config
