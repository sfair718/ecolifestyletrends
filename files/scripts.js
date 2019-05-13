// Fix iOS double tap issue
//(function(l){var i,s={touchend:function(){}};for(i in s)l.addEventListener(i,s);})(document); 

/* Bind TouchStart on Links */
function initLinkBindTouchStart() {
	if( $('.bind-touchstart').length > 0 ) {
		$("a.bind-touchstart").on("click touchstart", function(e) {
			var el = $(this);
			var link = el.attr("href");
			window.location = link;
		});
	}
}

/* Accordion Toggle initialization */
function accordionToggle() {
	if( $('.toggle').length > 0 ) {
		if( jQuery(".toggle .toggle-title").hasClass('active') ){
			jQuery(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
		}
		jQuery(".toggle .toggle-title").click(function(){
			if( jQuery(this).hasClass('active') ){
				jQuery(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
			}
			else{	jQuery(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
			}
		});
	}
}

/* Meal Accordion initialization */
function initMealAccordion() {
	if($('.toggle-meal-button').length > 0) {
		var $toggleBtn = $('.toggle-meal-button');
		$('.meal-plan-calendar>div:nth-child(3) .col-day .toggle-meal-button').addClass('open');
		$toggleBtn.on('click', function(){
			var $meal = $(this).parents('.col-day').siblings('.col-meal');

			$(this).toggleClass('open');
			$meal.slideToggle();
		});
	}
}

/* ProgressSteps initialization */
function initProgressSteps() {
	if($('.step-progress').length > 0) {
		var $steps = $('.progress-point li'),
		$stepBtn = $('.step-progress-btutton'),
		$line = $('.progress-line .step-line'),
		$percentage = $('.percentage'),
		dataStepVal = $('.step-container').attr('data-step');
		var dataStep, prevPage;
		// if(dataStepVal >= 5) {
		// 	dataStep = parseInt($('.step-container').attr('data-step')) - 2;
		// 	prevPage = dataStep + 1;
		// } else {
		// 	dataStep = parseInt($('.step-container').attr('data-step')) - 1;
		// 	prevPage = dataStep;
		// }
		dataStep = parseInt($('.step-container').attr('data-step')) - 1;
		prevPage = dataStep;
		var stepCount = $steps.length - 1,
		percent = 100 / parseInt(stepCount),
		percentage = percent * dataStep,
		percentageRounds = Math.ceil(percentage),
		progress = percentage + '%';

		// set active step
		$steps
			.eq(dataStep)
			.addClass('active')
			.removeClass('previous')
			.prevAll()
			.removeClass('active')
			.addClass('previous');

		$steps
			.eq(dataStep)
			.nextAll()
			.removeClass('previous');

		$steps
			.eq(dataStep)
			.nextAll()
			.removeClass('active');

		// draw line percentage
		$line.width(progress);

		// show percentage
		if(dataStep >= 1) {
			$percentage.text(percentageRounds);
		}
		
		// back button
		if(dataStep >= 1) {
			$stepBtn.addClass('show-btn');
			if(dataStep == 1) {
				$('.back-btn').attr('href', '/');
			
			} 
			// from page5: if no page 4, jump back to 3 
			// else if(dataStepVal == 5) {
			// 	$('.back-btn').attr('href', '3');
			// }
			else {
				$('.back-btn').attr('href', prevPage);
			}
		} else {
			$stepBtn.removeClass('show-btn');
			$('.back-btn').attr('href', '/');
		}

	}

	var $gender = $('.select-gender .gender'),
	activeGender = localStorage.getItem('gender');

	$gender.on('click',function(){
		localStorage.removeItem('gender');
		if($(this).hasClass('male')) {
			localStorage.setItem('gender','male');
		} else {
			localStorage.setItem('gender','female');
		}
	})

	if(activeGender == 'male') {
		$('body').addClass('male-theme');
	} else {
		$('body').addClass('female-theme');
	}

	// remove theme's class on homepage
	$('body.home-page').removeClass('male-theme');
	$('body.home-page').removeClass('female-theme');

}

/* Starting countUp function on landing page */
function checkCountUp() {

	var countBlock = $('.skills');

	if (countBlock.length > 0) {
		// var scrollTop = countBlock.offset().top - window.innerHeight;
		var scrollTop = countBlock.offset().top - 100;

		var countUp1 = [];
		var numAnim = [];

		//($('#countUp-'+x).html() % 1 != 0) ? 1 : 0
		var x = 1;
		if($('#countUp-'+x).length > 0) {
			window['countUp1'+x] = $('#countUp-'+x);
			window['countUp1Top'+x] = window['countUp1'+x].offset().top - window.innerHeight - 100;

			if (!window['countUp1'+x].data('done'+x) && $(window).scrollTop() > window['countUp1Top'+x]) {
				window['countUp1'+x].parents('.item').find('.chart').addClass('animate-chart');
				window['numAnim'+x] = new CountUp('countUp-'+x, 1, $('#countUp-'+x).html(),1);
					window['numAnim'+x].start();
				window['countUp1'+x].data('done'+x, 1);
			}
			}

		for(x=2;x<=11;x++){
			if($('#countUp-'+x).length > 0) {
				window['countUp1'+x] = $('#countUp-'+x);
				window['countUp1Top'+x] = window['countUp1'+x].offset().top - window.innerHeight - 100;

				if (!window['countUp1'+x].data('done'+x) && $(window).scrollTop() > window['countUp1Top'+x]) {
					window['countUp1'+x].parents('.item').find('.chart').addClass('animate-chart');
					window['numAnim'+x] = new CountUp('countUp-'+x, 1, $('#countUp-'+x).html(),($('#countUp-'+x).html() % 1 != 0) ? 1 : 0);
						window['numAnim'+x].start();
					window['countUp1'+x].data('done'+x, 1);
				}
			}
		}   	
	}
}

/* Animated progress bar */
function initProgressBar() {

	var block = $('.progressItems');

	if (block.lenght > 0) {
		var scrollTop = block.offset().top - window.innerHeight;

		if (!block.data('counted') && $(window).scrollTop() > scrollTop) {
			/* Initialized once */
			$('.progressBar').each(function(i, el) {
				progressBar(parseInt($(el).find('.value').html(), 10), $(el));
			});
			block.data('counted', 1);
		}  
	}
}

function progressBar(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
	$element.find('.bar div').animate({ width: progressBarWidth }, 1000);
}

function initNumeric() {
	if($('.numeric').lenght > 0) {
		$(".numeric").numeric();
	}
}

$(function() {
	initProgressSteps();
	initMealAccordion();
	accordionToggle();
	initNumeric();
	initLinkBindTouchStart();
});