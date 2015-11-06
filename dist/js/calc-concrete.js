$(document).ready(function(){
	$('.js-calc-calc').click(function(e){
		e.preventDefault();
		var size = $('.calculator__body :input[name="size"]');
		var quality = $('.calculator__body :input[name="quality"]');
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
			var vol = size.val().replace(',','.').replace(' ','')

			var part = 1 / (cementFraction / 1.5  + sandFraction / 1.8 + brockenRockFraction / 1.4);
			var cement = Math.round(part * 1500 * cementFraction) * vol;
			var sand = Math.round(part * 1800 * sandFraction) * vol;
			var brockenRock = Math.round(part * 1400 * brockenRockFraction) * vol;
			result = "На " + size.val() + " "+ plural(Math.floor(size.val()), "кубометр", "кубометра", "кубометров") + " бетона " + quality.val() +
			" требуется " + cement + " кг цемента, " + sand + " кг песка, " + brockenRock + " кг щебня."

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