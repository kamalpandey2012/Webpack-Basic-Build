//importing webpack
var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//exporting configuration to webpack to process. Webpack accepts commonJs module pattern

module.exports = {
  context: path.resolve('src'),
	//create entry for our app which is app.js for a single file that we have commented
	//entry: 'app.js';
	//
	//App js contains 'login.js' and that will also be loaded by webpack
	entry: {home: './home.js', about: './about.js', contact: './contact.js'},
	
	//define our output
	output: {
    path: path.resolve('build/js/'),
    publicPath: '/public/js/',
		filename:'[name].js'
	},
	//for watching the files for changes
	watch: true,

  // Tell our dev server to run serve from 'public'' directory
  //
  devServer:{
    contentBase: 'public'
  },

  plugins: [
    new CommonsChunkPlugin({
    name: 'shared'
    }),

        new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
      })
    // removed in dev file as we donot want minification in our dev build file. We will add this in production config file
  //  new webpack.optimize.UglifyJsPlugin()
  ],

	module: {
		rules: [
      
      {test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader', enforce: 'pre',
        options: {/*several examples !*/ } 
      },
			
      {test:/\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
		]
	}
}
