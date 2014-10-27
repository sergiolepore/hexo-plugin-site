import Ember from 'ember';

var UserRoute = Ember.Route.extend({

  model: function(params) {
    var userSlug = params.user_slug;

    this.set('titleToken', userSlug);

    return this.store.find('user', {
      where: {
        username: userSlug
      }
    }).then(function(records) {
      return records.get('firstObject');
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }

});

export default UserRoute;
