import Ember from 'ember';

export default Ember.Route.extend({

  titleToken: 'Reset Password',

  model(params) {
    let token = params.token;
    this.controllerFor('users.resetpassword').set('token', token);
  },

  deactivate(){
    this.controllerFor('users.resetpassword').send('reset');
  },

});
