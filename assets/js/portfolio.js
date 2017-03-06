/**
 * Created by vpd on 12/7/16.
 */

$(function () {
    // Portfolio filter animations
    var $portfolio = $( '.portfolio' ).isotope({
        itemSelector: '.item-box'
    });

    $( '.filter' ).on( 'click', function() {

        // Wrap in conditional to prevent slight grid animation on clicking an already active menu item
        if ( ! $(this).hasClass( 'active' ) ) {
            // Get currently active menu item and remove its '.active' class
            var $currentActiveItem = $( 'ul#filters > li.active' );
            $currentActiveItem.removeClass( 'active ');

            // Then make current clicked menu item active
            $(this).addClass( 'active' );

            // Filter
            var filterValue = $(this).attr( 'data-filter' );
            $portfolio.isotope({ filter: filterValue });
        }
    });

    // Image caption reveal on hover animation
    $( ".item-box" ).hover(
        function () {

            $( this ).find( "img" ).velocity({ opacity: 0.2 }, { duration: "normal" });

        },
        function() {
            $( this ).find( "img" ).velocity({ opacity: 1 }, { duration: "normal" });
        }
    );

});