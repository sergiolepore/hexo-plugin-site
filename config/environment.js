/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hexo-plugin-site',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      apiHost: '',
      version: '0.0.1-alpha'
    },

    contentSecurityPolicy: {
      "style-src": "'self' fonts.googleapis.com",
      "font-src": "fonts.gstatic.com"
    },

  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.apiHost = 'http://localhost:1337';
    ENV.contentSecurityPolicy['connect-src'] = "http://localhost:1337";
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.apiHost = 'http://api.hexo-plugins.com';
    ENV.contentSecurityPolicy['connect-src'] = "http://api.hexo-plugins.com";
  }

  return ENV;
};
