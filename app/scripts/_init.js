export default function($) {
  $.extend($.easing, {
    easeInOutCubic: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  });

  $.fn.outerFind = function(selector) {
    return this.find(selector).addBack(selector);
  };

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

  $('.front').each(function() {
    // vimeofy
    var autoplay = (self.location.port != 9000);
    $('#background').vimeofy({
      url: 'https://vimeo.com/178568007',
      color: '#ffffff',
      autoplay: autoplay,
      loop: true,
      delay: 0,
      background: 1
    });

    $('.flex-slider').flexslider({
      animation: 'fade',
      direction: 'horizontal',
      pauseOnHover: false,
      controlNav: false,
      directionNav: false,
      randomize: true,
    });

    // waypoint
    var waypoint = new Waypoint({
      element: document.getElementById('section2'),
      handler: function(direction) {
        if (direction == 'down') {
          $('.mbr-navbar').addClass('going-down').removeClass('top');
        } else {
          $('.mbr-navbar').addClass('top').removeClass('going-down');
        }
      },
      offset: 100
    });
  });

  // MailChimp
  window.fnames = [];
  window.ftypes = [];
  fnames[0] = 'EMAIL';
  ftypes[0] = 'email';
  fnames[1] = 'FNAME';
  ftypes[1] = 'text';
  fnames[2] = 'LNAME';
  ftypes[2] = 'text';

}
