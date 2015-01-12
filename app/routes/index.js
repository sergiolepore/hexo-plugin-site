import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
  title: 'hpm.js - The Hexo Plugin Manager',

  setupController(controller, model) {
    this._super(controller, model);

    // controller.send('loadTrending');
    controller.send('loadNewest');
    controller.send('loadUpdated');
    controller.send('loadPopular');
  },

  activate() {
    this.controllerFor('index').send('reset');
  },

  deactivate() {
    this.controllerFor('index').send('reset');
  }

});

export default IndexRoute;
