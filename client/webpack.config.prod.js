var HtmlwebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: false
});

module.exports = {
  entry: path.resolve(__dirname, 'app/js/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../server/app/static/bundle/'),
    filename: 'bundle.[hash].js',
    publicPath: '/static/bundle/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  stats: {
    // Configure the console output
    colors: true,
    modules: true,
    reasons: true
  },
  plugins: [
    definePlugin,
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, 'app/static/index.html'),
      inject: 'body'
    })
  ]
};
