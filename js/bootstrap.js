
$(document).ready(function(){
	$('.js-slideshow').slick({
	     focusOnSelect: true,
	     slidesToShow: 1,
	     nextArrow: '#right',
	     prevArrow: '#left',
	     cssEase: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
	     speed: 900
	});

	$('.left-hand-reveal').on('click',function(){
		$('.yotm-wrapper').toggleClass('open');
		$('.shop-info').toggleClass('off-screen');
	});

});


