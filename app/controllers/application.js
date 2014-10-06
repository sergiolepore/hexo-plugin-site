import Ember from 'ember';
import ENV from 'hexo-plugin-site/config/environment';
import semver from 'semver';

var ApplicationController = Ember.Controller.extend({

  version: function() {
    return ENV.APP.version;
  }.property(),

  isIndex: function() {
    return this.get('currentRouteName') === 'index';
  }.property('currentRouteName'),

  isNotIndex: function() {
    return !this.get('isIndex');
  }.property('isIndex'),

  pageClass: function() {
    return this.get('currentRouteName').replace(/\//g, '-');
  }.property('currentRouteName'),

  isStable: function() {
    var version = this.get('version');

    return semver.gte(version, '1.0.0');
  }.property(),

  isSignedIn: false,
});

export default ApplicationController;
