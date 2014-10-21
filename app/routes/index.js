import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
  title: 'HPM - The Hexo Plugin Manager',

  setupController: function(controller, model) {
    this._super(controller, model);

    // controller.send('loadTrending');
    controller.send('loadNewest');
    controller.send('loadUpdated');
    controller.send('loadPopular');
  },

  activate: function() {
    this.controllerFor('index').send('reset');
  },

  deactivate: function() {
    this.controllerFor('index').send('reset');
  }

});

export default IndexRoute;
