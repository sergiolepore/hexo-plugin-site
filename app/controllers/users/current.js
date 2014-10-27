import Ember   from 'ember';
import swalert from 'sweetAlert';
import ENV     from 'hexo-plugin-site/config/environment';

var UsersCurrentController = Ember.ObjectController.extend({

  isEditing          : false,
  isChangingPassword : false,

  actions: {

    // change to edit mode
    edit: function() {
      this.set('isEditing', true);
    },

    cancel: function() {
      this.get('model').rollback();
      this.set('isEditing', false);
    },

    // persist changes and exit edit mode
    save: function() {
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

    changePassword: function() {
      this.set('isChangingPassword', true);
    },

    cancelPassword: function() {
      this.setProperties({
        isChangingPassword : false,
        oldPassword        : null,
        newPassword        : null
      });
    },

    savePassword: function() {
      var passwordData = this.getProperties('oldPassword', 'newPassword');
      var apiUrl       = '%baseurl%/users/password'.replace('%baseurl%', ENV.APP.apiBaseEndpoint);
      var _this        = this;

      Ember.$.ajax({
        url  : apiUrl,
        data : passwordData,
        type : 'PUT'
      }).then(function() {
        // everything ok
        swalert('Awesome!', 'Your password has been successfully updated.', 'success');

        _this.setProperties({
          isChangingPassword : false,
          oldPassword        : null,
          newPassword        : null,
        });
      }, function(reason) {
        console.log(reason);

        if (reason.status === 401 || reason.status === 403) {
          swalert('Oops...', 'It seems that your data is invalid.', 'error');
        } else if (reason.status === 400) {
          swalert('Oops...', 'Your .', 'error');
        } else {
          swalert('Oops :(', 'This is embarrassing, but there was an unknown error while trying to save the data. Try again later.', 'error');
        }
      });
    },

    // permanently deletes the user account
    delete: function() {
      // TODO: implement delete account
    },

    reset: function() {
      this.get('model').rollback();

      this.setProperties({
        isEditing          : false,
        isChangingPassword : false,
      });
    }

  }
});

export default UsersCurrentController;
