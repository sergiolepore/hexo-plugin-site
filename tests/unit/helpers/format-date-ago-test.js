import {
  formatDateAgo
} from 'hexo-plugin-site/helpers/format-date-ago';
import moment from 'moment';

import {
  module,
  test
} from 'ember-qunit';

module('FormatDateAgoHelper');

test('it returns a date as "[x] [time-unit] ago"', function(assert) {
  var sevenDaysAgo = moment().subtract(7, 'days').toISOString();
  var target       = '7 days ago';
  var result       = formatDateAgo(sevenDaysAgo);

  assert.ok(result === target);
});
