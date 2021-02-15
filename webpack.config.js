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
                compress: true,
                compress: { drop_console: true }
            }
        })
    )
}

module.exports = conf;

