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

    edit() {
      this.set('isEditing', true);
    },

    save() {
      var user = this.get('model');

      user.save().then(() => {
        this.set('isEditing', false);
      }, reason => {
        console.log(reason);

        swalert('Oops!', 'There was an error while persisting the changes :(', 'error');
      });
    },

    cancel() {
      this.get('model').rollback();
      this.set('isEditing', false);
    }
  }

});

export default PluginController;
