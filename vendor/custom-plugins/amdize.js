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

  /* global define _ */
  define('underscore', [], function() {
    'use strict';

    return {
      'default': _
    }
  });

  /* global define moment */
  define('moment', [], function() {
    'use strict';

    return {
      'default': moment
    }
  });

  /* global define numeral */
  define('numeral', [], function() {
    'use strict';

    return {
      'default': numeral
    }
  });
})();
