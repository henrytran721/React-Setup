# React-Setup

1. [React Setup](#react)
2. [Sass Setup with Webpack Config](#sass)

<a name='react'></a>

# React Setup with Webpack
``` 
npm init -y
```
1. This starts and installs the package.json file with default values and creates a node_modules folder.
2. To install react and react dom use: 
```
npm i react react-dom
```
3. We don't want to push our whole node_modules folder to github so we will tell github to ignore it by using a .gitignore file
```
vim .gitignore
node_modules
```
4. When someone clones the project and does npm install, they will install all of the dependencies according to package.json
5. To install all other plugins needed
```
npm i --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader html-webpack-plugin
```
6. Create a folder called app which will contain index.js and index.css
7. Create a file in the directory called webpack.config.js
```
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
```
8. In package.json, we will want to create a babel property that will allow us to transcribe our classes or JSX into older versions and regular JavaScript, respectively to compile and build. 
- **env converts class functions into plain constructors**
- **babel-react converts JSX into regular javascript**
```
  "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
```
9. We also want to add a start or build script to tell our package.json what to do accordingly
```
"scripts": {
    "start": "webpack-dev-server --open",
    "build": "export NODE_ENV=production && webpack --mode production"
  }
```

<a name='sass'></a>

# Sass Setup with Webpack

1. In webpack.config.js we first want to create a const for optimizing our bundles when building for production
```
const isDevelopment = process.env.NODE_DEV === 'development'
```

2. We want to install our devDependencies with the following line: 
``` 
npm install --save-dev node-sass sass-loader style-loader css-loader mini-css-extract-plugin
```
- In which they represent these functions: 
  - node-sass provides binding for Node.js to LibSass, a Sass compiler.
  - sass-loader is a loader for Webpack for compiling SCSS/Sass files.
  - style-loader injects our styles into our DOM.
  - css-loader interprets @import and @url() and resolves them.
  - mini-css-extract-plugin extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds.

3. We then need to import our mini-css-extract-plugin to be available in our webpack.config.js file
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

4. We will then add our plugin into the plugin portion of our module.exports object
```
plugins: [
    ///...
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ]
```

5. Identify our rules in our webpack.config.js to locate the sass file and bundle it
```
rules: [
      ///...
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
      }
      ///...
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
  ```