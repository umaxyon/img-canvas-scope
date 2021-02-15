const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { isDate } = require('util');

const IS_DEVELOP = true;

const conf = {
    entry: './src/img-canvas-scope.js',
    output: {
        filename: 'img-canvas-scope.js',
        path: path.join(__dirname, 'dist')
    },
    optimization: {
        minimize: false,
        minimizer: []
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime'],
                }
            }
        ]
    }
};

if (IS_DEVELOP) {
    conf.mode = 'development';
    conf.devtool = 'source-map';
} else {
    conf.mode = 'production';
    conf.optimization.minimize = true;
    conf.optimization.minimizer.push(
        new TerserPlugin({
            terserOptions: {
                compress: { drop_console: true }
            }
        })
    )
}

module.exports = conf;

