import Ember from 'ember';

var ResetPasswordRoute = Ember.Route.extend({

  titleToken: 'Reset Password',

  model: function(params) {
    var token = params.token;

    this.controllerFor('users.resetpassword').set('token', token);
  },

  deactivate: function (){
    this.controllerFor('users.resetpassword').send('reset');
  },

});

export default ResetPasswordRoute;
