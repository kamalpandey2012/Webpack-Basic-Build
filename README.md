# Basic Webpack Setup
This tutorial is designed to show the most basic setup of webpack possible. We will try to explore the basic functionalities of webpack like plugins, loaders etc

1. CLI ( Command Line Interface )
	- This is the most basic way to control webpack builds. 
2. Config Files
	- This part will help you build some more complex instructions to webpack. 
3. Dev Server
	- In this part we will create a development server that will make bundles of files, minify them and throw them to browser and reload the browser when some code changes
4. Loaders
	- This will explain the most fundamental unit of webpack 'loaders'
5. Production Build 
	- In this section you will learn how builds differ from each other and how to create a code that is server ready


## 1. CLI

Install webpack globally

`npm install webpack -g`

Now create the project with very minimal JS 'app.js' and one 'index.html' file to load that JS. 

Inside 'app.js'

```
document.write('Wecome to konfinity');

console.log('App loaded');
```

This is very basic JS file writing a 'string' on the browser and one 'App loaded' message in console.

In 'index.js' call this script inside the 'script' tag with boilerplate html code

```
<html>
	<head>
		<title>Demo</title>
	</head>
	<body>
		<script src="./bundle.js"></script>
	</body>
</html>
```

'bundle.js' is name of the file that will be created by webpack.

Now lets build this JS file with JS

```
webpack ./app.js bundle.js
```
It will create a file named 'bundle.js' inside it you will find similar code that 'require' uses behind the scenes.

Scroll Down little bit to find your written code enclosed within a IFFI ( Self invoked Functions ) Reference could be found in 'JS-Important-Patterns' repository. 

Lets create the same step with a **config file**

## 2 Config File

To use CLI is more convenient when the project is small and number of instructions are low, If project grows bigger it require a lot of complex automated build tasks to increase efficiency of developer. Now lets create our webpack file.

webpack takes JS module in requirejs module pattern so we will export our configurations as a module. 

```
module.exports = {
}
```
Now create a entry point from where webpack will start reading the files

```
entry: "./src/app.js",
```
For now our application has only 1 file. If the number of file grows we could make 1 entry points for individual application that could import various other modules, We can also define multiple entry points. Most of the settings in webpack are highly configurable. For more info on Entry refer our webpack documentation. 

Now create a output property where we will specify the output file name and location.

```
output: {
	filename: './src/bundle.js'
}
```
The completed file must look like this.

'webpack.config.js' file (name is important as webpack looks for js file with webpack.config name)

```
//////TODO: complete it
```  
Now make some changes to messages being printed to check everything working.

Our config file is ready now run the build using typing `webpack` in your terminal.

### 2.1 Watch
If you make any change to the file, the change needs to be pushed into our 'bundle.js' because thats the only file that is loading in 'index.html' and for that you have to rebuild the webpack its a lot of pain. Lets add some watchers that will listen to the changes in file and if some change occurs they fire rebuild command and everything gets added to 'bundle.js'.

One way to achieve this is by using `--watch` into our terminal

```
webpack --watch
```

It will run webpack into the watch mode. Other way to achieve this is by adding `watch:true` field in our config file

inside 'webpack.config.js' file 

```
//..code from past
watch: true,
```

version of file **version\_003**.

Now run the webpack with `webpack` command

This will run webpack in watch mode. You can check whether its working or not by changing message in 'app.js' file and saving it.

If you look at your browser url, you will find that it's not following http protocol it's just using file protocol and by strict security measures of browsers it's not possible to fully utilize the benefits of complex JS frameworks, hence we need a 'development' server.

## 3. Development web server

Webpack provides a development web server. This server is powerful enough to server our development time requirements but not powerful enough to server a real production app.

We will use webpack native server 'webpack-dev-server'. Install it globally, for now. `npm install --save webpack-dev-server`. Run our server by just typing `webpack-dev-server`. This will run the application in our browser and now change any of the file, this change will reflect in browser.

