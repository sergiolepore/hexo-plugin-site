import Ember from 'ember';

var SearchRoute = Ember.Route.extend({
  titleToken: 'Search',
  query: '',

  model: function(params) {
    var query = params.query;
    var model = {query:query};

    this.set('titleToken', query + ' - Search');
    this.set('query', query);

    return model;
  }
});

export default SearchRoute;
