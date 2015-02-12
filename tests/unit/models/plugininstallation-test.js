import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('plugininstallation', 'PluginInstallation', {
  // Specify the other units that are required for this test.
  needs: [
    'model:plugin',
    'model:user',
    'model:keyword',
    'model:pluginversion'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
