$(function () {
    var $buttons = $('.button'),
    	$menus = $('#top .menu');
	$buttons.on('click',function(event) {
		doAction($(this).data('action'));
	});
	function doAction(action) {
		switch (action) {
			case 'menu':
				$menus.addClass('show');
				break;
			default:
				alert(action);
		}
	}
});