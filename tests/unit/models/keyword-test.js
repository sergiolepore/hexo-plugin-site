import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('keyword', 'Keyword', {
  needs: ['model:plugin']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
