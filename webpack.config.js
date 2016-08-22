const webpack = require('webpack');


module.exports = {
  // configuration
  context: __dirname + "/",
  entry: "./source/main.js",
  output: {
      path: __dirname + "/public/javascripts",
      filename: "main.js"
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('production')
  //     }
  //   })
  // ],
  module: {
    loaders: [{
     test: /\.js$/,
     exclude: [ /node_modules/ ],
     loader: 'babel-loader',
    }]
  }
};