## 4. Working with multiple files 
We do not need build system for just one file. So lets make this a little more real scenerio, create two files in 'src' folder of the project: 'utils.js' and 'login.js'. The utils.js and login.js. The 'login.js' file has a module system build in. Means it is dependent over the module not over the global scope to work ( Learn more from 'Module-pattern' repository ). We want 'login.js' to be loaded into the 'app.js' file means 'app.js' require the 'login.js' file. To use other module to use in our app.js file we need to import it (require in terms of common js module pattern ). The syntax to import other file is

```
require('./login');
```

We will put above code at top of 'app.js' file. and inside 'login.js' file we will only put a console statement

```
console.log('Inside login js');`
```

Inside 'utils.js' file

```
console.log('inside utils file');
```

And to load utils file that needs to be exposed globally we will change our entry property from string to array. This will help us in getting more than one file. 

Inside 'webpack.config.js' file

```
entry: ['./src/utils.js','./src/app.js'];
```

This will run both the files globally. Since We have changed the 'webpack.config' file, we need to restart our webpack dev server by killing it `CONTROL+C` keypress. Rerun the webpack dev server `webpack-dev-server`. Now look at the console of browser, it must be showing 3 msgs.

_Git tag:_  **version00.00** 

Lets add **ES6** support for our javascript code. We will achieve this with babel. Lets install the required packages `npm install --save-dev babel-core babel-loader` 	

### ES6 Support
In this section we will add ES6 support using babel. Babel is most popular library for transpiling ES6 to lower versions of language to make it compatible with browsers that do not support ES6. 
Lets start by installing the pakages required `npm install --save-dev babel-loader babel-core`. After installation of these packages start by writing rule of modules to test forevery '.js' extension file excluding 'node\_modules' and using 'babel-loader' to transpile it to convert its code compatible with 'ES5' supporting browsers. This library will help us in using latest features of JS without worrying about the backward compatibality issues. Lets start by writing some code in 'webpack.config.js' file.

webpack.config.js

```
//... previous code
module: {
	rules: [
		{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
	]
}

```

Now we have set the rules for reading the file and passing it over to 'babel-loader', we will now specify what it will do with output, for now we need ES5 version. 

Add '.babelrc' file at root of the project, here (.) at starting of the file makes it hidden for unix systems. So to view them on linux system press `CNTROL+H` to enable view of hidden files.

now install the environment we want it to convert `npm install babel-preset-env --save-dev`

in '.babelrc' file

```
{
	"presets":["env"]
}
```

This new babel preset could dynamically load enviroment of execution. Lets look at it in jiffy. To use for only last 2 versions and safari >= 7 we will add this code

In '.babelrc' file same as above but with second member to the array in 'presets' is configuration of the given enviroment.

``` javascript
{
	"presets":[
		["env", {
			"targets":{
				"browsers":["last 2 versions", "safari >= 7"]
			}
		}]
	]
}
```

By giving the exact targets to webpack we could make our bundles smaller. 
Now test the configuration by changing our code to ES6. 

[Not for _webpack configuration file_ (webpack.config.js) as it runs over node and node in itself do not support many ES6 syntax ]
- Change every `var` to `let` and `var` to `const` in case of constant quantity. For details refer ES6 Course 
- Change every `require` with `import`
Final files could be found in new version release. Check github for releases then version for that code

## Linting
Linting is urunning a very basic code quality check. It could automatically find the dumb mistakes people make while writing JS code. It will make your code break less and reduce confusitons regarding standards

We will be using eslint loader which could be installed using `npm install --save-dev eslint eslint-loader eslint-plugin-import` command. It could be used similar to other loader a basic example is given below

```
module.exports = {
	module: {
		rules:[
			{
				test:/\.js$/,
				exclude: /node_modules/,
				loader:'eslint-loader',
				options:{
					//eslint options (if necessary)
				}
			},
	],
	}
}

```

When compiling with transpiling loaders (like babel-loader), make sure they are in correct order (bottom to top). Otherwise files will be check after being processed by `babel-loader`

```
module.exports = {
	module:{
	rules: [
		{
			test:/\.js$/,
			exclude: /node_modules/,
			use:[
				'babel-loader',
				'eslint-loader',
			],
		},
	],
	}
}
```

To be extra safe, we should use it with `enforce:'pre'` to check only the source files not the compiled files. For actual code of the module check webpack.config.js file from release 'v00.01'

```
// ...
module: {
rules: [
	{
	enforce: 'pre',
	test:/\.js$',
	exclude: /node_modules/,
	loader: 'eslint-loader',
	},
// now write babel loader configuration
// close all opened braces
```
After running the `webpack-dev-server` command you will see some errors in terminal. These are because we have used `console.log` in our code and it is not permitted in ESLINT by our '.eslintrc' file. To silent those warning use 

```javascript
/*eslint-disable no-console*/
```

at above comment at top of the file to silent eslint no-console errors

## Editor Config
It is used to make different editors consistent with code formatting it reduces some silly indent difference commit conflicts while pushing your code to 'git'. To enable 'editor config' visit [Editor Config](http://editorconfig.org "Editor Config org"). For using editor config they have plugins for different editors that could be used to configure your editor of choice. Now for customizing styles use code given below or could also find in my github repo with current release version.

This contains basic configuration regarding what to use as a 'tab' space. We have set it to 2 spaces.

```
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8
indent_style =space
indent_size = 2

# 4 space indentation
[*.py]
indent_style = space
indent_size = 2

# Tab indentation (no size specified)
[Makefile]
indent_style = space
indent_size = 2

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

We have used js and py settings just for the demonstration purpose. We don't require any '.py' settings for real purpose

_Skip this part till our production build if your are reading earlier release version._
( As we donot need minification in our development build and right now uglify could not understand ES6 fully.)

### Minify JS
Minification refers to removing all non necessary data from a file such as whitespaces, big variable names etc and converting or removing them. We could minify all of  (JS, css and html). We will use ugilifyjs webpack plugin for this task.

To use uglify plugin install it `npm install --save-dev uglifyjs-webpack-plugin` and add this into 'webpack.config.js' file.

```
var uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	plugins: [
		new uglifyJsPlugin({sourceMap: true});
	]
} 
```

Here we have passed `sourceMap: true` to uglify plugin, source map are the key between minified file and original file, it tells how to make minified to original and vice versa. In Development mode if some error occur we look at the js file in our browsers and if it does not contain source map than we have to figure out errors using minified file.

We could use various methods for serving of our application ex. Express, lite-server, http-server, so to create consistency in way of starting our application, we will add a script in our 'package.json' file (npm configuration file).

```
//some code generated by npm 
scripts:{
	"start" : "webpack-dev-server"
	}
// some more code generated by npm 
```
Thats a wrap for this release 

_Git tag:_  **version00.01** 

# Part 2 of Build process

In this part we will 
- Organize files and folders
- Create Multiple Bundles
- Add Css to our project
- Add fonts to our project
- Add images to our project


So lets get started

## Organize files and folders
In this part we will organize our files to emulate the production environment, here we want to add a public folder that will server up the project in case of real web server in that folder there will be 'assets' and 'js' files along side with 'index.html' file. We will write our JS code in 'src' folder.

To achieve this we need a folder in public directory then we will move our 'index.html' file from src to 'public' folder, this will be served from the web server. Now we want webpack to copy our js files to public folder but only in production build not in development build as it will create lots of files in index.html files that is just for the main views of the project and will create searching in IDE slower alongside confusion in selecting the files. To solve this problem we will actually copy files to 'build' folder that will also be in root of project.

As it is very common proctice of not checking any build files to VCS (git) so we will add 'build' folder to be ignored by git, So in your '.gitignore' file add 'build' folder. For reference look at the .gitignore file in version release

For resolution of project paths we will take help of path module that is build in nodejs. lets call it to project

```javascript
var path = require('path');
```

This will import the module path into the project, We will provide a context to our application.

after module.exports

```
context: path.resolve('src'),
```

Now we will add where to save the output file This will be 'build/js' path

```
path: path.resolve('build/js'),
```

Now tell where to accept the request from the web server.

```
publicPath: '/public/js/',
```
The above code tells webpack that when request comes to '/public/js/' then serve it from '/build/js' folder. The final output property will something like this.

```
output: {
path:path.resolve('bundle/js/'),
publicPath: '/public/js/'
filename:'bundle.js'
}
```

Now tell development server to look for static files in public directory not in build directory

```
devServer:{
	contentBase: 'public'
}
```

Now change 'index.html' to accomodate the changes

```
<script src="/public/js/bundle.js'></script>
```

We have to change entry as we are now providing context to the webpack.

```
entry: ['./utils.js', './app.js'],
```

Webpack will add path according to context of the file

Now run our dev server by running following command in terminal `npm start`. 

Note: Make sure to move 'index.html' from 'src' to public.

Check next v00.02 'webpack.config.js' file for complete file

_Git tag:_  **version00.03** 

## Create multiple bundles
In a real life application we use a lot of third party libraries to make our life easy, At this moment our webpack configuration adds all the vendor+developer scripts in single bundle but this could be undesirable if we are using more third party scripts for various reasons. 

- Our browsers cache our scripts while loading the page. When the page reloads or user opens next time it will not request for unchanged files. Browser detects unchanged files with filename. As we are only changing our code not vendors so it's much easy to create a separate bundle for vendor scripts so that browser cache vendor script and don't have to request it again and again.
- Another reason is to create bundles of developer scripts in various forms like We want our home page to load faster as user is visiting it first time. So we will create a bundle of 'vendor scripts', 'common scripts' ( will be common to whole of our application ), and 'home scripts'. This will help home page load fast as home script serves only home page and also 'common' libraries gets cached in the browser so when user navigates to another page then only that page script gets loaded.
- Lazy loading. It is a phenomenon when we want some script to load slowly till all scripts have been loaded.

We will create 2 html files 'about.html' and 'contact.html' to add their bundles separately

Inside these files we will call scripts in this format

```
<!--Inside contact.html -->
<script src="/public/js/shared.js"></script>
<script src="/public/js/contact.js"></script>
```

The 'shared.js' file will keep bundle for common features or code of all the application js files. 

```
<!-- Inside about.html-->
<script src="/public/js/shared.js"></script>
<script src="/public/js/about.js"></script>
```

<!--Inside index.html-->

As you can see we have to create two more files in 'src' folder these are 'about.js' and 'contact.js.

The third file 'shared.js' will be created by a plugin of webpack

Lets open webpack file if you have written code inside those file just one console statement inside the 'about.js' and 'contact.js' will work.

Lets first get 'CommonsChunkPlugin' from webpack optimize object

at top webpack.config.js file

```
var commonsPlugin = new webpack.optimize.commonsChunkPlugin('shared.js');
```

Lets change entry key again this time. For thiswe will use an object having three different entry point object like shown below

```
entry:{
	about: './about.js',
	home: './home.js',
	contact: './contact.js'
}
```

This will create entries with these three files 

Now tell webpack in output to create a bundle for each entry, You can also use like this to create bundle with more than 1 file `home: ['./home.js', './utils.js']`

Now In output property we will keep path and publicPath unchanged but we will update the update filename with a dynamic one. To pick name of the bundle with entry key we just have to specify code as given below

```
filename: "[name].js"
```

This will tell webpack to use entry keys for naming the packages

Finally in plugins property add 'commonChunksPlugin' as we have executed it in started with the property 'shared.js' we will just use it not execute it

```
plugins: [commonsPlugin]
```


  


