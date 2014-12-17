
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


	$('.info-title').on('click', function(){

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

	$('.left-hand-reveal').on('click',function(){
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

});


