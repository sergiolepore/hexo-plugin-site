import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('plugin', 'Plugin', {
  needs: [
    'model:user',
    'model:keyword',
    'model:pluginversion',
    'model:plugininstallation'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
