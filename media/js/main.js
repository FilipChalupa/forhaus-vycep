$(function () {
    var $body = $('body'),
    	$buttons = $('.button'),
    	$menus = $('#top .menu'),
    	$selection = $('#selection .place');
    $selection.click(function(){
    	$body.addClass($(this).data('place'));
    });
	$buttons.on('click',function(event) {
		var $this = $(this);
		doAction($this.data('action'));
		doAction($this.data('secondary'));
	});
	function doAction(action,action2) {
		switch (action) {
			case 'menu':
				$menus.toggleClass('show');
				break;
			case 'hideMenu':
				$menus.removeClass('show');
				break;
			case 'home':
				$body.removeClass('forhaus')
					.removeClass('vycep');
				break;
		}
	}
});