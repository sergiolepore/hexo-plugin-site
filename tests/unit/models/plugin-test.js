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

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
