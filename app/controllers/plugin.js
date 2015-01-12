import Ember   from 'ember';
import swalert from 'sweetAlert';

export default Ember.ObjectController.extend({
  needs     : ['application'],
  isEditing : false,

  userCanEdit: function() {
    let isAuthenticated = this.get('controllers.application.isAuthenticated');
    let loggedInUser    = this.get('controllers.application.currentUser');
    let pluginOwner     = this.get('user.id');

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
      let user = this.get('model');

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
