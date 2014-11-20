import {
  extractHostname
} from 'hexo-plugin-site/helpers/extract-hostname';

module('ExtractHostnameHelper');

test('it extracts the hostname of a given URL', function() {
  var testUrl        = 'https://www.npmjs.org/~sergiolepore';
  var targetHostname = 'www.npmjs.org';
  var result         = extractHostname(testUrl);

  ok(result === targetHostname);
});
