var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    // takes in index.js
    entry: './app/index.js',
    // creates a folder called dist and creates a file called index_bundle.js with all of our code
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },
    mode: 'development',
    plugins: [
        // creates an index.html file that ties in with index_bundle.js
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
}