var webpack = require('webpack')
var path = require('path')

var PORT = 5050

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/dev-server',
    'whatwg-fetch',
    './src/index'
  ],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    root: [
      path.resolve(process.cwd(), './src')
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
        include: path.join(process.cwd(), '/src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: path.join(process.cwd(), '/src')
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader',
        include: path.join(process.cwd(), '/src')
      },
      {
        test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192',
        include: path.join(process.cwd(), '/src')
      }
    ]
  }
}

module.exports = config
