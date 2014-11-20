import {
  formatDate
} from 'hexo-plugin-site/helpers/format-date';

module('FormatDateHelper');

test('it applies a format to a given date', function() {
  var sourceDate = '2014-11-20T01:49:06.757Z';
  var format     = 'dddd, MMMM Do YYYY, h:mm:ss a';
  var targetDate = 'Wednesday, November 19th 2014, 10:49:06 pm';
  var result     = formatDate(sourceDate, format);

  ok(result === targetDate);
});
