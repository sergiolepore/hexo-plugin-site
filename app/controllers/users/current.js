import Ember   from 'ember';
import swalert from 'sweetAlert';

var UsersCurrentController = Ember.ObjectController.extend({

  isEditing : false,

  actions : {

    // change to edit mode
    edit : function() {
      this.set('isEditing', true);
    },

    cancel : function() {
      this.get('model').rollback();
      this.set('isEditing', false);
    },

    // persist changes and exit edit mode
    save : function() {
      var user  = this.get('model');
      var _this = this;

      user.save().then(function() {
        // user is valid
        _this.set('isEditing', false);
      }, function(e) {
        // invalid data or something is broken...
        console.log(e);

        swalert('Oops :(', 'This is embarrassing, but there was an unknown error while trying to save the data. Try again later.', 'error');
      });
    },

    updatePassword : function() {
      // TODO: implement updatePassword logic.
      // PUT api/users/password
    },

    // permanently deletes the user account
    delete : function() {
      // TODO: implement delete account
    },

    reset : function() {
      this.get('model').rollback();

      this.setProperties({
        isEditing : false,
      });
    }

  }
});

export default UsersCurrentController;
