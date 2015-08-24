//fancybox effects, written in jquery
$(document).ready(function() {
/*    *  Simple image gallery. Uses default settings    */

  $('.fancybox').fancybox();

  /*     *  Different effects     */
  // Change title type, overlay closing speed
  $(".fancybox-effects-a").fancybox({
    helpers: {
      title : {
        type : 'outside'
      },
      overlay : {
        speedOut : 0
      }
    }
  });

  // Disable opening and closing animations, change title type
  $(".fancybox-effects-b").fancybox({
    openEffect  : 'none',
    closeEffect : 'none',

    helpers : {
      title : {
        type : 'over'
      }
    }
  });

  // Set custom style, close if clicked, change title type and overlay color
  $(".fancybox-effects-c").fancybox({
    wrapCSS    : 'fancybox-custom',
    closeClick : true,

    openEffect : 'none',

    helpers : {
      title : {
        type : 'inside'
      },
      overlay : {
        css : {
          'background' : 'rgba(238,238,238,0.85)'
        }
      }
    }
  });

  // Remove padding, set opening and closing animations, close if clicked and disable overlay
  $(".fancybox-effects-d").fancybox({
    padding: 0,

    openEffect : 'elastic',
    openSpeed  : 150,

    closeEffect : 'elastic',
    closeSpeed  : 150,

    closeClick : true,

    helpers : {
      overlay : null
    }
  });

  /*     *  Media helper. Group items, disable animations, hide arrows, enable media and button helpers.    */
  $('.fancybox-media')
    .attr('rel', 'media-gallery')
    .fancybox({
      openEffect : 'none',
      closeEffect : 'none',
      prevEffect : 'none',
      nextEffect : 'none',

      arrows : false,
      helpers : {
        media : {},
        buttons : {}
      }
    });
});