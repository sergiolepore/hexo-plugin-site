import Ember from 'ember';

var ResetPasswordRoute = Ember.Route.extend({

  titleToken: 'Reset Password',

  model(params) {
    var token = params.token;

    this.controllerFor('users.resetpassword').set('token', token);
  },

  deactivate(){
    this.controllerFor('users.resetpassword').send('reset');
  },

});

export default ResetPasswordRoute;
