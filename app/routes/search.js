import Ember from 'ember';

export default Ember.Route.extend({
  titleToken  : 'Search',
  query       : '',

  model(params) {
    let query      = params.query;
    let controller = this.controllerFor('search');

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
