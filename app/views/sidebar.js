import Ember from 'ember';

var SidebarView = Ember.View.extend({
  afterRenderEvent: function() {
    this.$('#side-menu').metisMenu();
  },

});

export default SidebarView;
