// import Ember from 'ember';
import AuthenticatedRoute from 'hexo-plugin-site/routes/authenticated';

export default AuthenticatedRoute.extend({
  titleToken: 'My Profile',

  model() {
    let currentUserId = this.controllerFor('application').get('currentUser');
    return this.store.find('user', currentUserId);
  },

  setupController(controller, model) {
    controller.set('model', model);
  }

});
