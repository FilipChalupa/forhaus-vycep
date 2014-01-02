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
    	$bottomA = $('#bottom .bottomA'),
    	$bottomB = $('#bottom .bottomB'),
    	prevBAction = '',
    	prevBText = '',
    	$contents = $('#content > .specific'),
    	$window = $(window),
    	$forhausSlides = $('#forhaus_slides'),
    	$restaurantsMenu = $('#restaurants_menu'),
    	data = {},
    	vycepRoot = 'http://vycepnastojaka.cz',
    	forhausRoot = 'http://forhaus.cz',
    	milliseconds = 0,
    	preventBubble = false,
    	$vycepRestaurants = $('#vycepRestaurants');
	
    function blockBubble(){
    	preventBubble = true;
    	setTimeout(function(){
    		preventBubble = false;
    	},100);
    }
    function scrollToEl($el) {
    	$('html, body').animate({
	        scrollTop: $el.offset().top-$top.height()-10
	    }, 800);
    }
    function toggleExpand(){
    	var $this = $(this);
    	if (!preventBubble) {
    		blockBubble();
	    	if (!$menus.hasClass('show')) {
	    		$this.toggleClass('expand');
	    		if ($this.hasClass('expand')) {
	    			if ($this.attr('id')) {
	    				scrollToEl($('#'+$this.attr('id')));
	    			}
	    		}
	    	}
    	}
    }
    function showSlideshow() {
    	milliseconds = new Date().getTime();
    	$slideshow.addClass('show');
    	prevBAction = $bottomB.first().data('action');
    	prevBText = $bottomB.first().children('span').text();
    	$bottomB.data('action','closeSlideshow');
    	$bottomB.children('span').text('Zavřít');
    	setTimeout(function(){
    		var hh = $slideshow.find('.full').first().height();
    		$slideshow.find('img').load(function() {
				var $this = $(this);
				$this.parent('.full').addClass('loaded');
    			if ($this.height() < hh) {
    				$this.css('margin-top',(hh-$this.height())/2);
    			}
			});
    	},100);
    }
    function closeSlideshow() {
    	if ($slideshow.hasClass('show')) {
    		$slideshow.removeClass('show');
    		$bottomB.data('action',prevBAction);
    		$bottomB.children('span').text(prevBText);
    	}
    }
    $vycepBeers.on('tap.widget','.item',toggleExpand);
    $vycepProducts.on('tap.widget','.item',toggleExpand);
    $vycepNews.on('tap.widget','.item',toggleExpand);
    $forhausEvents.on('tap.widget','.item',toggleExpand);
    $vycepGalleries.on('tap.widget','.item',function(){
    	if (!preventBubble) {
    		blockBubble();
	    	var newSlide;
	    	showSlideshow();
	    	slideshow.removeAllSlides();
	    	$.each(data.vycepGalleries[$(this).data('id')].photos,function(key,val){
				var newSlide = slideshow.createSlide('<div class="full"><img src="'+vycepRoot+'/media/'+val.photo_file+'?'+milliseconds+'"><div class="title">'+val.title+'</div></div>');
				newSlide.append();
	    	});
    	}
    });
    $forhausGalleries.on('tap.widget','.item',function(){
    	if (!preventBubble) {
    		blockBubble();
	    	var newSlide;
	    	showSlideshow();
	    	slideshow.removeAllSlides();
	    	$.each(data.forhausGalleries[$(this).data('id')].get_pictures,function(key,val){
				var newSlide = slideshow.createSlide('<div class="full"><img src="'+forhausRoot+'/media/'+val.photo_file+'?'+milliseconds+'"><div class="title">'+val.title+'</div></div>');
				newSlide.append();
	    	});
	    }
    });
    function onResize(){
    	$forhausSlides.css('width',$window.width());
    	$contents.css('min-height',$window.height());
    	$menus.css('height',$window.height()-2*$top.height());
    }
    $window.resize(function(){
    	onResize();
    });
    onResize();
    var forhausSlideshow = $('#forhaus_slides').swiper({
		mode:'horizontal',
		loop: false,
		centeredSlides: true,
		slidesPerView: 1,
		onSlideClick: function(){
			if (forhausSlideshow.clickedSlide == forhausSlideshow.getLastSlide()) {
				forhausSlideshow.swipeTo(0);
			} else {
				forhausSlideshow.swipeNext();
			}
		}
	});
    var slideshow = $('#slideshow').swiper({
		mode:'horizontal',
		loop: true,
		onSlideClick: function(){
			slideshow.swipeNext();
		}
	});
	$selection.on('tap.widget',function(){
		$body.addClass($(this).data('place'));
    	showSection('home');
	});
	$body.on('tap.widget','.button',function(event) {
		if (!preventBubble) {
    		blockBubble();
			var $this = $(this);
			$.each($this.data('action').split(';'),function(key,val){
				doAction(val,$this.data('param'));
			});
		}
	});
	function rnToBr(text){
		return text.replace(/\r\n/g,'<br>');
	}
	function doAction(action,param) {
		switch (action) {
			case 'showMapForhaus':
				window.open('http://maps.google.com/maps?q=Forhaus+restaurace%2C+Peka%C5%99sk%C3%A1%2C+Brno%2C+%C4%8Cesk%C3%A1+republika');
				break;
			case 'showMapVycep':
				window.open('http://maps.google.com/maps?q='+$vycepRestaurants.data('lat')+'+'+$vycepRestaurants.data('lng'));
				break;
			case 'callForhaus':
				window.open('tel:702200047');
				break;
			case 'callVycep':
				window.open('tel:702202048');
				break;
			case 'doReservation':
				showSection('reservation');
				break;
			case 'closeSlideshow':
				closeSlideshow();
				break;
			case 'menu':
				$menus.addClass('show');
				$showMenu.addClass('active');
				closeSlideshow();
				break;
			case 'hideMenu':
				$menus.removeClass('show');
				$showMenu.removeClass('active');
				break;
			case 'home':
				$body.removeClass();
				closeSlideshow();
				break;
			case 'showHome':
				showSection('home');
				break;
			case 'showHistory':
				showSection('history');
				break;
			case 'showMap':
				showSection('map');
				break;
			case 'showContact':
				showSection('contact');
				break;
			case 'showReservation':
				showSection('reservation');
				break;
			case 'vycepRestaurant':
				var $temp = $vycepRestaurants;
				$temp.find('.title1').html(data.vycepRestaurants[param].name);
				$temp.find('.text').html(data.vycepRestaurants[param].description);
				$temp.find('.contact .value').html(rnToBr(data.vycepRestaurants[param].short_contact));
				$temp.find('.opening .value').html(rnToBr(data.vycepRestaurants[param].opening_hours));
				$vycepRestaurants.data('lat',data.vycepRestaurants[param].gps_lat);
				$vycepRestaurants.data('lng',data.vycepRestaurants[param].gps_lng);
				showSection('restaurant');
				break;
			case 'vycepBeer':
				var $temp = $vycepBeers.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.vycepBeers,function(key,val){
						$temp.append('<div class="item" id="vycep_beer_'+key+'"><div class="top"><div class="name">'+val.name+'</div><div class="price">'+val.price+'</div></div><div class="text">'+val.description+'</div></div>');
					});
				}
				showSection('beer');
				break;
			case 'vycepProducts':
				var $temp = $vycepProducts.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.vycepProducts,function(key,val){
						$temp.append('<div class="item" id="vycep_products_'+key+'"><div class="top"><div class="name">'+val.name+'</div><div class="price">'+val.price+'</div></div><div class="text">'+val.description+'</div></div>');
					});
				}
				showSection('products');
				break;
			case 'vycepNews':
				var $temp = $vycepNews.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.vycepNews.reverse(),function(key,val){
						$temp.append('<div class="item" id="vycep_news_'+key+'"><div class="top"><div class="name">'+val.title+'</div><div class="date1">'+val.date+'</div><div class="date2">'+val.date_to+'</div></div><div class="text">'+val.content+'</div></div>');
					});
				}
				showSection('news');
				break;
			case 'forhausEvents':
				var $temp = $forhausEvents.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.forhausEvents.reverse(),function(key,val){
						$temp.append('<div class="item" id="forhaus_event_'+key+'"><div class="top"><div class="name">'+val.title+'</div><div class="date1">'+val.date+'</div><div class="date2">'+val.date_to+'</div></div><div class="text">'+val.content+'</div></div>');
					});
				}
				showSection('events');
				break;
			case 'vycepGalleries':
				var $temp = $vycepGalleries.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.vycepGalleries,function(key,val){
						$temp.append('<div class="item expand" data-id="'+key+'" id="vycep_gal_'+key+'"><div class="top"><div class="name">'+val.title+'</div></div><div class="text">'+val.description+'</div></div>');
					});
				}
				showSection('galleries');
				break;
			case 'forhausGalleries':
				var $temp = $forhausGalleries.find(
					'.llist');
				if ($temp.html() == "") {
					$.each(data.forhausGalleries,function(key,val){
						$temp.append('<div class="item expand" data-id="'+key+'" id="forhaus_gal_'+key+'"><div class="top"><div class="name">'+val.title+'</div></div><div class="text">'+val.description+'</div></div>');
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
				$bottomA.data('action',$this.data('actiona'));
				$bottomA.children('span').text($this.data('texta'));
				$bottomB.data('action',$this.data('actionb'));
				$bottomB.children('span').text($this.data('textb'));
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
				} else {
					localStorage.lastupdate = time;
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