const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/img-canvas-scope.js',
    output: {
        filename: 'img-canvas-scope.js',
        path: path.join(__dirname, 'dist')
    }
};
