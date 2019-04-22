const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var handlebars = require('handlebars');


module.exports = {
    entry: ['@babel/polyfill','./src/js/index.js'],
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
    },
    devServer:{
        contentBase: './dist'
    },
    mode: isDevelopment ? 'development' : 'production',
    plugins:[
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
    }),
     
        new HtmlWebpackPlugin({
            filename: 'plp.html',
            template: './src/plp.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/login.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'register.html',
            template: './src/register.html',
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
          }),
          new CleanWebpackPlugin(),
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
          }),
          new CopyWebpackPlugin([
            {from:'static',to:'static'} 
        ]), 
        new CopyWebpackPlugin([
          {from:'src/api',to:'api'} 
      ]), 
        
    ],
    module:{ 
        
        rules:[
          { test: /\.(handlebars|hbs)$/, 
            loader: "handlebars-loader",
            query:{
              partialDirs: [
                path.join(__dirname, 'templates', 'partials')
            ]
            } 
          },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
           
            {
                test: /\.html$/,
                use: [
                  {
                    loader: 'html-loader',
                    options: { minimize: !isDevelopment }
                  }
                ]
            },
            {
                test: /\.css$/,
                loader: 'style!css?importLoaders=1!postcss'
            },
            

            {
                test: /\.module\.s(a|c)ss$/,
                loader: [
                  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      localIdentName: '[name]__[local]___[hash:base64:5]',
                      camelCase: true,
                      sourceMap: isDevelopment
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: isDevelopment
                    }
                  }
                ]
              },
              {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: isDevelopment
                    }
                  }
                ]
              },
              {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      optipng: {
                        enabled: !isDevelopment
                      },
                      pngquant: {
                        quality: '65-90',
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false
                      },
                      webp: {
                        quality: 75
                      }
                    }
                  }
                ]
              }
              
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
      
      }
    
   
}