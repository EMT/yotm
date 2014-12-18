
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

	var shopOpen = true;
	var shopHeight = $('.shop-info').outerHeight();


	$('.info-title').on('click', function(e){

			e.preventDefault();

			if (shopOpen) {
				$('.shop-info').css('overflow','hidden');
				$('.shop-info').stop().animate({height: "90px", easing: 'ease-in-out'}, 500);
		        shopOpen = false;
		    } else {
				$('.shop-info').stop().animate({height: shopHeight, easing: 'ease-in-out'}, 500 , function() { $('.shop-info').css('overflow','visible') });
		        shopOpen = true;
		    }
	});



	var sideClosed = true;

	$('.left-hand-reveal').on('click',function(e){
		e.preventDefault();
		$('.yotm-wrapper').toggleClass('open');
		$('.item-info').toggleClass('off-screen');
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

		var maxHeight = $('.shop-info').outerHeight() + 64;

		if ($(window).innerHeight() < maxHeight && $(window).outerWidth() > 1024 ) {
			$('.js-height').css('height',maxHeight);
		} else {
			$('.js-height').css('height','');
		}

	}).resize();

	$('button').on('click', function(){
		$('.shop-info').addClass('off-screen');
		// setTimeout(function(){
		// 	$('.shop-info').hide();
		// }, 400)
	});

	// Stripe Stuff

	var handler = StripeCheckout.configure({
	    key: 'pk_test_LlzKma4HdwMJUVRf3FC9YoU9',
	    billingAddress: true,
	    shippingAddress: true,
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
	      	},
	      	error: function() {
	      		$('.shop-error').removeClass('off-screen');
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
}


