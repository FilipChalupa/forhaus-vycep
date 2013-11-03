$(function () {
    var $body = $('body'),
    	$top = $('#top'),
    	$menus = $('#top .menu'),
    	$showMenu = $('#top .showMenu'),
    	$selection = $('#selection .place'),
    	$sectionsForhaus = $('#content .forhaus .section'),
    	$sectionsVycep = $('#content .vycep .section'),
    	$vycepBeers = $('#vycepBeers'),
    	$vycepNews = $('#vycepNews'),
    	$vycepProducts = $('#vycepProducts'),
    	$vycepGalleries = $('#vycepGalleries'),
    	$forhausGalleries = $('#forhausGalleries'),
    	$forhausEvents = $('#forhausEvents'),
    	$slideshow = $('#slideshow'),
    	$contents = $('#content > .specific'),
    	$window = $(window),
    	$restaurantsMenu = $('#restaurants_menu'),
    	data = {},
    	vycepRoot = 'http://vycepnastojaka.cz',
    	forhausRoot = 'http://forhaus.cz';
    function toggleExpand(){
    	$(this).toggleClass('expand');
    }
    $vycepBeers.on('click','.item',toggleExpand);
    $vycepProducts.on('click','.item',toggleExpand);
    $vycepNews.on('click','.item',toggleExpand);
    $forhausEvents.on('click','.item',toggleExpand);
    $vycepGalleries.on('click','.item',function(){
    	var newSlide;
    	$slideshow.addClass('show');
    	slideshow.removeAllSlides();
    	$.each(data.vycepGalleries[$(this).data('id')].photos,function(key,val){
			var newSlide = slideshow.createSlide('<div class="full" style="background-image: url('+vycepRoot+'/media/'+val.photo_file+');"><div class="title">'+val.title+'</div></div>');
			newSlide.append();
    	});
    });
    $forhausGalleries.on('click','.item',function(){
    	var newSlide;
    	$slideshow.addClass('show');
    	slideshow.removeAllSlides();
    	$.each(data.forhausGalleries[$(this).data('id')].get_pictures,function(key,val){
			var newSlide = slideshow.createSlide('<div class="full" style="background-image: url('+forhausRoot+'/media/'+val.photo_file+');"><div class="title">'+val.title+'</div></div>');
			newSlide.append();
    	});
    });
    var slideshow = $('#slideshow').swiper({
		mode:'horizontal',
		loop: true
	});
    $selection.click(function(){
    	$body.addClass($(this).data('place'));
    	showSection('home');
    });
    function onResize(){
    	$contents.css('min-height',$window.height());
    	$menus.css('height',$window.height()-2*$top.height());
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
			case 'closeSlideshow':
				$slideshow.removeClass('show');
				break;
			case 'menu':
				$menus.addClass('show');
				$showMenu.addClass('active');
				$slideshow.removeClass('show');
				break;
			case 'hideMenu':
				$menus.removeClass('show');
				$showMenu.removeClass('active');
				break;
			case 'home':
				$body.removeClass();
				$slideshow.removeClass('show');
				break;
			case 'showHome':
				showSection('home');
				break;
			case 'showHistory':
				showSection('history');
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
			case 'forhausEvents':
				var $temp = $forhausEvents.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.forhausEvents.reverse(),function(key,val){
						$temp.append('<div class="item"><div class="top"><div class="name">'+val.title+'</div><div class="date1">'+val.date+'</div><div class="date2">'+val.date_to+'</div></div><div class="text">'+val.content+'</div></div>');
					});
				}
				showSection('events');
				break;
			case 'vycepGalleries':
				var $temp = $vycepGalleries.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.vycepGalleries,function(key,val){
						$temp.append('<div class="item expand" data-id="'+key+'"><div class="top"><div class="name">'+val.title+'</div></div><div class="text">'+val.description+'</div></div>');
					});
				}
				showSection('galleries');
				break;
			case 'forhausGalleries':
				var $temp = $forhausGalleries.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.forhausGalleries,function(key,val){
						$temp.append('<div class="item expand" data-id="'+key+'"><div class="top"><div class="name">'+val.title+'</div></div><div class="text">'+val.description+'</div></div>');
					});
				}
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
	var lang = 'cs';
	var storageNames = {
		'vycepNews': 'http://vycepnastojaka.cz/'+lang+'/api/news/',
		'vycepBeers': 'http://vycepnastojaka.cz/'+lang+'/api/beers/',
		'vycepProducts': 'http://vycepnastojaka.cz/'+lang+'/api/products/',
		'vycepGalleries': 'http://vycepnastojaka.cz/'+lang+'/api/galleries/',
		'vycepRestaurants': 'http://vycepnastojaka.cz/'+lang+'/api/restaurants/',
		'forhausGalleries': 'http://forhaus.cz/'+lang+'/api/galleries/',
		'forhausEvents': 'http://forhaus.cz/'+lang+'/api/event/'
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