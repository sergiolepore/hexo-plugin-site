import {
  numberFormat
} from 'hexo-plugin-site/helpers/number-format';

module('NumberFormatHelper');

test('it applies a format to a given number', function() {
  var sourceNumber = 10000;
  var format       = '0a';
  var targetNumber = '10k';
  var result       = numberFormat(sourceNumber, format);

  ok(result === targetNumber);
});

test('it treats an "undefined" value as 0 (zero)', function() {
  var sourceNumber; // not initialized, ergo, undefined
  var format       = '0%';
  var targetNumber = '0%';
  var result       = numberFormat(sourceNumber, format);

  ok(result === targetNumber);
});
