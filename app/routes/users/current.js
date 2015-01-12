// import Ember from 'ember';
import AuthenticatedRoute from 'hexo-plugin-site/routes/authenticated';

var UsersCurrentRoute = AuthenticatedRoute.extend({
  titleToken: 'My Profile',

  model() {
    var currentUserId = this.controllerFor('application').get('currentUser');

    return this.store.find('user', currentUserId);
  },

  setupController(controller, model) {
    controller.set('model', model);
  }

});

export default UsersCurrentRoute;
