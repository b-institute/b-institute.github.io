---
---

(function($) {
  $.fn.normalizeHeight = function(selector) {
    $(this).each(function() {
      var items = selector ? $(this).find(selector) : $(this).children(),
          maxHeight = 0,
          heights = [];
      $(items).each(function(){
        heights.push($(this).height());
      });
      maxHeight = Math.max.apply(null, heights);

      if (maxHeight) {
        $(items).each(function(){
          $(this).height(maxHeight);
        });
      }
    });
  };
})(jQuery);

$(document).ready(function() {

  /* ======= jQuery Placeholder ======= */
  $('input, textarea').placeholder();

  /* ======= Carousels ======= */
  $('#news-carousel').carousel({interval: false});
  $('#videos-carousel').carousel({interval: false});
  $('#testimonials-carousel').carousel({interval: 6000, pause: "hover"});
  $('#awards-carousel').carousel({interval: false});

  /* ======= Twitter Bootstrap hover dropdown ======= */

  // apply dropdownHover to all elements with the data-hover="dropdown" attribute
  $('[data-hover="dropdown"]').dropdownHover();

  /* Nested Sub-Menus mobile fix */

  $('li.dropdown-submenu > a.trigger').on('click', function(e) {
    var current=$(this).next();
    current.toggle();
    e.stopPropagation();
    e.preventDefault();
    if (current.is(':visible')) {
      $(this).closest('li.dropdown-submenu').siblings().find('ul.dropdown-menu').hide();
    }
  });

  $.ajax({
    type: "GET",
    url: "https://api.imgur.com/3/album/{{ site.imgur.tempAlbumId }}/images",
    dataType: "text",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Client-ID {{ site.imgur.clientId }}');
    },
    success: function(data) {
      var json = $.parseJSON(data);

      json.data.sort(function(a, b) {
        return a.datetime > b.datetime;
      });
      var slidesList = $('<ul></ul>');

      for (var i = 0; i < 5; i++) {
        var image = json.data[i];
        var liHtml = ''+
          '<img src="' + image.link + '" alt="' + image.link + '"/>';
          // '<p class="flex-caption">' +
          // '  <span class="main" >' + image.title + '</span>' +
          // '  <br />' + (image.description ?
          // '  <span class="secondary clearfix" >' + image.description + '</span>' : '') +
          // '</p>';
        $(document.createElement('li')).append(liHtml).appendTo(slidesList);
      }

      $('#promo-slider').append(slidesList);
      slidesList.addClass('slides');

      /* ======= Flexslider ======= */
      $('.flexslider').flexslider({
        animation: "slide",
        start: function ($slider) {
          $slider.addClass('rendered');
          $slider.find('.flex-slider-mask').height($slider.height());
          $('#promo-slider').normalizeHeight('.slides li');
        }
      });
    }
  });

  $('.normalize-height').normalizeHeight();
});
