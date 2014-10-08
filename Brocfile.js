/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp({
  // we will manage the assets via Bower
  emberCliFontAwesome: {
    includeFontAwesomeAssets: false
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// Font Awesome assets
var faAssets = pickFiles('bower_components/font-awesome/fonts', {
  srcDir: '/',
  files: ['**/*'],
  destDir: 'fonts'
});
app.import('bower_components/font-awesome/css/font-awesome.css');

// Twitter Bootstrap
var tbAssets = pickFiles('bower_components/bootstrap/dist/fonts', {
  srcDir: '/',
  files: ['**/*'],
  destDir: 'fonts'
});
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {
  destDir: 'assets'
});
app.import('bower_components/bootstrap/dist/js/bootstrap.js');

// Stylish side menu
app.import('bower_components/metisMenu/dist/metisMenu.css');
app.import('bower_components/metisMenu/dist/metisMenu.js');

// Charts.
// IMPORTANT: there's a temporary fix on raphael.js. Read the first comment on the file.
app.import('bower_components/morris.js/morris.css');
app.import('vendor/temporary-fixes/raphael.js');
app.import('bower_components/morris.js/morris.js');

// handlebars helpers
// WILL BE DISABLED, for now
// app.import('bower_components/swag/lib/swag.js', {
//   exports: {
//     'swag': [
//       'default'
//     ]
//   }
// });

app.import('vendor/semver.js', {
  exports: {
    'semver': [
      'default'
    ]
  }
});

// loader / progress bar
app.import('bower_components/pace/themes/blue/pace-theme-minimal.css');
app.import('bower_components/pace/pace.js');

// Support for non-AMD libs
app.import('vendor/custom-plugins/amdize.js');

module.exports = mergeTrees([app.toTree(), faAssets, tbAssets]);
