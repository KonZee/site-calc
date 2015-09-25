$(document).ready(function(){
	$('.js-calc-calc').click(function(e){
		e.preventDefault();
		var inputs = $('.calculator__body :input');
		var values = {};
		var valid = true;
		var result;
		inputs.removeClass('invalid');
		inputs.each(function(){
			if(this.name === "length" || this.name === "width" || this.name === "height" || this.name === "rolllength" || this.name === "rollwidth"){
				if($(this).val() === ""){
					console.log(this.name)
					valid = false;
					$(this).addClass('invalid');
				}
			}
			values[this.name] = $(this).val();
		});
		if (!valid){
			result = "Заполните все обязательные поля формы"
		}
		else{
			result = (parseInt(values.length) + parseInt(values.width)) * 2;
			result = result / values.rollwidth;
			result = result / (values.rolllength / values.height);
			result = result + " " + plural(result, "рулон", "рулона", "рулонов");
		}
		$('.js-result').text(result)
		$('.js-result-wrapper').slideDown();
	});
	$('input[name="doors"]').focusout(function(){
		var doors = $(this);
		if (doors.val() === ""){
			doors.addClass('invalid');
		}
		else{
			doors.removeClass('invalid');
			// remove elements
			if(parseInt(doors.val()) < $("[name^='door-height-']").length){
				console.log($("[name^='door-height-']").length);
				for(var i=$("[name^='door-height-']").length - 1; i >= parseInt(doors.val()); i--){
				//for(var i=parseInt(doors.val()); i< $("[name^='door-height-']").length; i++){
					var parent = $("[name^='door-height-']").eq(i).parent();
					parent.next().remove();
					parent.remove();
				}
			}
			// add elements
			else if (parseInt(doors.val()) > $("[name^='door-height-']").length) {
				var lastIndex = $("[name^='door-height-']").length;
				// Check template support and choose method
				if("content" in document.createElement('template')){
					var template = document.querySelector('#door');
					for(var i = lastIndex + 1; i < parseInt(doors.val()); i++){
						template.content.querySelector('.height input').name = "door-height-" + i;
						template.content.querySelector('.width input').name = "door-width-" + i;
						template.content.querySelector('.height .calc-item__label').innerHTML = "Высота двери " + i;
						template.content.querySelector('.width .calc-item__label').innerHTML = "Ширина двери " + i;
						var clone = document.importNode(template.content, true);
						document.querySelector('.calculator__body').insertBefore(clone, document.querySelector('#doors-placeholder'));
					}
				}
				else{
					console.log("no template")
				}
			}
		}
	});
	$('input[name="windows"]').focusout(function(){
		if ($(this).val() === ""){
			$(this).addClass('invalid');
		}
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