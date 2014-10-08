import Ember from 'ember';

var SidebarController = Ember.Controller.extend({
  needs: ['application'],

  version: function() {
    return this.get('controllers.application.version');
  }.property(),

  isNotIndex: function() {
    return this.get('controllers.application.isNotIndex');
  }.property('controllers.application.isNotIndex'),

});

export default SidebarController;
