/**
 * Handles all form submissions for submitting emails to InfusionSoft.
 *
 * @param $ A reference to the jQuery object.
 */
var scroggins_infusionsoft_handler = function( $ ) {

    // If there's no submit button, then we just duck out.
    if ( 0 === $( '#if-submit' ).length ) {
        return;
    }

    // Otherwise, we handle when the button is clicked.
    $( '#if-submit' ).on( 'click', function( evt ) {

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

            /**
			 * If the login is successful, hide the form and then asynchronously inject the
			 * player into this page.
			 */
            if ( 0 < $( '#redirect').length ) {

				$( '#content-container')
					.children()
					.fadeOut( 'fast' );

				$.get( 'partials/video.php',
					function( data ) {

						$( 'header' ).css({
							'margin-bottom': 0
						});

						$( '#content-container' )
							.css({
								'margin-bottom': '-1em'
							}).append( data )
					}
				);
            }
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