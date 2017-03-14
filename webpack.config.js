const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/entry.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}

