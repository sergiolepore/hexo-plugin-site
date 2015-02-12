import {
  formatDate
} from 'hexo-plugin-site/helpers/format-date';

import {
  module,
  test
} from 'ember-qunit';

module('FormatDateHelper');

test('it applies a format to a given date', function(assert) {
  var sourceDate = '2014-11-20T01:49:06';
  var format     = 'dddd, MMMM Do YYYY, h:mm:ss a';
  var targetDate = 'Thursday, November 20th 2014, 1:49:06 am';
  var result     = formatDate(sourceDate, format);

  assert.ok(result === targetDate);
});
