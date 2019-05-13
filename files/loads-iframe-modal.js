$(function(){

	var	$el = $('.load-iframe');
	if( $el.length > 0 ) {
		$el.on('click', function(e){
			e.preventDefault();
			var this_el = $(this),
				name = this_el.data('name'),
				modal = $('#loadIframeModal'),
				source = this_el.attr('href'),
				iWrap = modal.find('.scroll-wrapper'),
				iframe = modal.find('iframe');

			if(name == 'cookie') {
				iWrap.addClass('iframe-cookie');
			} else {
				iWrap.removeClass('iframe-cookie');
			}

			modal.modal('show');
			iframe.attr('src', '');
			
			modal.on('shown.bs.modal',function(){
				iframe.attr('src', source);
			})
		});
	}

});