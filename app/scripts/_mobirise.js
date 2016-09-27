export default function($, isSupportViewportUnits) {
  var fixedTopTimeout,
    scrollTimeout,
    prevScrollTop = 0,
    fixedTop = null,
    isMobile = $.isMobile(),
    isDesktop = !isMobile;

  $('html').addClass(isMobile ? 'mobile' : 'desktop');

  // .section-16by9 (16 by 9 blocks autoheight)
  function calculate16by9() {
    $(this).css('height', $(this).parent().width() * 9 / 16);
  }

  $(window).scroll(function() {
    // .navbar-sticky
    $('.navbar-sticky').each(function() {
      var method = $(window).scrollTop() > 10 ? 'addClass' : 'removeClass';
      $(this)[method]('navbar-stuck')
        .not('.navbar-open')[method]('navbar-short');
    });

    // is-fixed
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

  // .hamburger
  $('.hamburger:not(.added)').each(function() {
    $(this).addClass('added')
      .click(function() {
        $(this)
          .toggleClass('hamburger-open')
          .parents('.navbar')
          .toggleClass('navbar-open')
          .removeClass('navbar-short');
      }).parents('.navbar').find('a:not(.hamburger)').click(function() {
      $('.hamburger-open').click();
    });
  });

  // smartResize
  $(window).smartResize(function() {
    if ($(window).width() > 991) {
      $('.navbar-auto-collapse .hamburger-open').click();
    }

    $('.section-16by9').each(calculate16by9);

  }).keydown(function(event) {
    if (27 == event.which) // ESC
      $('.hamburger-open').click();
  });

  if (isMobile && navigator.userAgent.match(/Chrome/i)) { // simple fix for Chrome's scrolling
    (function(width, height) {
      var deviceSize = [width, width];
      deviceSize[height > width ? 0 : 1] = height;

      $(window).smartResize(function() {
        var windowHeight = $(window).height();
        if ($.inArray(windowHeight, deviceSize) < 0)
          windowHeight = deviceSize[$(window).width() > windowHeight ? 1 : 0];
        $('.section-full-height').css('height', windowHeight + 'px');
      });
    })($(window).width(), $(window).height());
  } else if (!isSupportViewportUnits) { // fallback for .section-full-height
    $(window).smartResize(function() {
      $('.section-full-height').css('height', $(window).height() + 'px');
    });
    if ($('html').hasClass('site-loaded') && $('.section-full-height').length)
      $(window).resize();
  }

  var enabled = $('.section-16by9');
  if (enabled.length) {
    enabled
      .attr('data-16by9', 'true')
      .each(calculate16by9);
  } else {
    $('[data-16by9]')
      .css('height', '')
      .removeAttr('data-16by9');
  }

  // .parallax-background
  if ($.fn.jarallax && !isMobile) {
    $(document).on('destroy.parallax', function(event) {
      $('.parallax-background')
        .jarallax('destroy')
        .css('position', '');
    });
    $('.parallax-background')
      .jarallax()
      .css('position', 'relative');
  }

  // .fixed-top
  if (fixedTopTimeout) clearTimeout(fixedTopTimeout);
  fixedTopTimeout = setTimeout(function() {
    if (fixedTop) {
      fixedTop.fixed = false;
      $(fixedTop.elm).removeClass('is-fixed');
    }
    $('.fixed-top:first').each(function() {
      fixedTop = {
        breakPoint: $(this).offset().top + $(this).height() * 3,
        fixed: false,
        elm: this
      };
      $(window).scroll();
    });
  }, 650);

  // init
  $('html').addClass('site-loaded');
  $(window).resize().scroll();

  // smooth scroll
  $(document).click(function(e) {
    try {
      var target = e.target;

      do {
        if (target.hash) {
          var useBody = /#bottom|#top/g.test(target.hash);
          $(useBody ? 'body' : target.hash).each(function() {
            e.preventDefault();
            // in css sticky navbar has height 64px
            var stickyMenuHeight = $('.navbar-sticky').length ? 64 : 0;
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
