var $mcj = {};

import init from './init';
import ready from './ready';

import isSupportViewportUnits from './isSupportViewportUnits';
import smartresize from './smartresize';
// import scrollbarWidth from './scrollbarWidth';
import mobirise from './mobirise';

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
