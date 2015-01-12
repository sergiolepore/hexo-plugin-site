import Ember from 'ember';

var ApplicationRoute = Ember.Route.extend({
  title: function(tokens) {
    return tokens.join(' - ') + ' | Hexo Plugin Manager';
  },

  actions: {
    /**
     * Here we catch the action bubbled from the search-box component inside the
     * sidebar view.
     * If the query is not an empty string, we transition to the search route
     * with the query as a parameter.
     * In the search route is where the magic happens...
     */
    searchTransition(query) {
      // remove all extra whitespaces
      query = query.replace(/\s+/g, ' ').trim();

      if (query && query.length >= 3) {
        this.transitionTo('search', query);
      }
    },

    logout() {
      this.controllerFor('sessions').send('reset');
      this.transitionTo('sessions');
    }
  }
});

export default ApplicationRoute;
