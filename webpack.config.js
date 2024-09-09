// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for React app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Add this rule to handle CSS files
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
  ],

  devServer: {
    host: 'localhost', // or use a specific IP address
    port: 3000
  }
};
