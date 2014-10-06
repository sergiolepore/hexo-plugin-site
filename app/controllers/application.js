import Ember from 'ember';

var ApplicationController = Ember.Controller.extend({
  isIndex: function() {
    return this.get('currentRouteName') === 'index';
  }.property('currentRouteName'),

  isNotIndex: function() {
    return !this.get('isIndex');
  }.property('isIndex'),

  pageClass: function() {
    return this.get('currentRouteName').replace(/\//g, '-');
  }.property('currentRouteName'),

  isSignedIn: false,
});

export default ApplicationController;
