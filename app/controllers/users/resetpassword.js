import Ember            from 'ember';
import swalert          from 'sweetAlert';
import EmberValidations from 'ember-validations';
import ENV              from 'hexo-plugin-site/config/environment';

var ResetPasswordController = Ember.Controller.extend(EmberValidations.Mixin, {

  password              : null,
  passwordConfirmation  : null,
  hasErrors             : false,


  passwordHasErrors: function() {
    var hasErrors = this.get('hasErrors');
    var errors    = this.get('errors');

    if (hasErrors && errors.password.length) {
      return true;
    } else {
      return false;
    }
  }.property('hasErrors'),

  passwordConfirmationHasErrors: function() {
    var hasErrors = this.get('hasErrors');
    var errors    = this.get('errors');

    if (hasErrors && errors.passwordConfirmation.length) {
      return true;
    } else {
      return false;
    }
  }.property('hasErrors'),

  validations: {
    password: {
      length: {
        minimum: 6
      },
      confirmation: true
    }
  },

  actions: {
    save: function() {
      var _this = this;

      this.validate().then(function() {
        var data   = _this.getProperties('token', 'password');
        var apiUrl = ENV.APP.apiBaseEndpoint + '/users/resetPassword';

        return Ember.$.ajax({
          url  : apiUrl,
          data : data,
          type : 'PUT'
        });
      }).then(function() {
        swalert({
          title:  'Awesome!',
          text:   'Your password has been successfully updated',
          type:   'success'
        }, function() {
          // when user closes the alert
          // show him the login page
          _this.transitionToRoute('sessions');
        });
      }, function(reason) {
        console.log(reason);

        if (_this.get('isValid')) {
          if (reason.status === 401 || reason.status === 403) {
            swalert('Oops!', 'It seems that you reset token is invalid. Try asking for a new password reset.', 'error');
          } else {
            swalert(':(', 'This is embarrassing, but there was an unknown error trying to change your password. Try again later.', 'error');
          }
        } else {
          _this.set('hasErrors', true);
        }
      });
    },

    reset: function() {
      this.setProperties({
        password              : null,
        passwordConfirmation  : null,
        hasErrors             : false,
      });
    }
  }

});

export default ResetPasswordController;
