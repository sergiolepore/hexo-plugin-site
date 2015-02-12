import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:users/resetpassword', 'UsersResetpasswordController', {
  needs: [
    'ember-validations@validator:local/length',
    'ember-validations@validator:local/confirmation',
  ]
});

// Replace this with your real tests.
// TODO
// test('it exists', function(assert) {
//   var controller = this.subject();
//   assert.ok(controller);
// });
