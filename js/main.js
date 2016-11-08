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
			var switchSignup = $('#signup-alternative'),
			switchSignin = $('#signin-alternative');

			if ( switchSignup.length ) {
				switchSignup.click( function( event ) {
					event.preventDefault();
					$('#signin-modal').modal('toggle');
				});	
			}

			if ( switchSignin.length ) {
				switchSignin.click( function( event ) {
					event.preventDefault();
					$('#signup-modal').modal('toggle');
				});
			}
		},

		mainSearchForm : function() {
			var dateRange = $('.date-range input'),
			guestAdult = 1,
			guestChildren = 0,
			guestInfants = 0,
			guestQuantity = (Number(guestAdult) + Number(guestChildren) + Number(guestInfants)),
			guestPickerWrapper = $('.guest-picker-wrapper'),
			guestPickerType = $('.guest-picker-type'),
			guestTrigger = $('.guest-picker-trigger'),
			guestTotal = guestTrigger.eq(0);

			// Date range picker
			dateRange.each(function() {
			    $(this).datepicker("clearDates");
			});
			$('#checkin').on("changeDate", function(event) {
			    $('#checkin-hidden').val(
			        $('#checkin').datepicker('getFormattedDate')
			    );		
			    $('#checkin').datepicker('hide');
			    $('#checkout').datepicker('show');	    
			});
			$('#checkout').on("changeDate", function(event) {
			    $('#checkout-hidden').val(
			        $('#checkout').datepicker('getFormattedDate')
			    );
			    $('#checkout').datepicker('hide');	
			});

			// Set default guest number
			quickGuestUpdate();
			updateGuestTotal(guestQuantity);

			// Guest picker trigger
			guestTrigger.on( 'click', function( event ) {
				event.preventDefault();
				toggleGuest();

			} );

			// Decreament guest type button trigger
			guestPickerType.on('click', '.btn-decreament', function(event){
				event.preventDefault();
				updateGuestCount($(event.target).parents('.btn-count-container').parent(), 'decreament');
			});

			// Increament guest type button trigger
			guestPickerType.on('click', '.btn-increament', function(event){
				event.preventDefault();
				updateGuestCount($(event.target).parents('.btn-count-container').parent(), 'increament');
			});

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

			function updateGuestCount(guestType, countType){
				if ( countType == 'decreament' ) {
					if ( guestType.hasClass('guest-type-adult') ) {
						if ( guestAdult == 1 ) return;
						guestAdult--;
						guestType.children('.guest-type-label').find("strong").text(guestAdult + guestLabelUpdate('adults'));
					}
					if ( guestType.hasClass('guest-type-children') ) {
						if ( guestChildren == 0 ) return;
						guestChildren--;
						guestType.children('.guest-type-label').find("strong").text(guestChildren + guestLabelUpdate('children'));
					}
					if ( guestType.hasClass('guest-type-infants') ) {
						if ( guestInfants == 0 ) return;
						guestInfants--;
						guestType.children('.guest-type-label').find("strong").text(guestInfants + guestLabelUpdate('infants'));
					}
				} else {
					if ( guestType.hasClass('guest-type-adult') ) {
						if ( guestAdult >= 10 ) return;
						guestAdult++;
						guestType.children('.guest-type-label').find("strong").text(guestAdult + guestLabelUpdate('adults'));
					}
					if ( guestType.hasClass('guest-type-children') ) {
						if ( guestChildren >= 5 ) return;
						guestChildren++;
						guestType.children('.guest-type-label').find("strong").text(guestChildren + guestLabelUpdate('children'));
					}
					if ( guestType.hasClass('guest-type-infants') ) {
						if ( guestInfants >= 5 ) return;
						guestInfants++;
						guestType.children('.guest-type-label').find("strong").text(guestInfants + guestLabelUpdate('infants'));
					}
				}
				guestQuantity = (Number(guestAdult) + Number(guestChildren) + Number(guestInfants));
				updateGuestTotal(guestQuantity);
			}

			function guestLabelUpdate(labelType) {
				switch(labelType) {
				    case "adults":
				        return (guestAdult > 1) ? ' Adults' : ' Adult';
				        break;
				    case "children":
				        return (guestChildren > 1) ? ' Children' : ' Child';
				        break;
				    case "infants":
				        return (guestInfants > 1) ? ' Infants' : ' Infant';
				        break;
				    default:
				        break;
				}
			}

			function quickGuestUpdate() {
				$('.guest-type-adult').children('.guest-type-label').find("strong").text(guestAdult + guestLabelUpdate('adults'));
				$('.guest-type-children').children('.guest-type-label').find("strong").text(guestChildren + guestLabelUpdate('children'));
				$('.guest-type-infants').children('.guest-type-label').find("strong").text(guestInfants + guestLabelUpdate('infants'));
			}

			function updateGuestTotal(quantity) {
				var guestLabel = (quantity > 1) ? ' Guests' : ' Guest';
				guestTotal.text(quantity + guestLabel);
			}
		}

	}

	spCustom.init();
	 
}) ( jQuery );	