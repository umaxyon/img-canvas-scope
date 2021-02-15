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
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: true,
                    compress: { drop_console: true }
                }
            })
        ]
    }
};

if (IS_DEVELOP) {
    conf.mode = 'development';
    conf.devtool = 'source-map';
} else {
    conf.mode = 'production';
}

module.exports = conf;

