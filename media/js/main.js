$(function () {
    var $buttons = $('.button');
	$buttons.on('mousedown',function(event) {
		$(this).addClass('pressed');
	});
	$buttons.on('mouseout',function(event) {
		$(this).removeClass('pressed');
	});
	$buttons.on('mouseup',function(event) {
		var $this = $(this);
		if ($this.hasClass('pressed')) {
			doAction($this.data('action'));
			$this.removeClass('pressed');
		}
	});
	function doAction(action) {
		switch (action) {
			default:
				alert(action);
		}
	}
});