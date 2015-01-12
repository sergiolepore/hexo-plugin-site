import Ember from 'ember';

export default Ember.View.extend({

  afterRenderEvent() {
    this.$('#side-menu').metisMenu();
  },

});
