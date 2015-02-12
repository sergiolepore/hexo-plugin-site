import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:users/new', 'UsersNewController', {
  needs: [
    'ember-validations@validator:local/length',
    'ember-validations@validator:local/format',
    'validator:local/property',
  ]
});

// Replace this with your real tests.
// TODO
// test('it exists', function(assert) {
//   var controller = this.subject();
//   assert.ok(controller);
// });
