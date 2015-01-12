import Ember            from 'ember';
import swalert          from 'sweetAlert';
import EmberValidations from 'ember-validations';
import ENV              from 'hexo-plugin-site/config/environment';

export default Ember.Controller.extend(EmberValidations.Mixin, {

  password              : null,
  passwordConfirmation  : null,
  hasErrors             : false,


  passwordHasErrors: function() {
    let hasErrors = this.get('hasErrors');
    let errors    = this.get('errors');

    if (hasErrors && errors.password.length) {
      return true;
    } else {
      return false;
    }
  }.property('hasErrors'),

  passwordConfirmationHasErrors: function() {
    let hasErrors = this.get('hasErrors');
    let errors    = this.get('errors');

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

    save() {
      this.validate().then(() => {
        let data   = this.getProperties('token', 'password');
        let apiUrl = `${ENV.APP.apiBaseEndpoint}/users/resetPassword`;

        return Ember.$.ajax({
          url  : apiUrl,
          data : data,
          type : 'PUT'
        });
      }).then(() => {
        swalert({
          title:  'Awesome!',
          text:   'Your password has been successfully updated',
          type:   'success'
        }, ()  => {
          // when user closes the alert
          // show him the login page
          this.transitionToRoute('sessions');
        });
      }, reason => {
        console.log(reason);

        if (this.get('isValid')) {
          if (reason.status === 401 || reason.status === 403) {
            swalert('Oops!', 'It seems that you reset token is invalid. Try asking for a new password reset.', 'error');
          } else {
            swalert(':(', 'This is embarrassing, but there was an unknown error trying to change your password. Try again later.', 'error');
          }
        } else {
          this.set('hasErrors', true);
        }
      });
    },

    reset() {
      this.setProperties({
        password              : null,
        passwordConfirmation  : null,
        hasErrors             : false,
      });
    }
  }

});
