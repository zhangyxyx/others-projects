const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    devtool: 'inline-source-map',
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [{
            test: /\.css|scss$/,
            loaders: ["style-loader", "css-loader","sass-loader","postcss-loader"]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://odsmonitor.atguat.com.cn/',//代理配置
                secure: false,
                changeOrigin: true,
                // pathRewrite: {'^/api' : ''},
            }
        }
    }
};

module.exports = merge(commonConfig, devConfig);