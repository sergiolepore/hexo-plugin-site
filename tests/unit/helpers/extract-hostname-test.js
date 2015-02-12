import {
  extractHostname
} from 'hexo-plugin-site/helpers/extract-hostname';

import {
  module,
  test
} from 'ember-qunit';

module('ExtractHostnameHelper');

test('it extracts the hostname of a given URL', function(assert) {
  var testUrl        = 'https://www.npmjs.org/~sergiolepore';
  var targetHostname = 'www.npmjs.org';
  var result         = extractHostname(testUrl);

  assert.ok(result === targetHostname);
});
