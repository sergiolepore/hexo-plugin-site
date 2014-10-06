import Ember from 'ember';

var ApplicationRoute = Ember.Route.extend({
  title: function(tokens) {
    return tokens.join(' - ') + ' | Hexo Plugin Manager';
  },

  actions: {
    /**
     * Here we catch the action bubbled from the search-box component
     */
    searchTransition: function(searchQuery) {
      // remove all extra whitespaces
      searchQuery = searchQuery.replace(/\s+/g, ' ').trim();

      if (searchQuery) {
        this.transitionTo('search', searchQuery);
      }
    }
  }
});

export default ApplicationRoute;
