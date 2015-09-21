$(document).ready(function(){
	// Toggle header description
	$('.header__button').click(function(){
		$('.header__text').slideToggle();
	});

	// Show calculator description on mobile
	$('.calculator__button').click(function(e){
		e.preventDefault();
		$(this).fadeOut().next('.calculator__description').slideDown();
	});

	// Hide select and show div (needs for call-back)
	$('.calc-item__select').on("click", function(){
		$(this).find('.calc-item__select-options').slideToggle();
	});

	selectsSize();

});

$(window).resize(function(){
	$('.calc-item__select').removeAttr('style');
});

var selectsSize = function(){
	if(window.innerWidth > 810){
		$('.calc-item__select').each(function(){
			$(this).find('.calc-item__select-options').show();
			var width = $(this).find('ul').width();
			$(this).find('.calc-item__select-options').hide();
			$(this).css({'min-width': width});
			console.log("width: "+ width);
		});
	}
};