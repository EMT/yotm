
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
		$('.shop-info').toggleClass('off-screen');
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
	    image: '/square-image.png',
		token: function(token, args) {
	      // Use the token to create the charge with a server-side script.
	      // You can access the token ID with `token.id`
	      console.log(token)
	      // $('.shop-success').css('display','block');
		  $('.shop-success').removeClass('off-screen');
		  setTimeout(function(){
		  	$('.item-info').addClass('off-screen');
		  },300)
	    }
	  });

	  $('.buy').on('click', function(e) {
	    // Open Checkout with further options
	    handler.open({
	      name: 'Demo Site',
	      description: '2 widgets ($20.00)',
	      amount: 2000,
	      closed: function(){
		    // $('.item-info').css('display','block');
			$('.item-info').removeClass('off-screen');
	      }
	    });
	    e.preventDefault();
	  });



	  // Close Checkout on page navigation
	  $(window).on('popstate', function() {
	    handler.close();
	  });


});


