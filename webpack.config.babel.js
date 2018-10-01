import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './public');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
console.log('nodeEnv ==> ', nodeEnv);
console.log('isDev ==> ', isDev);

const config = {
  mode: nodeEnv,
  devtool: isDev ? 'source-map' : 'eval',
  entry: {
    app: `${src}/javascripts/app.js`,
  },
  output: {
    path: dist,
    filename: `javascripts/[name].js`,
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('stylesheets/style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${src}/index.html`
    })
  ],
  resolve: {
    extensions: ['*', '.js']
  },
  serve: {
    port: 8080,
    reload: true,
    config: `${src}/webpack.config.babel.js`,
    content: './public/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: isDev,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    browsers: [
                      'IE >= 11',
                      'last 2 versions'
                    ]
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev
              }
            }
          ]
        })
      }
    ]
  }
};

export default config;