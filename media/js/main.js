$(function () {
    var $body = $('body'),
    	$buttons = $('.button'),
    	$menus = $('#top .menu'),
    	$selection = $('#selection .place'),
    	$contents = $('#content > .specific'),
    	$window = $(window);
    $selection.click(function(){
    	$body.addClass($(this).data('place'));
    });
    function onResize(){
    	$contents.css('min-height',$window.height());
    }
    $window.resize(function(){
    	onResize();
    });
    onResize();
	$buttons.on('click',function(event) {
		$.each($(this).data('action').split(';'),function(key,val){
			doAction(val);
		});
	});
	function doAction(action) {
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
	var storageNames = {
		'vycepNews': 'http://vycepnastojaka.cz/api/news/',
		'vycepBeers': 'http://vycepnastojaka.cz/api/beers/',
		'vycepProducts': 'http://vycepnastojaka.cz/api/products/',
		//'vycepGalleries': 'http://vycepnastojaka.cz/api/galleries/'
	};
	if (!localStorage.lastupdate) {
		localStorage.lastupdate = 0;
		$.each(storageNames,function(key,val){
			localStorage[key] = '[]';
		});
	}
	function updateStorage(sections) {
		var time = new Date,
			time = time.getTime(),
			thisSection = false,
			newSections = {};
		$.each(sections,function(key,val){
			if (thisSection === false) {
				thisSection = key;
			} else {
				newSections[key] = val;
			}
		});
		$.ajax({
		    url: storageNames[thisSection],
		    jsonp: "callback",
		    dataType: "jsonp",
		    data: {
		        format: "json"
		    },
		    success: function( response ) {
		    	localStorage[thisSection] = JSON.stringify(response);
				if (Object.keys(newSections).length !== 0) {
					updateStorage(newSections);
				}
		    }
		});
	}
	updateStorage(storageNames);
});