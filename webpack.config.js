//importing webpack
var webpack = require('webpack');

//exporting configuration to webpack to process. Webpack accepts commonJs module pattern

module.exports = {
	//create entry for our app which is app.js for a single file that we have commented
	//entry: 'app.js';
	//
	//App js contains 'login.js' and that will also be loaded by webpack
	entry: ['./src/utils.js', './src/app.js'],
	
	//define our output
	output: {
		filename:'./src/bundle.js'
	},
	//for watching the files for changes
	watch: true
}
