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
					valid = false;
					$(this).addClass('invalid');
				}
			}
			values[this.name] = $(this).val();
		});
		var doors = $('input[name="doors"]').val();
		if (doors === ""){doors = 0};
		var windows = $('input[name="windows"]').val();
		if (windows === ""){windows = 0};
		if (!valid){
			result = "Заполните все обязательные поля формы"
		}
		else{
			// Total room area
			var area = (parseFloat(values.length) + parseFloat(values.width)) * 2 * values.height;
			// Single roll area
			var rollArea = values.rollwidth * values.rolllength;
			// Get doors and windows area
			var doorsArea = 0;
			var windowsArea = 0;
			$('[name^="door-height"]').each(function(){
				var doorHeight = $(this).val();
				var doorWidth = $(this).parent().next().children('[name^="door-width"]').val();
				doorsArea += doorHeight * doorWidth;
			});
			$('[name^="window-height"]').each(function(){
				var windowHeight = $(this).val();
				var windowWidth = $(this).parent().next().children('[name^="window-width"]').val();
				windowsArea += windowHeight * windowWidth;
			});
			// Area without windows and doors
			area -= (doorsArea + windowsArea);
			if (area <= 0){
				result = "Площадь дверей и окон больше площади стен, введите корректные размеры"
			}
			else{
				result = Math.ceil(area / rollArea);
				result = result + " " + plural(result, "рулон", "рулона", "рулонов");
			}
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
			console.log("doors.val() ", doors.val());
			console.log($("[name^='door-height-']").length);
			if(parseInt(doors.val()) < $("[name^='door-height-']").length){
				for(var i=$("[name^='door-height-']").length - 1; i >= parseInt(doors.val()); i--){
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
					for(var i = lastIndex + 1; i <= parseInt(doors.val()); i++){
						template.content.querySelector('.height input').name = "door-height-" + i;
						template.content.querySelector('.width input').name = "door-width-" + i;
						template.content.querySelector('.height .calc-item__label').innerHTML = "Высота двери " + i;
						template.content.querySelector('.width .calc-item__label').innerHTML = "Ширина двери " + i;
						var clone = document.importNode(template.content, true);
						document.querySelector('.calculator__body').insertBefore(clone, document.querySelector('#doors-placeholder'));
					}
				}
				else{
					for(var i = lastIndex + 1; i <= parseInt(doors.val()); i++){
						var element = 	'<div class="calc-item calc-item--white height">'
							+ '<div class="calc-item__label">Высота двери '+ i +'</div>'
							+ '<input class="calc-item__textbox calc-item__textbox--white calc-item__textbox--numbers" size="1" name="door-height-'+i+'">'
							+ '</div>'
							+ '<div class="calc-item calc-item--white width">'
							+ '<div class="calc-item__label">Ширина двери '+ i +'</div>'
							+ '<input class="calc-item__textbox calc-item__textbox--white calc-item__textbox--numbers" size="1" name="door-width-'+i+'">'
							+ '</div>';
						$('#doors-placeholder').before(element);
					}
				}
			}
		}
	});

	// Add/remove fields for windows and doors
	$('input[name="windows"]').focusout(function(){
		var windows = $(this);
		if (windows.val() === ""){
			windows.addClass('invalid');
		}
		else{
			windows.removeClass('invalid');
			// remove elements
			if(parseInt(windows.val()) < $("[name^='window-height-']").length){
				for(var i=$("[name^='window-height-']").length - 1; i >= parseInt(windows.val()); i--){
					var parent = $("[name^='window-height-']").eq(i).parent();
					parent.next().remove();
					parent.remove();
				}
			}
			// add elements
			else if (parseInt(windows.val()) > $("[name^='window-height-']").length) {
				var lastIndex = $("[name^='window-height-']").length;
				// Check template support and choose method
				if("content" in document.createElement('template')){
					var template = document.querySelector('#window');
					for(var i = lastIndex + 1; i <= parseInt(windows.val()); i++){
						template.content.querySelector('.height input').name = "window-height-" + i;
						template.content.querySelector('.width input').name = "window-width-" + i;
						template.content.querySelector('.height .calc-item__label').innerHTML = "Высота окна " + i;
						template.content.querySelector('.width .calc-item__label').innerHTML = "Ширина окна " + i;
						var clone = document.importNode(template.content, true);
						document.querySelector('.calculator__body').insertBefore(clone, document.querySelector('#windows-placeholder'));
					}
				}
				else{
					for(var i = lastIndex + 1; i <= parseInt(windows.val()); i++){
						var element = 	'<div class="calc-item calc-item--white height">'
							+ '<div class="calc-item__label">Высота окна '+ i +'</div>'
							+ '<input class="calc-item__textbox calc-item__textbox--white calc-item__textbox--numbers" size="1" name="window-height-'+i+'">'
							+ '</div>'
							+ '<div class="calc-item calc-item--white width">'
							+ '<div class="calc-item__label">Ширина окна '+ i +'</div>'
							+ '<input class="calc-item__textbox calc-item__textbox--white calc-item__textbox--numbers" size="1" name="window-width-'+i+'">'
							+ '</div>';
						$('#windows-placeholder').before(element);
					}
				}
			}
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