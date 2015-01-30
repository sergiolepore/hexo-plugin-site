/* global localStorage:false*/

import Ember   from 'ember';
import ENV     from 'hexo-plugin-site/config/environment';
import swalert from 'sweetAlert';

export default Ember.Controller.extend({
  email               : null,
  password            : null,
  token               : localStorage.getItem('access_token'),
  currentUser         : localStorage.getItem('auth_user'),
  attemptedTransition : null,

  isTokenChanged: function() {
    let token = this.get('token');

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
    let token = localStorage.getItem('access_token');

    if (!Ember.isEmpty(token)) {
      Ember.$.ajaxSetup({
        headers: {
          'Authorization': 'Bearer %token%'.replace('%token%', token)
        }
      });
    }
  },

  actions: {

    loginUser() {
      let attemptedTransition = this.get('attemptedTransition');
      let loginData           = this.getProperties('email', 'password');

      // clear the login form
      this.setProperties({
        password: null
      });

      let loginUrl     = ENV.APP.apiBaseEndpoint + '/sessions/authenticate';
      let loginPromise = Ember.$.post(loginUrl, loginData);

      loginPromise.then(loginResponse => {
        let token  = loginResponse.token;
        let userId = loginResponse.user;

        this.set('currentUser', userId);
        this.set('token', token);

        Ember.$.ajaxSetup({
          headers: {
            'Authorization': 'Bearer %token%'.replace('%token%', token)
          }
        });

        if (attemptedTransition) {
          attemptedTransition.retry();
          this.set('attemptedTransition', null);
        } else {
          this.transitionToRoute('users.current');
        }
      }, reason => {
        console.log(reason);

        if (reason.status === 401 || reason.status === 403) {
          swalert('Oops...', 'Wrong email or password', 'error');
        } else {
          swalert('Oops...', 'This is embarrassing, but there was an unknown error. Try again later', 'error');
        }
      });
    },

    sendResetPasswordEmail() {
      let apiUrl = ENV.APP.apiBaseEndpoint + '/sessions/resetPasswordEmail';
      let email  = this.get('email');

      if (!email) {
        swalert('Oops!', 'Enter your email in the login form, then click this link again', 'error');
      } else {
        Ember.$.get(apiUrl, { email: email }).then(function() {
          swalert('Great!', 'An email was sent to you with instructions to reset your password', 'success');
        }, reason => {
          console.log(reason);

          if (reason.status === 404) {
            swalert('Oops...', 'The email you provided is not registered', 'error');
          } else {
            swalert('Oops...', 'This is embarrassing, but there was an unknown error. Try again later', 'error');
          }
        });
      }
    },

    reset() {
      this.setProperties({
        email       : null,
        password    : null,
        token       : null,
        currentUser : null
      });

      Ember.$.ajaxSetup({
        headers: {
          'Authorization': null
        }
      });
    }
  }
});
