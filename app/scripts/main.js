var $mcj = {};

import init from './_init';
import ready from './_ready';

import isSupportViewportUnits from './_isSupportViewportUnits';
// import scrollbarWidth from './_scrollbarWidth';
import mobirise from './_mobirise';

// open main closure

(function($) {

  init($);

  // scrollbarWidth();

  mobirise($, isSupportViewportUnits);

  // $(document).ready(function() {
  //   ready($);
  // });

})(jQuery);

// end main closure
