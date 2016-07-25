var $mcj = {};
(function($) {

  $.extend($.easing, {
    easeInOutCubic: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  });

  $.fn.outerFind = function(selector) {
    return this.find(selector).addBack(selector);
  };
  (function($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function(func, threshold, execAsap) {
      var timeout;

      return function debounced() {
        var obj = this,
          args = arguments;

        function delayed() {
          if (!execAsap) func.apply(obj, args);
          timeout = null;
        }

        if (timeout) clearTimeout(timeout);
        else if (execAsap) func.apply(obj, args);

        timeout = setTimeout(delayed, threshold || 100);
      };
    };

    // smartresize
    jQuery.fn[sr] = function(fn) {
      return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

  })(jQuery, 'smartresize');
  (function() {

    var scrollbarWidth = 0,
      originalMargin,
      touchHandler = function(event) {
        event.preventDefault();
      };

    function getScrollbarWidth() {
      if (scrollbarWidth) return scrollbarWidth;
      var scrollDiv = document.createElement('div');
      $.each({
        top: '-9999px',
        width: '50px',
        height: '50px',
        overflow: 'scroll',
        position: 'absolute'
      }, function(property, value) {
        scrollDiv.style[property] = value;
      });
      $('body').append(scrollDiv);
      scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      $('body')[0].removeChild(scrollDiv);
      return scrollbarWidth;
    }

  })();

  $.isMobile = function(type) {
    var reg = [];
    var any = {
      blackberry: 'BlackBerry',
      android: 'Android',
      windows: 'IEMobile',
      opera: 'Opera Mini',
      ios: 'iPhone|iPad|iPod'
    };
    type = 'undefined' == $.type(type) ? '*' : type.toLowerCase();
    if ('*' == type)
      reg = $.map(any, function(v) {
        return v;
      });
    else if (type in any) reg.push(any[type]);
    return !!(reg.length && navigator.userAgent.match(new RegExp(reg.join('|'), 'i')));
  };

  var isSupportViewportUnits = (function() {
    // modernizr implementation
    var $elem = $('<div style="height: 50vh; position: absolute; top: -1000px; left: -1000px;">').appendTo('body');
    var elem = $elem[0];
    var height = parseInt(window.innerHeight / 2, 10);
    var compStyle = parseInt((window.getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle)['height'], 10);
    $elem.remove();
    return compStyle == height;
  }());

  $(function() {

    $('html').addClass($.isMobile() ? 'mobile' : 'desktop');

    // .mbr-navbar-sticky
    $(window).scroll(function() {
      $('.mbr-navbar-sticky').each(function() {
        var method = $(window).scrollTop() > 10 ? 'addClass' : 'removeClass';
        $(this)[method]('mbr-navbar-stuck')
          .not('.mbr-navbar-open')[method]('mbr-navbar-short');
      });
    });

    $(window).smartresize(function() {
      if ($(window).width() > 991)
        $('.mbr-navbar-auto-collapse .mbr-hamburger-open').click();
    }).keydown(function(event) {
      if (27 == event.which) // ESC
        $('.mbr-hamburger-open').click();
    });

    if ($.isMobile() && navigator.userAgent.match(/Chrome/i)) { // simple fix for Chrome's scrolling
      (function(width, height) {
        var deviceSize = [width, width];
        deviceSize[height > width ? 0 : 1] = height;
        $(window).smartresize(function() {
          var windowHeight = $(window).height();
          if ($.inArray(windowHeight, deviceSize) < 0)
            windowHeight = deviceSize[$(window).width() > windowHeight ? 1 : 0];
          $('.mbr-section-full-height').css('height', windowHeight + 'px');
        });
      })($(window).width(), $(window).height());
    } else if (!isSupportViewportUnits) { // fallback for .mbr-section-full-height
      $(window).smartresize(function() {
        $('.mbr-section-full-height').css('height', $(window).height() + 'px');
      });
    }

    // .mbr-section-16by9 (16 by 9 blocks autoheight)
    function calculate16by9() {
      $(this).css('height', $(this).parent().width() * 9 / 16);
    }
    $(window).smartresize(function() {
      $('.mbr-section-16by9').each(calculate16by9);
    });

    // .mbr-parallax-background
    if ($.fn.jarallax && !$.isMobile()) {
      $(document).on('destroy.parallax', function(event) {
        $(event.target).outerFind('.mbr-parallax-background')
          .jarallax('destroy')
          .css('position', '');
      });
    }

    // .mbr-fixed-top
    var fixedTopTimeout,
      scrollTimeout,
      prevScrollTop = 0,
      fixedTop = null,
      isDesktop = !$.isMobile();
    $(window).scroll(function() {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      var scrollTop = $(window).scrollTop();
      var scrollUp = scrollTop <= prevScrollTop || isDesktop;
      prevScrollTop = scrollTop;
      if (fixedTop) {
        var fixed = scrollTop > fixedTop.breakPoint;
        if (scrollUp) {
          if (fixed != fixedTop.fixed) {
            if (isDesktop) {
              fixedTop.fixed = fixed;
              $(fixedTop.elm).toggleClass('is-fixed');
            } else {
              scrollTimeout = setTimeout(function() {
                fixedTop.fixed = fixed;
                $(fixedTop.elm).toggleClass('is-fixed');
              }, 40);
            }
          }
        } else {
          fixedTop.fixed = false;
          $(fixedTop.elm).removeClass('is-fixed');
        }
      }
    });

    // init
    $('html').addClass('mbr-site-loaded');
    $(window).resize().scroll();

    // smooth scroll
    if (!$('html').hasClass('is-builder')) {
      $(document).click(function(e) {
        try {
          var target = e.target;

          if ($(target).parents().hasClass('mbr-gallery')) {
            if ($(target).parents().hasClass('carousel') || $(target).parent().is('a')) {
              return;
            }
          }
          do {
            if (target.hash) {
              var useBody = /#bottom|#top/g.test(target.hash);
              $(useBody ? 'body' : target.hash).each(function() {
                e.preventDefault();
                // in css sticky navbar has height 64px
                var stickyMenuHeight = $('.mbr-navbar-sticky').length ? 64 : 0;
                var goTo = target.hash == '#bottom' ?
                  ($(this).height() - $(window).height()) :
                  ($(this).offset().top - stickyMenuHeight);
                $('html, body').stop().animate({
                  scrollTop: goTo
                }, 800, 'easeInOutCubic');
              });
              break;
            }
          } while (target = target.parentNode);
        } catch (e) {
          // throw e;
        }
      });
    }

  });

  // vimeofy
  // $('.front #background').vimeofy({
  //   url: 'https://vimeo.com/170180787',
  //   color: '#00D8D8',
  //   autoplay: true,
  //   loop: true,
  //   delay: 5e3
  // });

  // MailChimp
  window.fnames = [];
  window.ftypes = [];
  fnames[0] = 'EMAIL';
  ftypes[0] = 'email';
  fnames[1] = 'FNAME';
  ftypes[1] = 'text';
  fnames[2] = 'LNAME';
  ftypes[2] = 'text';

})(jQuery);
