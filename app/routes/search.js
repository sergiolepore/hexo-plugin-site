import Ember from 'ember';

var SearchRoute = Ember.Route.extend({
  titleToken: 'Search',
  query: '',

  model: function(params) {
    var query = params.query;
    var pluginQuery = [];
    var userQuery = [];

    this.set('titleToken', query + ' - Search');
    this.set('query', query);

    query = '%' + query.replace(/\s+/, '%') + '%';

    pluginQuery.push({ name: { like: query }});
    pluginQuery.push({ packageName: { like: query }});
    pluginQuery.push({ description: { like: query }});
    pluginQuery.push({ keywordCache: { like: query }});
    pluginQuery.push({ readme: { like: query }});

    userQuery.push({ name: { like: query }});

    // return this.store.find('plugin', {
    //   where: {
    //     or: pluginQuery
    //   }
    // });

    return Ember.RSVP.hash({
      plugins: this.store.find('plugin', { where: { or: pluginQuery }}),
      users: this.store.find('user', { where: { or: userQuery }})
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    var query = this.get('query');

    controller.set('query', query);
    controller.set('users', model.users);
    controller.set('plugins', model.plugins);
  },

  deactivate: function() {
    // when leaving the search route, ensure no garbage is kept in the controller
    this.controllerFor('search').send('reset');
  },
});

export default SearchRoute;
