import Ember   from 'ember';
import swalert from 'sweetAlert';

var PluginController = Ember.ObjectController.extend({
  needs     : ['application'],
  isEditing : false,

  userCanEdit: function() {
    var isAuthenticated = this.get('controllers.application.isAuthenticated');
    var loggedInUser    = this.get('controllers.application.currentUser');
    var pluginOwner     = this.get('user.id');

    if (!isAuthenticated) {
      return false;
    }

    return loggedInUser === pluginOwner;
  }.property('controllers.application.isAuthenticated', 'controllers.application.currentUser', 'user'),

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    save: function() {
      var user  = this.get('model');
      var _this = this;

      user.save().then(function() {
        _this.set('isEditing', false);
      }, function(reason) {
        console.log(reason);

        swalert('Oops!', 'There was an error while persisting the changes :(', 'error');
      });
    },

    cancel: function() {
      this.get('model').rollback();
      this.set('isEditing', false);
    }
  }

});

export default PluginController;
