import Ember from 'ember';

var SearchController = Ember.Controller.extend({
  query: '',

  plugins: function() {
    return this.get('model').plugins;
  }.property('model.plugins'),

  users: function() {
    return this.get('model').users;
  }.property('model.users'),

  keywords: function() {
    return this.get('model').keywords;
  }.property('model.keywords'),

  isPluginsNotEmpty: function() {
    return this.get('plugins').length > 0;
  }.property('plugins'),

  isUsersNotEmpty: function() {
    return this.get('users').length > 0;
  }.property('users'),

  isKeywordsNotEmpty: function() {
    return this.get('keywords').length > 0;
  }.property('keywords'),

  isShortQuery: function() {
    return this.get('query').length < 3;
  }.property('query'),

  actions: {
    /**
     * This can be called to clean all garbage in the controller.
     * If there are observers attached to this controller's properties,
     * they will be notified and the reset will propagate. Useful to clear the
     * query string when leaving the search route.
     */
    reset: function() {
      this.set('query', null);
    },

  }
});

export default SearchController;
