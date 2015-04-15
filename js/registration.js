$(document).ready(function() {
	$.fn.exists = function(){return this.length>0;}
	if (window.PIE) {
		$('.ie-fix').each(function() {
			PIE.attach(this);
		});
	}
	
	$(document).on('click', '#enter', function(){
		$('#my-content').addClass('animated shake');
		setTimeout(function(){
			$('#my-content').removeClass('animated shake');
		},1000);
		return false;		
	});
	
	$(document).on('click', '.social a', function(){
		if( $(window).width() < 768){
			$('#authorization_window .col-2').show();
			$('#authorization_window .col-1').hide();
			$('.lisence').hide();
			$('.submit-wrapp').hide();
			$('.tabs .social').addClass('active-tab');
			$('.tabs .standart').removeClass('active-tab');
		}
		return false;	
	});
	
	$(document).on('click', '.standart a', function(){
	if ($(window).width() < 768){
		$('#authorization_window .col-1').show();
		$('#authorization_window .col-2').hide();
		$('.lisence').show();
		$('.submit-wrapp').show();
		$('.tabs .social').removeClass('active-tab');
		$('.tabs .standart').addClass('active-tab');
	}
		return false;	
	});
	

	//Подтверждение c почты
	$(document).on('click', '#authorization_window #enter', function(){
		$('#my-content').fadeOut();
		$('#confirm_registration').fadeIn();
		$('#confirm_registration').css('display','table');
		setTimeout(function(){
				$('#kod').focus();
			},300);	
		
	});
	
	
	if ($('#authorization_window .col-2').is(':visible')){
		$('.tabs .social').addClass('active-tab');
		$('.tabs .standart').removeClass('active-tab');
	}
	if ($('#authorization_window .col-1').is(':visible')){
		$('.tabs .social').removeClass('active-tab');
		$('.tabs .standart').addClass('active-tab');
	}
	
	$(window).resize(function() {
		if ($(window).width() > 768){
			$('#authorization_window .col-1').show();
			$('#authorization_window .col-2').show();
			$('.lisence').show();
			$('.submit-wrapp').show();
		}
		if ($('#authorization_window .col-2').is(':visible')){
			$('.tabs .social').addClass('active-tab');
			$('.tabs .standart').removeClass('active-tab');
		}
		if ($('#authorization_window .col-1').is(':visible')){
			$('.tabs .social').removeClass('active-tab');
			$('.tabs .standart').addClass('active-tab');
		}
	});
	
});


