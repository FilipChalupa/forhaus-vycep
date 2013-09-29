$(function () {
    var $body = $('body'),
    	$buttons = $('.button'),
    	$menus = $('#top .menu'),
    	$selection = $('#selection .place');
    $selection.click(function(){
    	$body.addClass($(this).data('place'));
    });
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