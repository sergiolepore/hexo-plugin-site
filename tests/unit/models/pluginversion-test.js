import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('pluginversion', 'PluginVersion', {
  // Specify the other units that are required for this test.
  needs: [
    'model:plugin',
    'model:user',
    'model:keyword',
    'model:plugininstallation'
  ]
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
