export default function($, isSupportViewportUnits) {
  var fixedTopTimeout,
    scrollTimeout,
    prevScrollTop = 0,
    fixedTop = null,
    isMobile = $.isMobile(),
    isDesktop = !isMobile;

  $('html').addClass(isMobile ? 'mobile' : 'desktop');

  // .mbr-section-16by9 (16 by 9 blocks autoheight)
  function calculate16by9() {
    $(this).css('height', $(this).parent().width() * 9 / 16);
  }

  $(window).scroll(function() {
    // .mbr-navbar-sticky
    $('.mbr-navbar-sticky').each(function() {
      var method = $(window).scrollTop() > 10 ? 'addClass' : 'removeClass';
      $(this)[method]('mbr-navbar-stuck')
        .not('.mbr-navbar-open')[method]('mbr-navbar-short');
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

  // .mbr-hamburger
  $(document).on('add.cards change.cards', function(event) {
    $(event.target).outerFind('.mbr-hamburger:not(.mbr-added)').each(function() {
      $(this).addClass('mbr-added')
        .click(function() {
          $(this)
            .toggleClass('mbr-hamburger-open')
            .parents('.mbr-navbar')
            .toggleClass('mbr-navbar-open')
            .removeClass('mbr-navbar-short');
        }).parents('.mbr-navbar').find('a:not(.mbr-hamburger)').click(function() {
        $('.mbr-hamburger-open').click();
      });
    });
  });

  // smartResize
  $(window).smartResize(function() {
    if ($(window).width() > 991) {
      $('.mbr-navbar-auto-collapse .mbr-hamburger-open').click();
    }

    $('.mbr-section-16by9').each(calculate16by9);

  }).keydown(function(event) {
    if (27 == event.which) // ESC
      $('.mbr-hamburger-open').click();
  });

  if (isMobile && navigator.userAgent.match(/Chrome/i)) { // simple fix for Chrome's scrolling
    (function(width, height) {
      var deviceSize = [width, width];
      deviceSize[height > width ? 0 : 1] = height;

      $(window).smartResize(function() {
        var windowHeight = $(window).height();
        if ($.inArray(windowHeight, deviceSize) < 0)
          windowHeight = deviceSize[$(window).width() > windowHeight ? 1 : 0];
        $('.mbr-section-full-height').css('height', windowHeight + 'px');
      });
    })($(window).width(), $(window).height());
  } else if (!isSupportViewportUnits) { // fallback for .mbr-section-full-height
    $(window).smartResize(function() {
      $('.mbr-section-full-height').css('height', $(window).height() + 'px');
    });
    $(document).on('add.cards', function(event) {
      if ($('html').hasClass('mbr-site-loaded') && $(event.target).outerFind('.mbr-section-full-height').length)
        $(window).resize();
    });
  }

  $(document).on('add.cards change.cards', function(event) {
    var enabled = $(event.target).outerFind('.mbr-section-16by9');
    if (enabled.length) {
      enabled
        .attr('data-16by9', 'true')
        .each(calculate16by9);
    } else {
      $(event.target).outerFind('[data-16by9]')
        .css('height', '')
        .removeAttr('data-16by9');
    }
  });

  // .mbr-parallax-background
  if ($.fn.jarallax && !isMobile) {
    $(document).on('destroy.parallax', function(event) {
      $(event.target).outerFind('.mbr-parallax-background')
        .jarallax('destroy')
        .css('position', '');
    });
    $(document).on('add.cards change.cards', function(event) {
      $(event.target).outerFind('.mbr-parallax-background')
        .jarallax()
        .css('position', 'relative');
    });
  }

  // .mbr-fixed-top
  $(document).on('add.cards delete.cards', function(event) {
    if (fixedTopTimeout) clearTimeout(fixedTopTimeout);
    fixedTopTimeout = setTimeout(function() {
      if (fixedTop) {
        fixedTop.fixed = false;
        $(fixedTop.elm).removeClass('is-fixed');
      }
      $('.mbr-fixed-top:first').each(function() {
        fixedTop = {
          breakPoint: $(this).offset().top + $(this).height() * 3,
          fixed: false,
          elm: this
        };
        $(window).scroll();
      });
    }, 650);
  });

  // init
  $('body > *:not(style, script)').trigger('add.cards');
  $('html').addClass('mbr-site-loaded');
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
