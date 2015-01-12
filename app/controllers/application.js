import Ember  from 'ember';
import ENV    from 'hexo-plugin-site/config/environment';
import semver from 'semver';

var ApplicationController = Ember.Controller.extend({
  needs: ['sessions'],

  currentUser: function() {
    return this.get('controllers.sessions.currentUser');
  }.property('controllers.sessions.currentUser'),

  isAuthenticated: function() {
    return !Ember.isEmpty(this.get('controllers.sessions.currentUser'));
  }.property('controllers.sessions.currentUser'),

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
    return this.get('currentRouteName').replace(/\./g, '-');
  }.property('currentRouteName'),

  isStable: function() {
    var version = this.get('version');

    return semver.gte(version, '1.0.0');
  }.property(),

  init() {
    var styleTitle    = 'background: #eee; color: #0e83cd; font-size: 1.2em; font-weight: bold; font-family: monospace;';
    var styleText     = 'background: #eee; color: #444; font-size: 1.2em; font-family: monospace;';
    var styleTextDomo = 'background: #eee; color: #a00; font-size: 1.2em; font-weight: bold; font-family: monospace;';

    console.log('%c Hey there! :)                                          ',  styleTitle);
    console.log('%c If you are seeing this, why don\'t you join us?         ', styleText);
    console.log('%c  > https://github.com/sergiolepore/hexo-plugin-site    ',  styleText);
    console.log('%c  > https://github.com/sergiolepore/hexo-plugin-api     ',  styleText);
    console.log('%c  > https://github.com/sergiolepore/hexo-plugin-manager ',  styleText);
    console.log('%c \\|°▿▿▿▿°|/                                             ', styleTextDomo);
  }
});

export default ApplicationController;
