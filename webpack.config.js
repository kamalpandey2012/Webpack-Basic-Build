//importing webpack
var webpack = require('webpack');
var path = require('path');
//exporting configuration to webpack to process. Webpack accepts commonJs module pattern

module.exports = {
  context: path.resolve('src'),
	//create entry for our app which is app.js for a single file that we have commented
	//entry: 'app.js';
	//
	//App js contains 'login.js' and that will also be loaded by webpack
	entry: ['./utils.js', './app.js'],
	
	//define our output
	output: {
    path: path.resolve('build/js/'),
    publicPath: '/public/js/',
		filename:'bundle.js'
	},
	//for watching the files for changes
	watch: true,

  // Tell our dev server to run serve from 'public'' directory
  //
  devServer:{
    contentBase: 'public'
  },

  plugins: [
    // removed in dev file as we donot want minification in our dev build file. We will add this in production config file
  //  new webpack.optimize.UglifyJsPlugin()
  ],

	module: {
		rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader', enforce: 'pre',
        options: {
          // several examples ! 
        } 
      },
			{test:/\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	}
}
