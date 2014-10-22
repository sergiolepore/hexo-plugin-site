import Ember from 'ember';
import swalert from 'sweetAlert';
import EmberValidations from 'ember-validations';
import ENV from 'hexo-plugin-site/config/environment';

var UsersNewController = Ember.ObjectController.extend(EmberValidations.Mixin, {

  emailExists:    false,
  usernameExists: false,
  hasErrors:      false,

  usernameChanged: function() {
    var _this    = this;
    var username = this.get('username');
    var apiUrl   = ENV.APP.apiBaseEndpoint + '/users';

    if (Ember.isEmpty(username) || username.length < 3) {
      return;
    }

    // I couldn't find a way to use `store.find` to get the users filtered by
    // username without altering `this.model`. It will always be altered, thereby
    // all the observers are fired, generating a loop on this method.
    // user input -> changes username -> trigger this -> find -> alters model -> trigger this -> alters model...
    //
    // this.store.find('user', {
    //   where: {
    //     username: username
    //   }
    // }).then(function(record) {
    //   _this.set('usernameExists', !Ember.isEmpty(record));
    // });

    Ember.$.get(apiUrl, {
      where: {
        username: username
      }
    }).then(function(result) {
      _this.set('usernameExists', !Ember.isEmpty(result.users));
    });
  }.observes('username'),

  emailChanged: function() {
    var _this  = this;
    var email  = this.get('email');
    var apiUrl = ENV.APP.apiBaseEndpoint + '/users';

    if (Ember.isEmpty(email) || email.length < 3) {
      return;
    }

    // I couldn't find a way to use `store.find` to get the users filtered by
    // email without altering `this.model`. It will always be altered, thereby
    // all the observers are fired, generating a loop on this method.
    // user input -> changes email -> trigger this -> find -> alters model -> trigger this -> alters model...
    //
    // this.store.find('user', {
    //   where: {
    //     email: email
    //   }
    // }).then(function(record) {
    //   _this.set('emailExists', !Ember.isEmpty(record));
    // });

    Ember.$.get(apiUrl, {
      where: {
        email: email
      }
    }).then(function(result) {
      _this.set('emailExists', !Ember.isEmpty(result.users));
    });
  }.observes('email'),

  // this hides the error boxes on the form when the user starts typing
  propertiesChanges: function() {
    this.set('hasErrors', false);
  }.observes('model.username', 'model.email', 'model.password'),

  usernameHasErrors: function() {
    var hasErrors = this.get('hasErrors');
    var errors    = this.get('errors');

    if (hasErrors && errors.username.length) {
      return true;
    } else {
      return false;
    }
  }.property('hasErrors'),

  emailHasErrors: function() {
    var hasErrors = this.get('hasErrors');
    var errors    = this.get('errors');

    if (hasErrors && errors.email.length) {
      return true;
    } else {
      return false;
    }
  }.property('hasErrors'),

  passwordHasErrors: function() {
    var hasErrors = this.get('hasErrors');
    var errors    = this.get('errors');

    if (hasErrors && errors.password.length) {
      return true;
    } else {
      return false;
    }
  }.property('hasErrors'),

  validations: {
    username: {
      length: {
        minimum: 3
      },
      property: {
        isFalse:  'usernameExists',
        message:  'username already exists'
      }
    },

    email: {
      length: {
        minimum: 3
      },
      format: {
        with:       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        allowBlank: false,
        message:    'provide a valid email address'
      },
      property: {
        isFalse:  'emailExists',
        message:  'email already registered'
      }
    },

    password: {
      length: {
        minimum: 6
      }
    }
  },

  actions: {
    save: function() {
      var user  = this.get('model');
      var _this = this;

      this.validate().then(function() {
        // user is valid
        return user.save();
      }).then(function() {
        // user successfully saved
        swalert({
          title:  'Great!',
          text:   'Your account has been created',
          type:   'success'
        }, function() {
          // when user closes the alert
          // show him the login page
          _this.transitionToRoute('sessions');
        });
      }).catch(function(e) {
        // invalid data or something is broken...
        console.log(e);

        // if passed all validations, it must be something else :(
        if (_this.get('isValid')) {
          swalert('Oops :(', 'This is embarrassing, but there was an unknown error while trying to create your account. Try again later.', 'error');
        } else {
          _this.set('hasErrors', true);
        }
      });
    },

    reset: function() {
      this.setProperties({
        usernameExists: false,
        emailExists:    false,
        hasErrors:      false,
        model:          null,
      });
    }
  }
});

export default UsersNewController;
