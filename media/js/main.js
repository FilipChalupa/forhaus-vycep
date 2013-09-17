$(function () {
    var $menuItems = $('#menu a, #goToContactForm'),
        $sections = $('.section'),
        $photos = $('.photos a'),
		$lefts = $('.section > .wrapper .left'),
		$switchs = $('.switch'),
		$productsDescription = $('#products .right .description'),
        hash = window.location.hash,
        mapEl = document.getElementById('map-canvas'),
		sectionHeight = 0;
	$('#protector').val('protected');
	var map,
		myLatlng = new google.maps.LatLng(49.31525, 15.39320);
	function initialize() {
	  var mapOptions = {
		zoom: 14,
		center: myLatlng,
		mapTypeControlOptions: {
		  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		},
		scrollwheel: false
	  };
	  var map = new google.maps.Map(mapEl, mapOptions);
	  var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Plastykoword',
	    	icon: './media/images/marker.png'
		});
	}
	$switchs.find('.left li').click(function(){
		var $this = $(this);
		var $descriptions = $this.closest('.wrapper').find('.right .description'),
			id = $this.data('id');
		$this.siblings('li').removeClass('selected');
		$this.addClass('selected');
		$descriptions.each(function(){
			var $this = $(this);
			if ($this.data('id') === id) {
				$this.addClass('selected');
			} else {
				$this.removeClass('selected');
			}
		});
	});
    function showSection(hashLink) {
        var match = false;
        $menuItems.each(function () {
            var $this = $(this);
            if ($this.attr('href') === hashLink) {
				match = true;
				$this.addClass('selected');
				$($this.attr('href').replace('-', '_')).addClass('selected');
			} else {
				$this.removeClass('selected');
				$($this.attr('href').replace('-', '_')).removeClass('selected');
			}
			if (hashLink === '#section-1') {
				setTimeout(function(){
					initialize();
				},10);
			}
		});
		if (match === false) {
			showSection('#section-1');
		}
	}
    $menuItems.click(function (e) {
		if (e.which === 1) {
			var $this = $(this);
			showSection($this.attr('href'));
		}
    });
	$sections.each(function () {
		var height = $(this).height();
		if (height > sectionHeight) {
			sectionHeight = height;
		}
	});
	$sections.css('min-height', sectionHeight);
	$lefts.each(function () {
		var $left = $(this);
		var $right = $left.siblings('.right');
		if ($left.height() > $right.height()) {
			$right.css('min-height', $left.height());
		} else {
			$left.css('min-height', $right.height());
		}
	});
	$photos.each(function(){
		var $this = $(this);
		var $photo = $this.children('img');
		$this.css('background-image','url('+$photo.attr('src')+')');
	});
	$(window).on('hashchange', function() {
    	showSection(window.location.hash);
	});
    showSection(hash);
});