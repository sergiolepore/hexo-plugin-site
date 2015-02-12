import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('keyword', 'Keyword', {
  needs: [
    'model:plugin',
    'model:user',
    'model:pluginversion',
    'model:plugininstallation'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
