( function($) {
	'use strict';

	var spCustom = {
		/**
		 * Main init function
		 *
		 */
		init : function() {
			this.config();
			this.bindEvents();
		},

		/**
		 * Cache Elements
		 *
		 */
		config : function() {

			this.config = {
				// Main
				$window                 : $( window ),
				$document               : $( document ),
				$windowWidth            : $( window ).width(),
				$windowHeight           : $( window ).height(),
				$windowTop              : $( window ).scrollTop(),
				$body                   : $( 'body' ),
				$viewportWidth          : '',
				$is_rtl                 : false,
			};

		},	

		bindEvents : function() {
			var self = this;

			// Run on doucment ready
			self.config.$document.on( 'ready', function() {
				console.log('Start...');

				$('#simple-menu').sidr();
			} );
		}
	}

	spCustom.init();
	 
}) ( jQuery );	