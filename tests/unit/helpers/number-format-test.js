import {
  numberFormat
} from 'hexo-plugin-site/helpers/number-format';

import {
  module,
  test
} from 'ember-qunit';

module('NumberFormatHelper');

test('it applies a format to a given number', function(assert) {
  var sourceNumber = 10000;
  var format       = '0a';
  var targetNumber = '10k';
  var result       = numberFormat(sourceNumber, format);

  assert.ok(result === targetNumber);
});

test('it treats an "undefined" value as 0 (zero)', function(assert) {
  var sourceNumber; // not initialized, ergo, undefined
  var format       = '0%';
  var targetNumber = '0%';
  var result       = numberFormat(sourceNumber, format);

  assert.ok(result === targetNumber);
});
