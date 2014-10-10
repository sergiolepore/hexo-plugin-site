import Ember from 'ember';

var SearchRoute = Ember.Route.extend({
  titleToken: 'Search',
  query: '',

  model: function(params) {
    var query = params.query;
    var pluginQuery = [];
    var userQuery = [];
    var keywordQuery = [];

    if (!query || query.length < 3) {
      return { plugins:[], users: [], keywords: [] };
    }

    this.set('titleToken', query + ' - Search');
    this.set('query', query);

    query = '%' + query.replace(/\s+/, '%') + '%';

    pluginQuery.push({ name: { like: query }});
    pluginQuery.push({ packageName: { like: query }});
    pluginQuery.push({ description: { like: query }});
    pluginQuery.push({ keywordCache: { like: query }});
    pluginQuery.push({ readme: { like: query }});

    userQuery.push({ name: { like: query }});

    keywordQuery.push({ name: { like: query }});

    return Ember.RSVP.hash({
      plugins: this.store.find('plugin', { where: { or: pluginQuery }}),
      users: this.store.find('user', { where: { or: userQuery }}),
      keywords: this.store.find('keyword', { where: { or: keywordQuery }})
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('query', this.get('query'));
  },

  deactivate: function() {
    // when leaving the search route, ensure no garbage is kept in the controller
    this.controllerFor('search').send('reset');
  },
});

export default SearchRoute;
