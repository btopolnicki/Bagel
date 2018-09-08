const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle-[chunkhash:12].js'
  },
  
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname + '/src',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
    plugins: [    
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'index.template.html',
      inject:'body'
    })
  ],  
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
