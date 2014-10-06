import Ember from 'ember';

var SearchController = Ember.Controller.extend({

  searchQuery: function() {
    var model = this.get('model');

    return model && model.query ? model.query : '';
  }.property('model'),

});

export default SearchController;
