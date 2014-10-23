import Ember from 'ember';
import ENV from 'hexo-plugin-site/config/environment';
import swalert from 'sweetAlert';

var SessionsController = Ember.Controller.extend({
  email:                null,
  password:             null,
  token:                localStorage.getItem('access_token'),
  currentUser:          localStorage.getItem('auth_user'),
  attemptedTransition:  null,

  isTokenChanged: function() {
    var token = this.get('token');

    if (!Ember.isEmpty(token)) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('auth_user', this.get('currentUser'));
    } else {
      localStorage.setItem('access_token', '');
      localStorage.setItem('auth_user', '');
    }
  }.observes('token'),

  init: function() {
    this._super();
    var token = localStorage.getItem('access_token');

    if (!Ember.isEmpty(token)) {
      Ember.$.ajaxSetup({
        headers: {
          'Authorization': 'Bearer %token%'.replace('%token%', token)
        }
      });
    }
  },

  actions: {
    loginUser: function() {
      var attemptedTransition = this.get('attemptedTransition');
      var loginData           = this.getProperties('email', 'password');
      var _this               = this;

      // clear the login form
      this.setProperties({
        email:    null,
        password: null
      });

      var loginUrl     = ENV.APP.apiBaseEndpoint + '/sessions/authenticate';
      var loginPromise = Ember.$.post(loginUrl, loginData);

      loginPromise.then(function(loginResponse) {
        var token  = loginResponse.token;
        var userId = loginResponse.user;

        _this.set('currentUser', userId);
        _this.set('token', token);

        Ember.$.ajaxSetup({
          headers: {
            'Authorization': 'Bearer %token%'.replace('%token%', token)
          }
        });

        if (attemptedTransition) {
          attemptedTransition.retry();
          _this.set('attemptedTransition', null);
        } else {
          _this.transitionToRoute('users.current');
        }
      }, function(reason) {
        if (reason.status === 401 || reason.status === 403) {
          swalert('Oops...', 'Wrong email or password', 'error');
        } else {
          console.log(reason);
          swalert('Oops...', 'This is embarrassing, but there was an unknown error. Try again later', 'error');
        }
      });
    },

    reset: function() {
      this.setProperties({
        email:        null,
        password:     null,
        token:        null,
        currentUser:  null
      });

      Ember.$.ajaxSetup({
        headers: {
          'Authorization': null
        }
      });
    }
  }
});

export default SessionsController;
