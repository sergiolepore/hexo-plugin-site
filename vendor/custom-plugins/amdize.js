/**
 * Gives AMD compatibility to non AMD libs.
 */
(function() {
  /* global define */

  /* global Swag */
  define('swag', [], function() {
    'use strict';

    return {
      'default': Swag
    };
  });

  /* global semver */
  define('semver', [], function() {
    'use strict';

    return {
      'default': semver
    };
  });

  /* global _ */
  define('underscore', [], function() {
    'use strict';

    return {
      'default': _
    };
  });

  /* global moment */
  define('moment', [], function() {
    'use strict';

    return {
      'default': moment
    };
  });

  /* global numeral */
  define('numeral', [], function() {
    'use strict';

    return {
      'default': numeral
    };
  });

  /* global sweetAlert */
  define('sweetAlert', [], function() {
    'use strict';

    return {
      'default': sweetAlert
    };
  });
})();
