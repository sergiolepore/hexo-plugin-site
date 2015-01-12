import Ember   from 'ember';
import swalert from 'sweetAlert';
import ENV     from 'hexo-plugin-site/config/environment';

var UsersCurrentController = Ember.ObjectController.extend({

  isEditing          : false,
  isChangingPassword : false,
  showEditPluginIcon : true,

  actions: {

    // change to edit mode
    edit() {
      this.set('isEditing', true);
    },

    cancel() {
      this.get('model').rollback();
      this.set('isEditing', false);
    },

    // persist changes and exit edit mode
    save() {
      var user = this.get('model');

      user.save().then(() => {
        // user is valid
        this.set('isEditing', false);
      }, reason => {
        // invalid data or something is broken...
        console.log(reason);

        swalert('Oops :(', 'This is embarrassing, but there was an unknown error while trying to save the data. Try again later.', 'error');
      });
    },

    changePassword() {
      this.set('isChangingPassword', true);
    },

    cancelPassword() {
      this.setProperties({
        isChangingPassword : false,
        oldPassword        : null,
        newPassword        : null
      });
    },

    savePassword() {
      var passwordData = this.getProperties('oldPassword', 'newPassword');
      var apiUrl       = `${ENV.APP.apiBaseEndpoint}/users/password`;

      Ember.$.ajax({
        url  : apiUrl,
        data : passwordData,
        type : 'PUT'
      }).then(() => {
        // everything ok
        swalert('Awesome!', 'Your password has been successfully updated.', 'success');

        this.setProperties({
          isChangingPassword : false,
          oldPassword        : null,
          newPassword        : null,
        });
      }, reason => {
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
    delete() {
      // TODO: implement delete account
    },

    reset() {
      this.get('model').rollback();

      this.setProperties({
        isEditing          : false,
        isChangingPassword : false,
      });
    }

  }
});

export default UsersCurrentController;
