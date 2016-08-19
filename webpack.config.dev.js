var webpack = require('webpack')
var path = require('path')

var isTest = process.env.NODE_ENV === 'test'
var PORT = 5050

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/dev-server',
    'whatwg-fetch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    root: [
      path.resolve(__dirname, './src')
    ],
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, '/src')
      },
      {
        test: /\.css$/,
        loader: isTest
          ? 'css/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
          : 'style-loader!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: path.join(__dirname, '/src')
      },
      {
        test: /\.styl$/,
        loader: isTest
          ? 'css/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader'
          : 'style-loader!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader',
        include: path.join(__dirname, '/src')
      }
    ]
  }
}

if (isTest) {
  config.target = 'node'
}

module.exports = config
