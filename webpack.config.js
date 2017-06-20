const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/app/index.html`,
  filename: 'index.html',
  inject: 'body',
})
const CompressionPlugin = require('compression-webpack-plugin')

const getPlugins = (isProd) => {
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
         // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]

  if (isProd) {
    plugins.pop() // remove dev UglifyJsPlugin
    plugins.push(
    HtmlWebpackPluginConfig,
    new webpack.optimize.UglifyJsPlugin(), // minify everything
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }))
  }
  return plugins
}

const isProd = process.env.NODE_ENV !== 'development'
module.exports = {
  entry: [
    './app/index.jsx',
  ],

  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },

  module: {
    loaders: [

      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query:
        {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
    ],
  },

  plugins: getPlugins(isProd),

  devServer: {
    historyApiFallback: true,
  },

  cache: !isProd,

  node: {
    __dirname: true,
  },
}
