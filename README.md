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

_Git tag:_  **version00.00**:w
 

Lets add **ES6** support for our javascript code. We will achieve this with babel. Lets install the required packages `npm install --save-dev babel-core babel-loader` 	
