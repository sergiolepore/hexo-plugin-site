import Ember from 'ember';

var SessionsRoute = Ember.Route.extend({

  titleToken: 'Login',

  // check if the user is already logged in, to prevent showing him the login
  // template.
  beforeModel: function() {
    var token = this.controllerFor('sessions').get('token');

    if (!Ember.isEmpty(token)) {
      this.transitionTo('users.current');
    }
  },

  // always reset the controller to avoid data from past login.
  // remember that controllers are singleton.
  setupController: function(controller) {
    controller.send('reset');
  }

});

export default SessionsRoute;
