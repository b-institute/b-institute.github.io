---
---
var map;
$(document).ready(function() {

    /* ======= jQuery Placeholder ======= */
    $('input, textarea').placeholder();


    /* ======= Carousels ======= */
    $('#news-carousel').carousel({interval: false});
    $('#videos-carousel').carousel({interval: false});
    $('#testimonials-carousel').carousel({interval: 6000, pause: "hover"});
    $('#awards-carousel').carousel({interval: false});


    /* ======= Flickr PhotoStream ======= */
    $('#flickr-photos').jflickrfeed({
        limit: 12,
        qstrings: {
        id: '32104790@N02' /* Use idGettr.com to find the flickr user id */
        },
        itemTemplate:
            '<li>' +
            '<a rel="prettyPhoto[flickr]" href="{{image}}" title="{{title}}">' +
            	'<img src="{{image_s}}" alt="{{title}}" />' +
            '</a>' +
            '</li>'

    }, function(data) {
    	$('#flickr-photos a').prettyPhoto();
    });

    /* ======= Pretty Photo ======= */
    // http://www.no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/
    $('a.prettyphoto').prettyPhoto();

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


    /* ======= Style Switcher ======= */

    $('#config-trigger').on('click', function(e) {
        var $panel = $('#config-panel');
        var panelVisible = $('#config-panel').is(':visible');
        if (panelVisible) {
            $panel.hide();
        } else {
            $panel.show();
        }
        e.preventDefault();
    });

    $('#config-close').on('click', function(e) {
        e.preventDefault();
        $('#config-panel').hide();
    });


    $('#color-options a').on('click', function(e) {
        var $styleSheet = $(this).attr('data-style');
        var $logoImage = $(this).attr('data-logo');
		$('#theme-style').attr('href', $styleSheet);
		$('#logo').attr('src', $logoImage);

		var $listItem = $(this).closest('li');
		$listItem.addClass('active');
		$listItem.siblings().removeClass('active');

		e.preventDefault();

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
                    '<img src="' + image.link + '"  alt="' + image.link + '" />' +
                    '<p class="flex-caption">' +
                    '  <span class="main" >' + image.title + '</span>' +
                    '  <br />' +
                    '  <span class="secondary clearfix" >' + (image.description ? image.description : '') + '</span>' +
                    '</p>';
                $(document.createElement('li')).append(liHtml).appendTo(slidesList);
            }

            $('#promo-slider').append(slidesList);
            slidesList.addClass('slides');

            /* ======= Flexslider ======= */
            $('.flexslider').flexslider({
                animation: "fade"
            });
        }
    });

});
