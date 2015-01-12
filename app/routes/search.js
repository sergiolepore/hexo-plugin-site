import Ember from 'ember';

var SearchRoute = Ember.Route.extend({
  titleToken  : 'Search',
  query       : '',

  model(params) {
    var query      = params.query;
    var controller = this.controllerFor('search');

    this.set('titleToken', query + ' - Search');
    controller.set('query', query);

    controller.send('searchPlugins');
    controller.send('searchUsers');
    controller.send('searchKeywords');
  },

  deactivate() {
    // when leaving the search route, ensure no garbage is kept in the controller
    this.controllerFor('search').send('reset');
  },
});

export default SearchRoute;
