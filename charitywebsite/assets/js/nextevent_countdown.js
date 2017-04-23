/*
Helper function for the jquery countdown plugin.
It has been used here to display countdown for the next event component on the homepage.
*/

$(function() {
    var endDate = $( "div#clock" ).data( "end-date" );
    var date_template = '<div class="countdown__column"> \
	                <div class="countdown__value">%D</div> \
	                <div class="countdown__label">Days</div> \
	              </div>\
	              <div class="countdown__delimiter"></div> \
	              <div class="countdown__column"> \
	                <div class="countdown__value">%H</div> \
	                <div class="countdown__label">Hours</div> \
	              </div> \
	              <div class="countdown__delimiter"></div> \
	              <div class="countdown__column"> \
	                <div class="countdown__value">%M</div> \
	                <div class="countdown__label">Minutes</div> \
	              </div> \
	              <div class="countdown__delimiter countdown__delimiter--seconds"></div> \
	              <div class="countdown__column"> \
	                <div class="countdown__value">%S</div> \
	                <div class="countdown__label">Seconds</div> \
	              </div>';

    $( "div#clock" ).countdown( endDate, function(event) {
        $( this ).html( event.strftime( date_template ));
    });
});