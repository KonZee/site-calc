$(document).ready(function(){
	$('.js-calc-calc').click(function(e){
		e.preventDefault();
		var size = $('.calculator__body :input[name="size"]');
		var quality = $('.calculator__body :input[name="quality"]');
		console.log(size.val());
		console.log(quality.val());
		console.log(typeof(quality.val()));
		var result;
		var cementFraction = 1;
		var sandFraction;
		var brockenRockFraction;

		if(size.val() === "" || quality.val() === null){
			result = "Выберите марку бетона и введите объем";
		}
		else{
			switch(quality.val()){
				case "М-100":
					sandFraction = 4.6;
					brockenRockFraction = 7;
				break;
				case "М-150":
					sandFraction = 3.5;
					brockenRockFraction = 5.7;
				break;
				case "М-200":
					sandFraction = 2.8;
					brockenRockFraction = 4.8;
				break;
				case "М-250":
					sandFraction = 2.1;
					brockenRockFraction = 3.9;
				break;
				case "М-300":
					sandFraction = 1.9;
					brockenRockFraction = 3.7;
				break;
			}
			var part = 1 / (cementFraction / 1.5  + sandFraction / 1.8 + brockenRockFraction / 1.4);
			console.log(part);
			var cement = Math.round(part * 1500 * cementFraction);
			var sand = Math.round(part * 1800 * sandFraction);
			var brockenRock = Math.round(part * 1400 * brockenRockFraction);
			console.log(cement, sand, brockenRock)
			result = "На " + size.val() + " "+ plural(Math.floor(size.val()), "кубометр", "кубометра", "кубометров") + " бетона " + quality.val() +
			" требуется " + cement + " кг цемента, " + sand + " кг песка, " + brockenRock + " кг щебня."

		}

//		var inputs = $('.calculator__body :input');
//		var values = {};
//		var valid = true;
//		var result;
//		inputs.removeClass('invalid');
//		inputs.each(function(){
//			if($(this).val() === ""){
//				console.log(this.name)
//				valid = false;
//				$(this).addClass('invalid');
//			}
//			values[this.name] = $(this).val();
//		});
//		if (!valid){
//			result = "Заполните все обязательные поля формы"
//		}
//		else{
//
//		}
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