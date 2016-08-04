var $mcj = {};

import init from './_init';
import ready from './_ready';

import isSupportViewportUnits from './_isSupportViewportUnits';
import smartresize from './_smartresize';
// import scrollbarWidth from './_scrollbarWidth';
import mobirise from './_mobirise';

// open main closure

(function($) {

  init($);

  smartresize($, 'smartresize');

  // scrollbarWidth();

  mobirise($, isSupportViewportUnits);

  // $(document).ready(function() {
  //   ready($);
  // });

})(jQuery);

// end main closure
