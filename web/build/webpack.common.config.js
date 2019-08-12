const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      Src: path.resolve(__dirname, '../src/')
    }
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    host: '0',
    public: 'http://localhost:8080'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new CopyPlugin([
      { from: './src/public/favicon.ico', to: 'images/' },
      { from: './src/public/landingBackground.png', to: 'images/' }
    ])
  ],
  node: {
    fs: 'empty'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/'
  }
};
