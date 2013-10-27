$(function () {
    var $body = $('body'),
    	$menus = $('#top .menu'),
    	$showMenu = $('#top .showMenu'),
    	$selection = $('#selection .place'),
    	$sectionsForhaus = $('#content .forhaus .section'),
    	$sectionsVycep = $('#content .vycep .section'),
    	$vycepBeers = $('#vycepBeers'),
    	$vycepNews = $('#vycepNews'),
    	$vycepProducts = $('#vycepProducts'),
    	$contents = $('#content > .specific'),
    	$window = $(window),
    	$restaurantsMenu = $('#restaurants_menu'),
    	data = {};
    $vycepBeers.on('click','.item',function(){
    	$(this).toggleClass('expand');
    });
    $vycepProducts.on('click','.item',function(){
    	$(this).toggleClass('expand');
    });
    $vycepNews.on('click','.item',function(){
    	$(this).toggleClass('expand');
    });
    $selection.click(function(){
    	$body.addClass($(this).data('place'));
    	showSection('home');
    });
    function onResize(){
    	$contents.css('min-height',$window.height());
    }
    $window.resize(function(){
    	onResize();
    });
    onResize();
	$body.on('click','.button',function(event) {
		var $this = $(this);
		$.each($this.data('action').split(';'),function(key,val){
			doAction(val,$this.data('param'));
		});
	});
	function doAction(action,param) {
		switch (action) {
			case 'menu':
				$menus.addClass('show');
				$showMenu.addClass('active');
				break;
			case 'hideMenu':
				$menus.removeClass('show');
				$showMenu.removeClass('active');
				break;
			case 'home':
				$body.removeClass();
				$body.removeClass();
				break;
			case 'showHome':
				showSection('home');
				break;
			case 'vycepRestaurant':
				var $temp = $('#vycepRestaurants');
				$temp.find('.title1').text(data.vycepRestaurants[param].name);
				$temp.find('.text').text(data.vycepRestaurants[param].description);
				$temp.find('.contact .value').text(data.vycepRestaurants[param].short_contact);
				$temp.find('.opening .value').text(data.vycepRestaurants[param].opening_hours);
				showSection('restaurant');
				break;
			case 'vycepBeer':
				var $temp = $vycepBeers.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.vycepBeers,function(key,val){
						$temp.append('<div class="item"><div class="top"><div class="name">'+val.name+'</div><div class="price">'+val.price+'</div></div><div class="text">'+val.description+'</div></div>');
					});
				}
				showSection('beer');
				break;
			case 'vycepProducts':
				var $temp = $vycepProducts.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.vycepProducts,function(key,val){
						$temp.append('<div class="item"><div class="top"><div class="name">'+val.name+'</div><div class="price">'+val.price+'</div></div><div class="text">'+val.description+'</div></div>');
					});
				}
				showSection('products');
				break;
			case 'vycepNews':
				var $temp = $vycepNews.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.vycepNews.reverse(),function(key,val){
						$temp.append('<div class="item"><div class="top"><div class="name">'+val.title+'</div><div class="date1">'+val.date+'</div><div class="date2">'+val.date_to+'</div></div><div class="text">'+val.content+'</div></div>');
					});
				}
				showSection('news');
				break;
			case 'vycepGalleries':
				showSection('galleries');
				break;
		}
	}
	function showSection(name) {
		var $sections;
		if ($body.hasClass('forhaus')) {
			$sections = $sectionsForhaus;
		} else {
			$sections = $sectionsVycep;
		}
		$sections.removeClass('show');
		$sections.each(function(){
			var $this = $(this);
			if ($this.data('name') == name) {
				$this.addClass('show');
			}
		});
	}
	var storageNames = {
		'vycepNews': 'http://vycepnastojaka.cz/api/news/',
		'vycepBeers': 'http://vycepnastojaka.cz/api/beers/',
		'vycepProducts': 'http://vycepnastojaka.cz/api/products/',
		'vycepGalleries': 'http://vycepnastojaka.cz/api/galleries/',
		'vycepRestaurants': 'http://vycepnastojaka.cz/api/restaurants/',
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
	$.each(storageNames,function(key,val){
		data[key] = JSON.parse(localStorage[key]);
	});
	$.each(data.vycepRestaurants,function(key,val){
		$restaurantsMenu.append('<div class="button" data-action="vycepRestaurant;hideMenu" data-param="'+key+'">'+val.name+'</div>');
	});
});