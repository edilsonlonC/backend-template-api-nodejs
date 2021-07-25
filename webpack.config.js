const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => ({
  entry: {
    server: ['babel-polyfill', './src/app.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  mode: 'development',
  target: 'node',
  node: {
    global: true,
    __dirname: true,
    __filename: true,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
});
