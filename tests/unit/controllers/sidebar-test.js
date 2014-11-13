import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:sidebar', 'SidebarController', {
  needs: ['controller:application', 'controller:search']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});
