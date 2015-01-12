import Ember from 'ember';

var UsersNewRoute = Ember.Route.extend({
  titleToken: 'Signup',

  // if there's a logged in user, redirect to another
  // page.
  beforeModel() {
    var isAuthenticated = this.controllerFor('application').get('isAuthenticated');

    if (isAuthenticated) {
      return this.transitionTo('index');
    }
  },

  model() {
    return this.store.createRecord('user');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.send('reset');
    controller.set('model', model);
  },

  deactivate() {
    this.controllerFor('users.new').send('reset');
  }

});

export default UsersNewRoute;
