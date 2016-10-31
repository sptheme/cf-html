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

				// Mobile menu
				self.menuToggle();

				// User modal switcher
				self.userModalSwitcher();
				
				// Date range select
				self.mainSearchForm();

			} );
		},

		menuToggle : function() {
			// Site navigation - Menu toggle
			$('.cf-nav-trigger').sidr({
				name	: 'sidr-main',
				source	: '#site-navigation', //#mobile-menu-alternative
				side	: 'right',
				speed	: 300,
				onOpen	: function() {
					$('.cf-menu-icon').addClass('is-clicked');

					$('#page').on( 'click', function( event ) {
						event.preventDefault();
						$.sidr( 'close', 'sidr-main' );
					} );
				},
				onClose : function() {
					$('.cf-menu-icon').removeClass('is-clicked');
				}
			});
		},

		userModalSwitcher : function(){
			var userSignin = $('#signup-alternative'),
			userSignup = $('#signin-alternative');

			if ( userSignin.length ) {
				userSignin.click( function( event ) {
					event.preventDefault();
					$('#signin-modal').modal('toggle');
				});	
			}

			if ( userSignup.length ) {
				userSignup.click( function( event ) {
					event.preventDefault();
					$('#signup-modal').modal('toggle');
				});
			}
		},

		mainSearchForm : function() {
			var dateRange = $('.date-range input'),
			guestPickerWrapper = $('.guest-picker-wrapper'),
			guestTrigger = $('.guest-picker-trigger');

			// Date range picker
			dateRange.each(function() {
			    $(this).datepicker("clearDates");
			});

			// Guest picker
			guestTrigger.on( 'click', function( event ) {
				event.preventDefault();
				toggleGuest();

			} );

			//close guest picker when click parent container
			$('.cover-inner').on('click', function(event){
				if( $(event.target).is($(this)) ) toggleGuest(true);
			});

			function toggleGuest(bool) {
				var guestTypeIsOpen = ( typeof bool === 'undefined' ) ? $('.guest-picker-wrapper').hasClass('guest-open') : bool;

				if ( guestTypeIsOpen ) {
					guestPickerWrapper.removeClass('guest-open');
				} else {
					guestPickerWrapper.addClass('guest-open');
				}
			}
		}

	}

	spCustom.init();
	 
}) ( jQuery );	