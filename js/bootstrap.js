
$(document).ready(function(){

	if ($(window).innerWidth() > 600 ) {
		$('.js-slideshow').slick({
		     focusOnSelect: true,
		     slidesToShow: 1,
		     nextArrow: '#right',
		     prevArrow: '#left',
		     cssEase: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
		     speed: 900,
		     autoplay: true,
		     autoplaySpeed: 10000,
		});
	} else {
		$('.js-slideshow').slick({
		     slidesToShow: 1,
		     nextArrow: '#right',
		     prevArrow: '#left',
		     cssEase: 'ease',
		     speed: 300,
		     autoplay: true,
		     autoplaySpeed: 5000,
		});
	}


	var sideClosed = true;

	$('.left-hand-reveal').on('click',function(e){
		e.preventDefault();
		$('.yotm-wrapper').toggleClass('open');

		if ($('.shop-success').hasClass('off-screen') && $('.shop-error').hasClass('off-screen')) {
			$('.item-info').toggleClass('off-screen');
		} else {
			 if (!$('.shop-success').hasClass('off-screen')) {
				$('.shop-success').toggleClass('off-screen');
			 } else if (!$('.shop-error').hasClass('off-screen')) {
				$('.shop-error').toggleClass('off-screen');
			 }
		}

		if ($(window).innerWidth() < 900 ) {
		    if (sideClosed) {
		        setTimeout(function(){
					$('.yotm-wrapper').toggleClass('scrollable');
					$('body').toggleClass('noscroll');
				},740);
		        sideClosed = false;
		    } else {
		        setTimeout(function(){
					$('.yotm-wrapper').toggleClass('scrollable');
					$('body').toggleClass('noscroll');
				},400);
		        sideClosed = true;
		    }
		}
	});

	$(window).on("resize", function () {

		var maxHeight = $('.item-info').outerHeight() + 64;
		var yotmHeight = $('.yotm-wrapper').outerHeight();

		if ($(window).innerHeight() < maxHeight && $(window).outerWidth() > 1024 ) {
			$('.js-height').css('height',maxHeight);
		} else {
			$('.js-height').css('height','');
		}

		if ($(window).innerHeight() < yotmHeight && $(window).outerWidth() > 1024 ) {
			$('.yotm-wrapper').css('height',maxHeight);
		} else {
			$('.yotm-wrapper').css('height','');
		}

	}).resize();

	$('button').on('click', function(){
		$('.item-info').addClass('off-screen');
	});

	// Stripe Stuff

	var handler = StripeCheckout.configure({
	    key: 'pk_live_wiyLwwuB6NOabiqa3UsBqdp9',
	    billingAddress: true,
	    // shippingAddress: true,
	    amount: 1500,
	    currency: 'gbp',
	    name: 'Year of the Maker',
	    description: '2015 calendar — £15',
	    image: false,
		token: function(token, args) {
	      // Use the token to create the charge with a server-side script.
	      // You can access the token ID with `token.id`
	      console.log(token);
	      $.ajax({
	      	url: '/stripe.php',
	      	type: 'POST',
	      	dataType: 'json',
	      	data: {
	      		stripeToken: token.id,
	      		amount: 1500
	      	},
	      	success: function() {
	      		$('.shop-success').removeClass('off-screen');
	      		if ($(window).innerWidth() < 900 ) {
	      			$('.shop-success').addClass('overlay-shown');
	      			$('.black-overlay').addClass('shown');
	      		};
	      	},
	      	error: function() {
	      		$('.shop-error').removeClass('off-screen');
	      		if ($(window).innerWidth() < 900 ) {
	      			$('.shop-error').addClass('overlay-shown');
	      			$('.black-overlay').addClass('shown');
	      		};
	      	}
	      });

	      setTimeout(function(){
		  	$('.item-info').addClass('off-screen');
		  },300); // Such hacks, just a temp thing to demo the concept.
	    }
	  });

	  $('.buy').on('click', function(e) {
	    // Open Checkout with further options
	    handler.open({
	      closed: function(){
			$('.item-info').removeClass('off-screen');
	      }
	    });
	    e.preventDefault();
	  });



	  // Close Checkout on page navigation
	  $(window).on('popstate', function() {
	    handler.close();
	  });

	  $('.js-reset-item-info').on('click', function(e) {
	  	e.preventDefault();
	  	resetItemInfo();
	  });

});


var resetItemInfo = function() {
	$('.shop-success, .shop-error').addClass('off-screen');
	$('.item-info').removeClass('off-screen');

	// Mobile
	$('.shop-error, .shop-success').removeClass('overlay-shown');
	$('.black-overlay').removeClass('shown');

}