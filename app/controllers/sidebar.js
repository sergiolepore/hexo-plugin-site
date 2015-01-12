import Ember from 'ember';

export default Ember.Controller.extend({
  needs       : ['application', 'search'],
  searchQuery : '',

  searchQueryChanges: function() {
    let searchQuery = this.get('controllers.search.query');
    this.set('searchQuery', searchQuery);
  }.observes('controllers.search.query'),

  version: function() {
    return this.get('controllers.application.version');
  }.property(),

  isNotIndex: function() {
    return this.get('controllers.application.isNotIndex');
  }.property('controllers.application.isNotIndex'),

});
