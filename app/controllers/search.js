import Ember from 'ember';

var SearchController = Ember.Controller.extend({
  query: '',

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
