import DS    from 'ember-data';
import Ember from 'ember';

var urlRegexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export default DS.Model.extend({
  username        : DS.attr('string'),
  email           : DS.attr('string'),
  password        : DS.attr('string'),
  githubProfile   : DS.attr('string'),
  npmProfile      : DS.attr('string'),
  website         : DS.attr('string'),
  donationsUrl    : DS.attr('string'),
  plugins         : DS.hasMany('plugin'),
  createdAt       : DS.attr('date'),
  updatedAt       : DS.attr('date'),

  githubProfileUrl: function() {
    let github = this.get('githubProfile');

    // if it's not an url and not empty
    // it's the profile username
    if (!urlRegexp.test(github) && !Ember.isEmpty(github)) {
      github = `https://github.com/${github}`;
    }

    return github;
  }.property('githubProfile'),

  npmProfileUrl: function() {
    let npm = this.get('npmProfile');

    // if it's not an url and not empty
    // it's the profile username
    if (!urlRegexp.test(npm) && !Ember.isEmpty(npm)) {
      npm = `https://www.npmjs.org/~${npm}`;
    }

    return npm;
  }.property('npmProfile'),

  pluginCount: function() {
    return this.get('plugins.length');
  }.property('plugins.[]'),

});
