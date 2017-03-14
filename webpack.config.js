const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// this will extract Sass files into a css file
const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
});

module.exports = {
    entry: {
        code: path.resolve(__dirname, 'src/js/entry.jsx'),
        styles: path.resolve(__dirname, 'src/sass/main.scss')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        extractSass
    ],

    /**
     * Dev server configuration
     */
    devServer: {
        publicPath: path.resolve(__dirname, 'dist'),
        hot: true
    }
}

