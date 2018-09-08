module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname + '/public',
    publicPath: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    contentBase: './public',
    watchContentBase: true,
    port: 9001,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
