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

  // vimeofy
  var autoplay = (self.location.port != 9000);
  $('.front #background').vimeofy({
    url: 'https://vimeo.com/170180787',
    color: '#00D8D8',
    autoplay: autoplay,
    loop: true,
    delay: 5e3
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
