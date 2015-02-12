import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:installation', 'InstallationRoute', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
