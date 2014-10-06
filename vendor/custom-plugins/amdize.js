/**
 * Gives AMD compatibility to non AMD libs.
 */
(function() {
  /* global define swag */
  define('swag', [], function() {
    'use strict';

    return {
      'default': Swag
    };
  });

  /* global define semver */
  define('semver', [], function() {
    'use strict';

    return {
      'default': semver
    }
  });
})();
