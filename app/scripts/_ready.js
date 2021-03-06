export default function($) {
  // process pagepiling
  // if ($.pagepiling) {
  //   $('#pagepiling').pagepiling();
  // }

  function isIOS() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    return iOS;
  }

  $('.front').each(function() {
    // vimeofy
    // don't render the video in the background on touch devices
    // @FIXME - should use "videoautoplay" but that doesn't seem to be set on desktop
    if ($('html').hasClass('videoautoplay') || !isIOS()) {
      var autoplay = (self.location.port != 9000);
      $('#background').vimeofy({
        url: 'https://vimeo.com/178568007',
        color: '#ffffff',
        autoplay: autoplay,
        loop: true,
        delay: 0,
        background: 1
      });
      $('html').removeClass('poster');
    }

    // waypoint
    var waypoint = new Waypoint({
      element: document.getElementById('section2'),
      handler: function(direction) {
        if (direction == 'down') {
          $('.navbar').addClass('going-down').removeClass('top');
        } else {
          $('.navbar').addClass('top').removeClass('going-down');
        }
      },
      offset: 100
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

  });

  $('.flex-slider').each(function() {
    var $this = $(this),
      opts = {};

    // set flex-slider options
    // see https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
    switch ($this.data('slider')) {
      case 'tablet':
        opts = {
          animation: 'slide',
          direction: 'vertical',
          slideshowSpeed: 5000,
          easing: 'swing',
          keyboard: false,
          pauseOnHover: false,
          controlNav: false,
          directionNav: false,
          randomize: false
        };
        break;
      case 'phone':
        opts = {
          animation: 'slide',
          direction: 'vertical',
          slideshowSpeed: 7000,
          animationSpeed: 1000,
          easing: 'linear',
          keyboard: false,
          pauseOnHover: false,
          controlNav: false,
          directionNav: false,
          randomize: false
        };
        break;
      case 'quotes':
        opts = {
          animation: 'fade',
          direction: 'horizontal',
          pauseOnHover: false,
          controlNav: false,
          directionNav: false,
          randomize: true,
          smoothHeight: true
        };
        break;
      default:
        // animation
        opts = {
          animation: 'slide',
          direction: 'horizontal',
          pauseOnHover: true,
          controlNav: true,
          directionNav: false,
          randomize: false,
          slideshowSpeed: 6500,
          initDelay: 750
        };
        break;
    }

    $this.flexslider(opts);
  });

  // iFrameResize
  $('iframe.resizable').iFrameResize();

}
