/*eslint-disable no-console*/
import login from './login.js';
import utils from './utils.js';
login();
utils();
let logoContainer = document.getElementById('logo');
let imageTag = document.createElement('img');
imageTag.src = require('./images/konfinity_logo_new.png');
imageTag.style.height = '2.5em';
imageTag.style.width = '2.8em';
console.log('image tag ', imageTag);
logoContainer.appendChild(imageTag);

