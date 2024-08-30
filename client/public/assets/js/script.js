(function($) {
	
	"use strict";
	$(function() {  
		$('.btn-1')
		.on('mouseenter', function(e) {
				var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
				$(this).find('span').css({top:relY, left:relX})
		})
		.on('mouseout', function(e) {
				var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		});
	});
	

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.loader-wrap').length){
			$('.loader-wrap').delay(1000).fadeOut(500);
		}
	}

	if ($(".preloader-close").length) {
        $(".preloader-close").on("click", function(){
            $('.loader-wrap').delay(200).fadeOut(500);
        })
    }

	if ($('.side-navigation').length) {
        $('.side-nav-opener, .side-nav').on('click', function() {
            $('.side-navigation').toggleClass('open');
            $('.side-nav').toggleClass('hiddenbtn');
            return false;
        });
    };
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-top');
			if (windowpos >= 110) {
				siteHeader.addClass('fixed-header');
				scrollLink.addClass('open');
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.removeClass('open');
			}
		}
	}
	
	headerStyle();


	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
		
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .menu-area .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('.megamenu').slideToggle(900);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split('/').reverse()[0];

        selector.find('li').each(function () {
            let anchor = $(this).find('a');
            if ($(anchor).attr('href') == FileName) {
                $(this).addClass('current');
            }
        });
        // if any li has .current elmnt add class
        selector.children('li').each(function () {
            if ($(this).find('.current').length) {
                $(this).addClass('current');
            }
        });
        // if no file name return 
        if ('' == FileName) {
            selector.find('li').eq(0).addClass('current');
        }
    }

    // dynamic current class        
    let mainNavUL = $('.main-menu').find('.navigation');
    dynamicCurrentMenuClass(mainNavUL);
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1000);
	
		});
	}

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW({
		mobile:       false
		});
		wow.init();
	}

	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}

	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}


	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}



	// Date picker
	function datepicker () {
	    if ($('#datepicker').length) {
	        $('#datepicker').datepicker();
	    };
	}
	// Time picker
	function timepicker () {
	    if ($('input[name="time"]').length) {
	        $('input[name="time"]').ptTimeSelect();
	    }
	}
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(100);
				$(target).addClass('active-tab');
			}
		});
	}

	//Timer Countdown
    if($('.timer').length){
		$(function(){
			 $('[data-countdown]').each(function() {
			var $this = $(this), finalDate = $(this).data('countdown');
			$this.countdown(finalDate, function(event) {
			  $this.html(event.strftime('%D days %H:%M:%S'));
			});
		  });
		 });
 
		$('.cs-countdown').countdown('').on('update.countdown', function(event) {
		   var $this = $(this).html(event.strftime('<div class="count-col"><span>%D</span><p>Days</p></div> <div class="count-col"><span>%H</span><p>Hours</p></div> <div class="count-col"><span>%M</span><p>Minutes</p></div> <div class="count-col"><span>%S</span><p>Seconds</p></div>'));
		 });
	 }
 
	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}


	// banner-carousel
	if ($('.banner-carousel').length) {
        $('.banner-carousel').owlCarousel({
            loop:true,
			margin:0,
			nav:true,
			dotData:true,
			dotsData:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },
                1024:{
                    items:1
                }
            }
        });
    }
	// service-four-carousel
	if ($('.service-four-carousel').length) {
        $('.service-four-carousel').owlCarousel({
            loop:true,
			margin:24,
			nav:true,
			center:true,
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2,
					center:false
                },
                800:{
                    items:2,
					center:false
                },
                1024:{
                    items:3
                }
            }
        });
    }
	// testimonial-carousel-two
	if ($('.testimonial-carousel-two').length) {
        $('.testimonial-carousel-two').owlCarousel({
            loop:true,
			margin:0,
			nav:true,
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },
                1024:{
                    items:1
                }
            }
        });
    }
	// propertiest-carousel
	if ($('.propertiest-carousel').length) {
        $('.propertiest-carousel').owlCarousel({
            loop:true,
			margin:24,
			nav:true,
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                790:{
                    items:2
                },
                1200:{
                    items:3
                }
            }
        });
    }
	
	// find-places
	if ($('.find-places').length) {
        $('.find-places').owlCarousel({
            loop:true,
			margin:0,
			nav:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:2
                },
                1024:{
                    items:3
                },
                1200:{
                    items:4
                }
            }
        });
    }

	// cities-carousel
	if ($('.cities-carousel').length) {
        $('.cities-carousel').owlCarousel({
            loop:true,
			margin:20,
			nav:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                900:{
                    items:2
                },
                992:{
                    items:2
                },
                1200:{
                    items:3
                },
				1500:{
					items:4
				}
            }
        });
    }

	// service-carousel
	if ($('.service-carousel').length) {
        $('.service-carousel').owlCarousel({
            loop:true,
			margin:20,
			nav:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			dotData:true,
			dotsData:true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },
                1024:{
                    items:1
                }
            }
        });
    }

	// news-carousel
	if ($('.news-carousel').length) {
        $('.news-carousel').owlCarousel({
            loop:true,
			margin:10,
			nav:true,
			autoplay: 6000,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                767:{
                    items:2
                },
                900:{
                    items:2
                },
                1200:{
                    items:3
                }
            }
        });
    }
	// testimonial-carousel
	if ($('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            loop:true,
			margin:20,
			nav:true,
			center:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			autoplay: 6000,
			smartSpeed: 1000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:2,
					center:false
                },
                1024:{
                    items:3
                }
            }
        });
    }
	// team-carousel
	if ($('.team-carousel').length) {
        $('.team-carousel').owlCarousel({
            loop:true,
			margin:10,
			nav:true,
			center:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			autoplay: 6000,
			smartSpeed: 1000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:2
                },
                1024:{
                    items:3
                }
            }
        });
    }
	// team-carousel-two
	if ($('.team-carousel-two').length) {
        $('.team-carousel-two').owlCarousel({
            loop:true,
			margin:10,
			nav:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			autoplay: 6000,
			smartSpeed: 1000,
            navText: [ '<span class="icon-icon-48"></span>', '<span class="icon-icon-49"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                700:{
                    items:2
                },
                900:{
                    items:3
                },
                1024:{
                    items:3
                }
            }
        });
    }


	$(document).ready(function() {

		$('a.btn-gallery').on('click', function(event) {
			event.preventDefault();
			
			var gallery = $(this).attr('href');
		
			$(gallery).magnificPopup({
		  delegate: 'a',
				type:'image',
				gallery: {
					enabled: true
				}
			}).magnificPopup('open');
		});
		
	});
	
	// banner-scripe-one
	$(document).ready(function() {

		var sync1 = $("#sync1");
		var sync2 = $("#sync2");
		var sync3 = $("#sync3");
		var slidesPerPage = 3; //globaly define number of elements per page
		var syncedSecondary = true;
	
		sync1.owlCarousel({
			items: 1,
			nav: false,
			autoplay: 6000, 
			loop: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			active: true,
			smartSpeed: 1000,
			responsiveRefreshRate: 200,
			navText: [ '<span class="icon-6"></span>', '<span class="icon-7"></span>' ],
		}).on('changed.owl.carousel', syncPosition);
	
		sync2
			.on('initialized.owl.carousel', function() {
				sync2.find(".owl-item").eq(0).addClass("current");
			})
			.owlCarousel({
				items: slidesPerPage,
				nav: false,
				smartSpeed: 200,
				slideSpeed: 500,
				slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
				responsiveRefreshRate: 100
			}).on('changed.owl.carousel', syncPosition2);
	
		function syncPosition(el) {
			//if you set loop to false, you have to restore this next line
			//var current = el.item.index;
	
			//if you disable loop you have to comment this block
			var count = el.item.count - 1;
			var current = Math.round(el.item.index - (el.item.count / 2) - .5);
	
			if (current < 0) {
				current = count;
			}
			if (current > count) {
				current = 0;
			}
	
			//end block
	
			sync2
				.find(".owl-item")
				.removeClass("current")
				.eq(current)
				.addClass("current");
			var onscreen = sync2.find('.owl-item.active').length - 1;
			var start = sync2.find('.owl-item.active').first().index();
			var end = sync2.find('.owl-item.active').last().index();
	
			if (current > end) {
				sync2.data('owl.carousel').to(current, 100, true);
			}
			if (current < start) {
				sync2.data('owl.carousel').to(current - onscreen, 100, true);
			}
		}
	
		function syncPosition2(el) {
			if (syncedSecondary) {
				var number = el.item.index;
				sync1.data('owl.carousel').to(number, 100, true);
			}
		}
	
		sync2.on("click", ".owl-item", function(e) {
			e.preventDefault();
			var number = $(this).index();
			sync1.data('owl.carousel').to(number, 300, true);
		});
	});

	// banner-scripe-one
	$(document).ready(function() {

		var sync4 = $("#sync4");
		var sync3 = $("#sync3");
		var slidesPerPage = 3; //globaly define number of elements per page
		var syncedSecondary = true;

		sync4.owlCarousel({
			items: 1,
			nav: false,
			autoplay: 6000, 
			loop: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			active: true,
			smartSpeed: 1000,
			responsiveRefreshRate: 200,
			navText: [ '<span class="icon-6"></span>', '<span class="icon-7"></span>' ],
		}).on('changed.owl.carousel', syncPosition);

		sync3
			.on('initialized.owl.carousel', function() {
				sync3.find(".owl-item").eq(0).addClass("current");
			})
			.owlCarousel({
				items: slidesPerPage,
				nav: false,
				smartSpeed: 200,
				slideSpeed: 500,
				slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
				responsiveRefreshRate: 100
			}).on('changed.owl.carousel', syncPosition3);

		function syncPosition(el) {
			//if you set loop to false, you have to restore this next line
			//var current = el.item.index;

			//if you disable loop you have to comment this block
			var count = el.item.count - 1;
			var current = Math.round(el.item.index - (el.item.count / 2) - .5);

			if (current < 0) {
				current = count;
			}
			if (current > count) {
				current = 0;
			}

			//end block

			sync3
				.find(".owl-item")
				.removeClass("current")
				.eq(current)
				.addClass("current");
			var onscreen = sync3.find('.owl-item.active').length - 1;
			var start = sync3.find('.owl-item.active').first().index();
			var end = sync3.find('.owl-item.active').last().index();

			if (current > end) {
				sync3.data('owl.carousel').to(current, 100, true);
			}
			if (current < start) {
				sync3.data('owl.carousel').to(current - onscreen, 100, true);
			}
		}

		function syncPosition3(el) {
			if (syncedSecondary) {
				var number = el.item.index;
				sync4.data('owl.carousel').to(number, 100, true);
			}
		}

		sync3.on("click", ".owl-item", function(e) {
			e.preventDefault();
			var number = $(this).index();
			sync4.data('owl.carousel').to(number, 300, true);
		});
	});

	// banner-scripe-one
	$(document).ready(function() {

		var sync5 = $("#sync5");
		var sync6 = $("#sync6");
		var slidesPerPage = 3; //globaly define number of elements per page
		var syncedSecondary = true;

		sync5.owlCarousel({
			items: 1,
			nav: false,
			autoplay: 6000, 
			loop: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			active: true,
			smartSpeed: 1000,
			responsiveRefreshRate: 200,
			navText: [ '<span class="icon-6"></span>', '<span class="icon-7"></span>' ],
		}).on('changed.owl.carousel', syncPosition);

		sync6
			.on('initialized.owl.carousel', function() {
				sync6.find(".owl-item").eq(0).addClass("current");
			})
			.owlCarousel({
				items: slidesPerPage,
				nav: false,
				smartSpeed: 200,
				slideSpeed: 500,
				slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
				responsiveRefreshRate: 100
			}).on('changed.owl.carousel', syncPosition4);

		function syncPosition(el) {
			//if you set loop to false, you have to restore this next line
			//var current = el.item.index;

			//if you disable loop you have to comment this block
			var count = el.item.count - 1;
			var current = Math.round(el.item.index - (el.item.count / 2) - .5);

			if (current < 0) {
				current = count;
			}
			if (current > count) {
				current = 0;
			}

			//end block

			sync6
				.find(".owl-item")
				.removeClass("current")
				.eq(current)
				.addClass("current");
			var onscreen = sync6.find('.owl-item.active').length - 1;
			var start = sync6.find('.owl-item.active').first().index();
			var end = sync6.find('.owl-item.active').last().index();

			if (current > end) {
				sync6.data('owl.carousel').to(current, 100, true);
			}
			if (current < start) {
				sync6.data('owl.carousel').to(current - onscreen, 100, true);
			}
		}

		function syncPosition4(el) {
			if (syncedSecondary) {
				var number = el.item.index;
				sync5.data('owl.carousel').to(number, 100, true);
			}
		}

		sync6.on("click", ".owl-item", function(e) {
			e.preventDefault();
			var number = $(this).index();
			sync5.data('owl.carousel').to(number, 300, true);
		});
	});


	//Swiper Slider Start
	var swiper = new Swiper('.swiper-container-4', {
        direction: 'vertical',
        slidesPerView: 2,
        spaceBetween: 0,
        mousewheel: true,
      	grabCursor: true,
		navigation: {
		nextEl: '.next',
		prevEl: '.prev',
		},
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
		breakpoints: {
			0: {
			  slidesPerView: 1,
			  spaceBetween: 10,
			},
			420: {
			  slidesPerView: 2,
			  spaceBetween: 20,
			}
		},
    });
	
	//Swiper Slider End

	//Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-2').length){
		var scene = $('.parallax-scene-2').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-3').length){
		var scene = $('.parallax-scene-3').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-4').length){
		var scene = $('.parallax-scene-4').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-5').length){
		var scene = $('.parallax-scene-5').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-6').length){
		var scene = $('.parallax-scene-6').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-7').length){
		var scene = $('.parallax-scene-7').get(0);
		var parallaxInstance = new Parallax(scene);
	}

	//Product Tabs
	if($('.project-tab').length){
		$('.project-tab .project-tab-btns .p-tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).hasClass('actve-tab')){
				return false;
			}else{
				$('.project-tab .project-tab-btns .p-tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				$('.project-tab .p-tabs-content .p-tab').removeClass('active-tab');
				$(target).addClass('active-tab');
			}
		});
	}


	//Add One Page nav
	if($('.scroll-nav').length) {
		$('.scroll-nav').onePageNav();
	}


	//Sortable Masonary with Filters
	function enableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : '.masonry-item.small-column'
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.on('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}
	
	enableMasonry();


    // Progress Bar
	if ($('.count-bar').length) {
		$('.count-bar').appear(function(){
			var el = $(this);
			var percent = el.data('percent');
			$(el).css('width',percent).addClass('counted');
		},{accY: -50});

	}


	$(document).ready(function() {
      $('select:not(.ignore)').niceSelect();
    });


	// page direction
	function directionswitch() {
	  	if ($('.page_direction').length) {

	    	$('.direction_switch button').on('click', function() {
			   $('body').toggleClass(function(){
			      return $(this).is('.rtl, .ltr') ? 'rtl ltr' : 'rtl';
			  })
			});
	  	};
	}


	//Price Range Slider
	if($('.price-slider').length){ 
		$( ".price-slider" ).slider({
			range: true,
			min: 0,
			max: 4000,
			values: [0, 2500 ],
			slide: function( event, ui ) {
				$( ".price-value" ).text( "$" + ui.values[ 0 ] + " ---- $" + ui.values[ 1 ] );
			}
		});
		$( ".price-value" ).text( "$" + $( ".price-slider" ).slider( "values", 0 ) + " ---- $" + $(".price-slider" ).slider( "values", 1 ) );
	};
	

	//Price Range Slider
	if($('.price-range-slider').length){
		$( ".price-range-slider" ).slider({
			range: true,
			min: 0,
			max: 999,
			values: [ 0, 550 ],
			slide: function( event, ui ) {
			$( "input.property-amount" ).text( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		$( "input.property-amount" ).text("$" + $( ".price-range-slider" ).slider( "values",0 ) + " - $" + $( ".price-range-slider" ).slider( "values", 1 ) );	
	}


	if ($('.product-details-content .bxslider').length) {
		$('.product-details-content .bxslider').bxSlider({
	        nextSelector: '.product-details-content #slider-next',
	        prevSelector: '.product-details-content #slider-prev',
	        nextText: '<i class="fa fa-angle-right"></i>',
	        prevText: '<i class="fa fa-angle-left"></i>',
	        mode: 'fade',
	        auto: 'true',
	        speed: '700',
	        pagerCustom: '.product-details-content .slider-pager .thumb-box'
	    });
	}; 


	//Jquery Spinner / Quantity Spinner
	if($('.quantity-spinner').length){
		$("input.quantity-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}


	if ($('.banner-carousel-2').length) {
        var testimonialsTwoThumbCarousel = new Swiper('.banner-carousel-2', {
            slidesPerView: 1,
            spaceBetween: 0,
            mousewheel: true,
            speed: 1400,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.banner-slider-button-next',
                prevEl: '.banner-slider-button-prev',
            },
        });
    }



	/*	=========================================================================
	When document is Scrollig, do
	========================================================================== */

	jQuery(document).on('ready', function () {
		(function ($) {
			// add your functions
			directionswitch();
		})(jQuery);
	});



	/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});

	
	
	/* ==========================================================================
   When document is loaded, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		enableMasonry();
	});

	

})(window.jQuery);