import Ember   from 'ember';
import swalert from 'sweetAlert';

/**
 * This is the basic route to handle all routes that needs authentication.
 * If there's a route that needs previous auth, it will need to extend this one.
 */
var AuthenticatedRoute = Ember.Route.extend({

  // verify that there's a session token.
  // if not, redirect to the login route.
  beforeModel: function(transition) {
    var token = this.controllerFor('sessions').get('token');

    if (Ember.isEmpty(token)) {
      return this.redirectToLogin(transition);
    }
  },

  // redirect to the login route and store the attempted transition so we can
  // move to it later.
  redirectToLogin: function(transition) {
    this.controllerFor('sessions').set('attemptedTransition', transition);

    return this.transitionTo('sessions');
  },

  actions: {

    error: function(reason, transition) {
      if (reason.status === 401 || reason.status === 403) {
        this.redirectToLogin(transition);
      } else {
        console.log(reason);
        swalert('Oops...', 'This is embarrassing, but there was an unknown error. Try again later', 'error');
      }
    }
  }

});

export default AuthenticatedRoute;
