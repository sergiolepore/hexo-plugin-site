// import Ember from 'ember';
import AuthenticatedRoute from 'hexo-plugin-site/routes/authenticated';

var CurrentUserRoute = AuthenticatedRoute.extend({

  model: function() {
    return this.controllerFor('application').get('currentUser');
  }

});

export default CurrentUserRoute;
