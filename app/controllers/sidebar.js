import Ember from 'ember';

var SidebarController = Ember.Controller.extend({
  needs: ['application', 'search'],
  searchQuery: '',

  searchQueryChanges: function() {
    var searchQuery = this.get('controllers.search.query');
    this.set('searchQuery', searchQuery);
  }.observes('controllers.search.query'),

  version: function() {
    return this.get('controllers.application.version');
  }.property(),

  isNotIndex: function() {
    return this.get('controllers.application.isNotIndex');
  }.property('controllers.application.isNotIndex'),

});

export default SidebarController;
