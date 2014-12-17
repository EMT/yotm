
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

var allColumns = '';

allColumns = true;



	$('.left-hand-reveal').on('click',function(){
		$('.yotm-wrapper').toggleClass('open');
		$('.shop-info').toggleClass('off-screen');
		if ($(window).innerWidth() < 900 ) {
		    if (allColumns) {
		        setTimeout(function(){
					$('.yotm-wrapper').toggleClass('scrollable');
					$('body').toggleClass('noscroll');
				},740);
		        allColumns = false;
		    } else {
		        setTimeout(function(){
					$('.yotm-wrapper').toggleClass('scrollable');
					$('body').toggleClass('noscroll');
				},400);
		        allColumns = true;
		    }
		}
	});

});


