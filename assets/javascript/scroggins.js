/**
 * Returns a string representing the browser that's being used. This is primarily
 * used for visitors using Safari.
 *
 * @param $ A reference to the jQuery object.
 */
var scroggins_get_browser = function( $ ) {
	return $.trim( $( '#browser-data' ).text() );
};

/**
 * If you're using anything other than Safari, the player loads in the context of the page;
 * otherwise, it will redirect to page in Safari.
 *
 */
var scroggins_load_video_player = function( $ ) {

	/**
	 * If the login is successful, hide the form and then asynchronously inject the
	 * player into this page.
	 */
	if ( 0 < $( '#redirect').length ) {

		$( '#content-container')
			.children()
			.fadeOut( 'fast' );

		// Safari gets a redirect; others get an Ajax video in the current page.
		if ( '' === scroggins_get_browser( $ ) ) {

			$.get( 'partials/video.php',
				function( data ) {

					$( 'header' ).css({
						'margin-bottom': 0
					});

					$( '#content-container' )
						.css({
							'margin-bottom': '-1em'
						}).append( data );
				}
			);
		} else {
		    window.location.href = 'https://event.clayscroggins.com/safari';
        }
	}
};

/**
 * Handles all form submissions for submitting emails to InfusionSoft. Once done, will either
 * redirect Safari users to their video experience or will load the player for our visitors.
 *
 * @param $ A reference to the jQuery object.
 */
var scroggins_infusionsoft_handler = function( $ ) {

    var $submit = $( '#if-submit' );

    // If there's no submit button, then we just duck out.
    if ( 0 === $submit.length ) {
        return;
    }

    // Otherwise, we handle when the button is clicked.
    $submit.on( 'click', function(evt ) {

        var should_return = false;
        $( '.infusion-field-input-container[required]' ).each(function() {

            if ( 0 === $.trim( $( this ).val() ).length ) {
                should_return = true;
            }
        });

        if ( should_return ) {
            return;
        }

        if ( ! should_return ) {

            $( '#if-form' ).hide();
            $( '#if-success' )
                .removeClass( 'hide' )
                .show();

			scroggins_load_video_player( $ );
        }
    });
};

;(function( $ ) {
	'use strict';

	$(function() {

		scroggins_infusionsoft_handler( $ );
		$( document ).foundation();
	});
})( jQuery );