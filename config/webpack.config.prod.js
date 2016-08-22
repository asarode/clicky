var webpack = require('webpack')
var path = require('path')

var config = {
  entry: './src/index',
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
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      'compress': {
        'warnings': false
      }
    })
  ],
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
