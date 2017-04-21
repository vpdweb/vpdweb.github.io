"use strict";
(function ($) {
  /***************************************************************
   * Enables javascript support for theme
   ==============================================================*/
  app.initTheme({
    colorTheme: 'default',
    /** By default all svg icons are inlined at the beggining of
     * the <body> tag. If you would like to remove that inlined
     * data from the template, please set this to true.
     ==============================================================*/
    loadSvgWithAjax: false
  });
  /***************************************************************
   * Enables fixed menu
   * Enables fixed search bar in mobile view
   *
   * To disable this just comment out
   ==============================================================*/
  app.activateHeaderSpy();

  /***************************************************************
   * Enables "Scroll to top" button
   *
   * To disabled this just comment out and remove the corresponding
   * code from templates
   ==============================================================*/
  app.activateScrollToTopSpy();

  app.scrollAnimation();

 /**
   * See more options
   * https://developers.google.com/maps/documentation/javascript/reference#MapOptions
   */
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(33.74229160384012, -117.86845207214355),
    // Disable scrolling wheel for usability purposes
    scrollwheel: false,
    zoomControl: true,
    mapTypeControl: true,
    autocomplete: {
      componentRestrictions: {'country': 'us'}
    },
    mapTypeControlOptions: {
    position: google.maps.ControlPosition.LEFT_TOP
    },
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      scaleControl: true,
        scaleControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
      panControl: true,
        panControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    }
  };

  initPlyr('.player');
  initPartnersSlider('#partners-slider');
  initSelect2('select.form-control');
  initGallery('.js-gallery-item');
  initSubscribe('.js-subscribe-form');
  initReviewSlider('#review-slider');
  initMainBanner('.js-banner');
  initWideSlider('#slider-wide');
  initBannerSlider('.js-banner-slider');
  initBannerSliderAndThumbs('.js-slider-thumbs');
  initSlider('.js-slick-blog');
  initSlider('.js-slick-plan');
  initSlider('#counter-slider');
  initGoogleMap('.js-map-canvas-contact', window.demodata[3]);
  initBtnDemo('.js-btn-demo');
  initPopovers('.js-popover');
  initGeocoderGoogleMap('.js-map-location-dashboard-submit', {lat: 37.7749295, lng: -122.41941550000001});
  initGeocoderGoogleMap('.js-map-location-dashboard', {lat: 37.7749295, lng: -122.41941550000001});
  initGeocoderGoogleMap('.js-map-location-dashboard-hidden', {lat: 37.7749295, lng: -122.41941550000001});
  initLeafletMap('.js-map-canvas-leaflet', window.demodata);


  /***************************************************************
   * Common javascript code used on most of the pages
   * You can place here the code that is run on every page.
   * I do not advice to put here the code that runs only on
   * specific page, because of performance reasons
   ==============================================================*/
  (function () {

    /***************************************************************
     * Examples of form validations
     *
     * Plugins used:
     * - http://parsleyjs.org/doc/index.html (for validation itself)
     * - https://github.com/sciactive/pnotify (for showing global notifications)
     *
     * Validation options are set via data-parsley-* attributes,
     * see example in the templates (for example feedback form in
     * the footer) or http://parsleyjs.org/doc/examples.html
     ==============================================================*/

    if ($('.js-form-property-1').length !== 0) {
      $('.js-form-property-1')
        .parsley()
        .on('form:success', function (formInstance) {
          app.notifier.showSuccess('You have successfully submit the form! 1');
          $('.form-property--dashboard a[href="#Location"]').tab('show'); // Select last tab
          return false;
        })
        .on('form:error', function (formInstance) {
          app.notifier.showError('Submited failed! Please try again. 2');

          return false;
        })
        .on('form:submit', function (formInstance) {
          // do something with your data here
          console.log(arguments);
          formInstance.submitEvent.preventDefault();
        });
    }

  })();

  function initSubscribe (container) {

    /**
     * Subscribe form validation initialization as well as
     * displaying PNotify global message on error/success
     *
     * app.notifier.showSuccess/showError is a wrapper around `PNotify` function
     * with predefined defaults to make it look good in this theme
     *
     * if you would like to modify it, feel free to use the PNotify
     * plugin directly
     ==============================================================*/
    var $subscribeForm = $(container);
    if (!$subscribeForm.length)  return;
    $subscribeForm
      .parsley()
      .on('form:success', function (formInstance) {
        app.notifier.showSuccess('You have been successfully subscribed!');
        return false;
      })
      .on('form:error', function (formInstance) {
        app.notifier.showError('Subscription failed! Please try again.');
        return false;
      });
  }

 function initGallery (container) {
    /**
     * Setup image popups with Photoswipe plugin
     * See documentation in http://photoswipe.com/documentation/options.html
     ==============================================================*/
    var $galleryItem = $(container);
    if (!$galleryItem.length) return;
    var gallery = app.createPhotoSwipe(container,
      {
        /*
         See here available options
         http://photoswipe.com/documentation/options.html
         */
      }
    );
  }

  function initSelect2 (container) {

    /**
     * Setup select form fields improved with Select2 plugin
     * See documentation in https://select2.github.io
     ==============================================================*/
    var $inSelect = $(container);
    var $inWidgetsSelect = $('.widget select');
    if ($inSelect.length) $inSelect.select2({width: '100%'});
    if ($inWidgetsSelect.length) $inWidgetsSelect.select2({width: '100%'});
  }

  function initPartnersSlider(container) {
    /**
     * Slick slider for "Our partners" block
     * See documentation for options http://kenwheeler.github.io/slick/
     ==============================================================*/
    var $partnersSlider = $(container) ;
    if (!$partnersSlider.length) return;

    $partnersSlider
      .find('.js-slick-slider')
      .slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        autoplay: true,
        accessibility: false,
        prevArrow: $partnersSlider.find('.js-partners-prev'),
        nextArrow: $partnersSlider.find('.js-partners-next'),
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
  }

  function initPlyr(container) {
    /***************************************************************
     * Plyr initialization for displaying html5 video
     * If you don't plan to have html5 video on the website,
     * you can remove this
     * Documentation https://github.com/selz/plyr
     ==============================================================*/
    var $player = $(container);
    if (!$player.length) return;
    plyr.setup();
    //
    //$('.js-player-play').on('click', function () {
    //  $(this).closest('.player')[0].plyr.play();
    //  $(this).hide();
    //});
  }

  function initReviewSlider(container) {
    /***************************************************************
     * Initialize sliders for user reviews
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    var $reviewSlider = $(container);
    if (!$reviewSlider.length) return;
    $reviewSlider
      .find('.js-slick-slider')
      .slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000
      });
  }

  function initMainBanner(container) {
    var $container = $(container);
    if (!$container.length) return;

    var $searchForm = $container.find('.js-search-form');
    var $header = $('.header');
    var $headerNav = $('#header-nav');
    var $mainBannerMap = $container.find('.map');

    /***************************************************************
     * Initialize banner animation
     * Just add class start animation on document ready
     ==============================================================*/

    $container.addClass('banner--play');
    $searchForm.on('formChange', _.throttle(showMap, 500));
    initBannerLineAnimation(container);
    initIndexMap('.js-map-index-canvas');

    var stateOpenedMap = false;

    function showMap() {
      if (stateOpenedMap) return;
      if (app.gridSize.get() === 'lg') {
        requestAnimationFrame(function () {
          if ($headerNav.hasClass('navbar--overlay')) {
            $header.addClass('header--white');
            $headerNav.addClass('navbar--overlay-map');
          }
          $mainBannerMap.addClass('opened');
          $searchForm.addClass('form--white');
          stateOpenedMap = true;
        });
      }
    }
  }

  function initBannerLineAnimation(container) {
    /***************************************************************
     * Initialize line animation
     * See https://github.com/maxwellito/vivus for more options
     ==============================================================*/
    if (!$('#banner-line').length) return;
    var $container = $(container);
    var $searchForm = $container.find('.js-search-form');

    new app.Vivus('banner-line', {type: 'async', start: 'autostart', ignoreInvisible: false, duration: 50}, function () {
      var $sliderItem = $('#banner-line').closest('.slider__item');
      if ($sliderItem.hasClass('slick-slide') && !$sliderItem.hasClass('slick-active')) return;
      $container.find('.js-arrow-end').css({opacity: 1});
      $searchForm.addClass('form--anim');
    });
  }

  function initWideSlider(container) {
    /***************************************************************
     * Initialize sliders on the frontpage
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    var $wideBanner = $(container);
    if (!$wideBanner.length) return;
    var $wideBannerSlider = $wideBanner.find('.js-slick-slider');


    $wideBannerSlider
      .slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        lazyLoad: 'progressive',
        prevArrow: $wideBanner.find('.js-banner-prev'),
        nextArrow: $wideBanner.find('.js-banner-next'),
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              centerMode: false,
              variableWidth: false,
              arrows: true
            }
          }
        ]
      });
    $wideBannerSlider.on('setPosition', function (event, slick) {
      $wideBanner.addClass('slider--init');
    });
  }

  function initBannerSlider(container) {
    /***************************************************************
     * Initialize sliders on the frontpage
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    if (app.gridSize.get() === 'xs') return;
    var $banner = $(container);
    var $bannerSlider = $banner.find('.js-slick-slider');

    $bannerSlider
      .slick({
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 600,
        slidesToShow: 1,
        lazyLoad: 'progressive',
        accessibility: false,
        arrows: false,
        focusOnSelect: false
      });
  }

  function initBannerSliderAndThumbs(container) {
    /***************************************************************
     * Slider for blog pages
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    var $sliders = $(container);
    if (!$sliders.length) return;
    var $sliderNavSlick, $sliderSlick, _$sliderNavSlickCache;
    $sliders.each(function () {
      var $sliderContainer = $(this);
      var $sliderSlick = $sliderContainer.find('.js-slick-slider');
      var $sliderNavContainer = $sliderContainer.siblings('.slider');
      $sliderNavSlick = $sliderNavContainer.find('.js-slick-slider');

      $sliderSlick
        .slick({
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: false,
          arrows: false,
          accessibility: false,
          fade: true
        });

      _$sliderNavSlickCache = $sliderNavSlick.html();
      $sliderNavSlick
        .slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          focusOnSelect: true,
          arrows: true,
          accessibility: false,
          centerMode: true,
          centerPadding: 0,
          prevArrow: $sliderNavContainer.find('.js-slick-prev'),
          nextArrow: $sliderNavContainer.find('.js-slick-next'),
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
              }
            }
          ]
        });

      var $sliderCategories = $('.js-slider-category');
      var firstRun = true;
      var slideRel;
      $sliderCategories.on('click', function () {
        $sliderCategories.removeClass('active');
        $(this).addClass('active');
        var slides;
        var param = $(this).data('filter');

        $sliderNavSlick.slick('slickRemove', true, true, true);
        if (param === 'all') {
          slides = _$sliderNavSlickCache;
        } else {
          slides = $(_$sliderNavSlickCache).filter('.slider__item--' + param);
        }
        $sliderNavSlick.slick('slickAdd', slides);


        slideRel = $sliderNavSlick.find('.slick-current').data('slide-rel');
        $sliderSlick.slick('slickGoTo', slideRel, false);
      });

      // On before slide change
      $sliderNavSlick
        .on('afterChange', function(event, slick, currentSlide, nextSlide){
          slideRel = $sliderNavSlick.find('.slick-current').data('slide-rel');
          $sliderSlick.slick('slickGoTo', slideRel, false);
        })
        .on('click', '.slider__item', function () {
          var item = $(this);
          slideRel = $(item).data('slide-rel');
          $sliderSlick.slick('slickGoTo', slideRel, false);
        });

    });



  }

  function initSlider(container) {
    /***************************************************************
     * Slider for blog pages
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    var $blogSliders = $(container);
    if (!$blogSliders.length) return;

    $blogSliders.each(function () {
      var $sliderContainer = $(this),
        $sliderCurrent = $sliderContainer.find('.js-slick-current'),
        $sliderTotal = $sliderContainer.find('.js-slick-total');


      $sliderContainer
        .find('.js-slick-slider')
        .on('init', function (event, slick) {
          $sliderTotal.html(slick.slideCount);
        })
        .slick({
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: false,
          prevArrow: $sliderContainer.find('.js-slick-prev'),
          nextArrow: $sliderContainer.find('.js-slick-next')
        })
        .on('afterChange', function (event, slick, currentSlide) {
          $sliderCurrent.html(currentSlide + 1 + ' /');
        });
    });
  }

  function initGoogleMap(container, location) {
    /**
     * Google map initialization
     ==============================================================*/

    var $mapCanvas = $(container);
    if (!$mapCanvas.length) return;

    (function () {
      // We're using here sample coordinates, please replace them with real ones
      var coordinates = new google.maps.LatLng(location.lat, location.lng);
      // Default map zoom
      // jQuery object with map container

      var $mapBtn = $('.js-map-btn');


      /**
       * This is a wrapper around original Google Maps object,
       * which brings some user experience improvements for mobile users,
       * So that, when user loads the map on small-screen device, it
       * is replaced by a button, clicking on it will open full screen
       * popup with the map in it.
       *
       * If you don't want/need that, you can call `google.maps.Map` contructor directly
       *
       * See https://developers.google.com/maps/documentation/javascript/
       * for more examples and options
       */
      app.createMap(
        // Map container
        $mapCanvas,

        // A button, clicking on which will display the map in a fullscreen popup on small screens
        $mapBtn,

        /**
         * This callback is executed when the Google Map is loaded
         * As first agrument it receives the google map object
         *
         * Please place here all the code that needs the google map object
         */
        function () {
          var map = new google.maps.Map($mapCanvas[0], _.merge(mapOptions, {zoom: 7, coordinates : coordinates }));

          /**
           * app.createMarker is a helper which contains
           * preconfigured Marker object (see docs https://developers.google.com/maps/documentation/javascript/markers)
           *
           * If you want something more sophisticated, please use these libraries directly
           */
          app.createGmapMarker.create(
            map,
            coordinates,
            location.address
          );
        });
    })();
  }


  function initBtnDemo(selector) {
    /***************************************************************
     * Button interaction demo
     * See feature_ui.html (Full button interaction) for dempnstration
     *
     * This feature is useful for displaying visual feedback
     * to users that interact with long-running requests like:
     * - credit card processing
     * - waiting in the queue
     * - or simple ajax form submit
     ==============================================================*/
    var $buttons = $(selector);
    if (!$buttons.length) return;
    $buttons.on('click', function () {
      var $btn = $(this);
      var state = $btn.data('state') || 'success';

      $btn.addClass('loading');
      setTimeout(function () {
        $btn.addClass('progress');
      }, 500);
      setTimeout(function () {
        $btn.removeClass('loading');
        $btn.removeClass('progress');
        $btn.addClass(state);
      }, 1000);
      return false;
    });
  }

  
  function initPopovers(container) {
    /**
     * Popover example
     * Docs http://getbootstrap.com/javascript/#popovers
     ==============================================================*/

    var $popovers = $(container);
    if (!$popovers.length) return;
    $popovers.popover();
  }

  function initGeocoderGoogleMap(container, coordinates) {
    var $map = $(container);
    if (!$map.length) return;
    /** Helper to create a Google Map that:
     * - provides a draggable marker
     * - syncs marker position to the Lat and Long fields
     * - provides a autocomplete fields with locations
     ==============================================================*/
    var $triggerButton = $('.js-map-btn');
    var $mapCanvas = $map.find('.js-map');
    app.createMap(
      $mapCanvas,
      $triggerButton,
      function () {
        var map, marker,
          geocoder,
          $autocompleteAddress = $map.find('.js-autocomplete'),
          $locationCoords = $map.find('.js-location-coords'),
          $btnRemoveOverlays = $map.find('.js-remove-overlays'),
          stateMapInit = false
          ;

        geocoder = new google.maps.Geocoder();

        map = new google.maps.Map($mapCanvas[0], mapOptions);


        google.maps.event.addListener(map, 'click', function (event) {
          placeMarker(event.latLng);
        });

        app.geolocation.activate(map, {
          buttonTrigger: $map.find('.js-geolocate'),
          onSuccess: function (latLng) {
            placeMarker(latLng);
          }
        });

        function placeMarker(location) {
          if (marker) {
            marker.setPosition(location); //on change sa position
          } else {
            addMapMarker(location.lat(), location.lng())
          }
          setCoordinatesFiled(location.lat(), location.lng());
          getAddress(location);
        }

        function getAddress(latLng) {
          geocoder.geocode({'latLng': latLng},
            function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                  $autocompleteAddress[0].value = results[0].formatted_address;
                }
                else {
                  $autocompleteAddress[0].value = "No results";
                }
              }
              else {
                $autocompleteAddress[0].value = status;
              }
            });
        }

        // Create the autocomplete object and associate it with the UI input control.
        // Restrict the search to the default country, and to place type "cities".
        var autocomplete = new google.maps.places.Autocomplete(
          /** @type {HTMLInputElement} */( $autocompleteAddress[0] ),
          mapOptions.autocomplete);

        google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

        $autocompleteAddress.on('keypress', function (e) {
          if (e.keyCode == 13) return false;
        });


        // When the user selects a city, get the place details for the city and
        // zoom the map in on the city.
        function onPlaceChanged() {
          var place = autocomplete.getPlace();
          if (place.geometry) {
            map.panTo(place.geometry.location);
            // change zoom map only if user did not change it before
            map.setZoom(15);
            if (marker) {
              var markerCoords = new google.maps.LatLng(place.geometry.location.A, place.geometry.location.F);
              marker.setPosition(markerCoords); //on change sa position
            } else {
              addMapMarker(place.geometry.location.A, place.geometry.location.F)
            }
            setCoordinatesFiled(place.geometry.location.A, place.geometry.location.F);
          } else {
            autocomplete.placeholder = 'Enter a address';
          }

        }

        // create marker on map
        function addMapMarker(lat, lng) {
          var markerCoords = new google.maps.LatLng(lat, lng);

          marker = app.createGmapMarker.createAdvanced({
            position: markerCoords,
            map: map,
            draggable: true
          });

          google.maps.event.addListener(marker, 'dragend', function () {
            placeMarker(marker.getPosition());
          });
        }

        // set coordinates in fileds
        function setCoordinatesFiled(lat, lng) {
          $locationCoords[0].value = lat;
          $locationCoords[1].value = lng;
        }

        function removeOverlays() {
          for (var i=0; i < overlays.length; i++)
          {
            overlays[i].overlay.setMap(null);
          }
          overlays = [];
        }

        var drawingManager = new google.maps.drawing.DrawingManager({
          //drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
            ]
          }
        });

        if (!stateMapInit) {
          drawingManager.setMap(map);
        }


        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
          overlays.push(e);
        });


        $locationCoords.on('input', function (e) {
          if ($.isNumeric($locationCoords[0].value()) && $.isNumeric($locationCoords[1].value())) {
            var latlng = new google.maps.LatLng($locationCoords[0].value(), $locationCoords[1].value());
            if (marker) {
              marker.setPosition(latlng); //on change sa position
            } else {
              addMapMarker(latlng.lat(), latlng.lng())
            }
            map.panTo(latlng);
            getAddress(latlng);
            if (e.keyCode == 13) return false;
          }
        });

        $btnRemoveOverlays.on('click', function () {
          removeOverlays();
        });

      }
    );

  }


  /***************************************************************
   * As an alternative to Google Maps, you can use Leaflet
   * which uses data from OSM and tiles from MapBox
   ==============================================================*/

  function initLeafletMap(container, properties) {
    var $mapCanvas = $(container);
    if (!$mapCanvas.length) return;
    /*
     * This is a wrapper around original Leftlet map object,
     * which brings some user experience improvements for mobile users,
     *
     * If you don't want/need that, you can call ` L.map` contructor directly
     *
     * See http://leafletjs.com/reference.html
     * for more examples and options
     ==============================================================*/
    var coordinates = new L.LatLng(33.74229160384012, -117.86845207214355);
    var firstRun = false;
    var map;
    app.createMap(
      // Map container
      $mapCanvas,

      // A button, clicking on which will display the map in a fullscreen popup on small screens
      $('.js-map-btn'),

      /**
       * This callback is executed when the Leftlet is loaded
       * As first agrument it receives the Leftlet object
       *
       * Please place here all the code that needs the Leftlet object
       */
      function () {
        if (!firstRun) {
          map = L.map($mapCanvas[0], _.merge(  {
            zoom: 10,
            center: coordinates,
            zoomControl: false,
            // Disable scrolling wheel for usability purposes
            scrollWheelZoom: false
          }));

          L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
          }).addTo(map);

          var controlZoom = L.control.zoom({
            position: 'topright'
          });
          controlZoom.addTo(map);


          map.invalidateSize();
          // Loop over demo properties to create markers over map
          _.each(properties, function (item) {
            var infoboxHtml = generateMarkerHTML(item);

            /**
             * app.createLeafletInfoboxMarker is a helper which contains:
             * - preconfigured Marker object (see docs http://leafletjs.com/reference.html#marker)
             * - preconfigured Popup object (see docs http://leafletjs.com/reference.html#popup)
             * to make sure they work and look good with our theme.
             *
             * If you want something more sophisticated, please use these objects directly
             */
            app.createLeafletInfoboxMarker(
              map,
              new L.LatLng(item.lat, item.lng),
              item.address,
              infoboxHtml,
              // You can pass directly the 'white' or 'dark' value or get it some other way
              $mapCanvas.data('infoboxTheme')
            );
          });
        } else {
          map.invalidateSize();
        }

        firstRun = true;
      });
  }

  // Simple helper for generating html content for infoboxes
  function generateMarkerHTML(data) {
    var link;
    link = "assets/media-demo/properties/277x180/" + data.image + ".jpg";
    return "<span class='map__address'>" + data.address +
      "</span> <span class='map__info'>" +
      "<img  class='map__photo' src='" + link + "'/><span class='map__details'> " +
      "<dl><dt>Type:</dt> <dd>" + data.type + "</dd></dl>" +
      "<dl><dt>Area:</dt> <dd>" + data.area + " m2</dd></dl>" +
      "<dl><dt>Bedrooms:</dt> <dd>" + data.bedrooms + "</dd></dl>" +
      "</span></span> <span class='map__price'><strong>$" + data.price +
      "</strong></span> <a  class='map__more' href='property_details.html'>Details</a>";
  }

})(jQuery);
