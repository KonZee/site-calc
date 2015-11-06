$(document).ready(function(){
	$('.js-calc-calc').click(function(e){
		e.preventDefault();
		var inputs = $('.calculator__body :input');
		var values = {};
		var valid = true;
		var result;
		inputs.removeClass('invalid');
		inputs.each(function(){
			if($(this).val() === ""){
				valid = false;
				$(this).addClass('invalid');
			}
			values[this.name] = $(this).val().replace(',','.').replace(' ','');
		});
		if (!valid){
			result = "Заполните все обязательные поля формы"
		}
		else{
			result = Math.ceil(values.width / values.tilewidth) * Math.ceil(values.length / values.tilelength);
			result = result + " " + plural(result, "штука", "штуки", "штук");
		}
		$('.js-result').text(result)
		$('.js-result-wrapper').slideDown();
	});
});

//nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
var plural = function(n, str1, str2, str3) {
	if (n % 10 == 1 && n % 100 != 11 ){
		return str1;
	}
	else if ( n % 10 >= 2 && n % 10 <= 4 && ( n % 100 < 10 || n % 100 >= 20)){
		return str2;
	}
	else {
		return str3;
	}
};