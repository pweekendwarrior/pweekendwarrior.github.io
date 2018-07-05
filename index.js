var canScroll = true;
var isMobile = false;
var lastScrollTop, delta;
var last, _element;
var min = true;
var songNum = 0;
var isChrome;
var pglast = 0;
var slider_mod = 1;
var scrolltype = "none";
var isChromium = window.chrome,
    vendorName = window.navigator.vendor,
    isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
    isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;
var time = 0;
(function($) {
	'use strict';


$( window ).on( "load", function(){ //make sure everything is loaded

	// device detection
	if (/Mobi/.test(navigator.userAgent) || $(window).width() < 761) {
    // mobile!
		isMobile = true;
		//alert('Please use a desktop computer to optimally view this website.');
	}
	if(isChromium !== null
  && isChromium !== undefined
  && vendorName === "Google Inc."
  && isOpera == false
  && isIEedge == false) {
  	isChrome = true;
	}
	else{
		isChrome = false;
		//alert('Please use google chrome to optimally view this page.');
	}
	//dev det

  var num = 0; //pages
  var pages = new Array();

   $( '.fullpage' ).each(function( index, element ){
  	pages.push($( '.fullpage' )[index].id);
    $(element).css('top', 140*num*1 + 'vh');
  	$(element).css('left', '0');
    num++;
  });





  //scrolling

  	var pg = 0;

  	lastScrollTop = 0, delta = $(window).innerHeight()*.02;
  	var scroll = 0;
  				$(window).scroll(_.throttle(function(event){

            if(scrolltype == "override"){
              event.preventDefault();
              return;
            }

  				if(!canScroll){  //lock mode
  					var $elemen = pages[pg];
  					//alert('#' + $elemen);
  					var px = ($('#' + $elemen).offset().top);
  					//anim
  					$('html').animate({
  					scrollTop: '' + px + 'px'
  					},
  					{
  					easing: 'swing',
  					duration: 100,
  					complete: function(){
  					lastScrollTop = $(this).scrollTop();
  					}
  					});
  				}

  				 var st = $(this).scrollTop();

           if(pg == 0) {
           $('#landimg').css('transform', 'translateY(' +
           40*(st%$('#content0').height())/$('#content0').height() + '%)');
           //console.log('frontpage');
           }
           if(pg == 7) {
           $('#closeimg').css('transform', 'translateY(' +
           -40*(st-$('#content5').offset().top)/$('#content5').height() + 100 + '%)');
           //console.log('bookend');
         }
           console.log(pg);

  				 if(Math.abs(lastScrollTop - st) <= delta)  return;

  				 if (st > lastScrollTop){
  						// downscroll code
              //events
              if(st > $(window).height()*.1 && lastScrollTop < $(window).height()*.1){
              menuBanner();
              }
              //!events
              if(scrolltype != "up")
              {
              scrolltype = "down";
  						pg = Math.floor(st/$(window).height());
  						var $elemen = pages[pg];
  						//var px = ($('#' + $elemen).offset().top);
  						//anim
  						//!anim
              }
  				 }
  				 else {
  						// upscroll code
              //events
              if(st < $(window).height()*.1 && lastScrollTop > $(window).height()*.1){
              menuLanding();
              }
              //!events
              if(scrolltype != "down")
              {
              scrolltype = "up";
  						pg = Math.floor(st/$(window).height());
  						var $elemen = pages[pg];
  						//var px = ($('#' + $elemen).offset().top);
  						//anim
  						//!anim
              }
  				 }

           check_if_in_view();

           //console.log(lastScrollTop + ', ' + st);
           lastScrollTop = st;
           scrolltype = "none";
           //console.log('update');
   }, 80));
  //end scrolling function

//sliders init

$('.ba-slider').each(function(){
  var cur = $(this);
  // Adjust the slider
  var width = (cur.width()*slider_mod)+'px';
  cur.find('.resize img').css('width', width);
  // Bind dragging events
  drags(cur.find('.handle'), cur.find('.resize'), cur);
});

//end slider init code

// L&R listeners
  $('.mobile_right').on('click', function(){
    //
    var number = $(this).attr('id').toString().slice(1,2);
    //
    $(this).toggleClass('right_half_before').toggleClass('right_half_after');
    //
    if($(this).hasClass('right_half_after'))
    {
    $('#label_left_' + number).css('opacity', 0);
    $('#label_right_' + number).css('opacity', 0);
    $('.left_half_after').each(function(key, value){
      console.log('fixing left side');
      //$(this).toggleClass('right_half_after').toggleClass('right_half_before');
      if($(this).attr('id').toString().slice(1,2) == number){
        $(this).toggleClass('left_half_after').toggleClass('left_half_before');
      }
    });
  }
  else {
    $('#label_left_' + number).css('opacity', 1);
    $('#label_right_' + number).css('opacity', 1);
  }
  //
  });


  $('.mobile_left').on('click', function(){
    //
    var number = $(this).attr('id').toString().slice(1,2);
    //
    $(this).toggleClass('left_half_before').toggleClass('left_half_after');
    //
    if($(this).hasClass('left_half_after'))
    {
    $('#mobile_label_left_' + number).css('opacity', 0);
    $('#mobile_label_right_' + number).css('opacity', 0);
    $('.right_half_after').each(function(key, value){
      console.log('fixing right side');
      //$(this).toggleClass('right_half_after').toggleClass('right_half_before');
      if($(this).attr('id').toString().slice(1,2) == number){
        $(this).toggleClass('right_half_after').toggleClass('right_half_before');
      }
    });
    }
    else {
      $('#mobile_label_left_' + number).css('opacity', 1);
      $('#mobile_label_right_' + number).css('opacity', 1);
    }
    //
  });
  $('.l').on('click', function(){
    var z_el = $(this).parent();
    //
    var number = z_el.attr('id').toString().slice(1,2);
    //
    z_el.toggleClass('left_half_before').toggleClass('left_half_after');
    //
    if(z_el.hasClass('left_half_after'))
    {
    $('#label_left_' + number).addClass('move_l');
    $('#label_right_' + number).addClass('move_r');
    $('.right_half_after').each(function(key, value){
      console.log('fixing right side');
      //$(this).toggleClass('right_half_after').toggleClass('right_half_before');
      if($(this).attr('id').toString().slice(1,2) == number){
        $(this).removeClass('right_half_after').addClass('right_half_before');
      }
    });
    }
    else {
      $('#label_left_' + number).removeClass('move_l');
      $('#label_right_' + number).removeClass('move_r');
    }
    //
  });
  $('.r').on('click', function(){
    var z_el = $(this).parent();
    //
    var number = z_el.attr('id').toString().slice(1,2);
    //
    z_el.toggleClass('right_half_before').toggleClass('right_half_after');
    //
    if(z_el.hasClass('right_half_after'))
    {
    $('#label_left_' + number).addClass('move_l');
    $('#label_right_' + number).addClass('move_r');
    $('.left_half_after').each(function(key, value){
      console.log('fixing left side');
      //$(this).toggleClass('right_half_after').toggleClass('right_half_before');
      if($(this).attr('id').toString().slice(1,2) == number){
        $(this).removeClass('left_half_after').addClass('left_half_before');
      }
    });
  }
  else {
    $('#label_left_' + number).removeClass('move_l');
    $('#label_right_' + number).removeClass('move_r');
  }
  //
  });
// end L&R listeners

$('#story').on('click', function(){
  if($('#story').attr('id') == 'story')
  {
    scrolltype = "override";
    pg = 1;
    $('html').animate({
    scrollTop: '' + $('#content1').offset().top + 'px'
    },
    {
    easing: 'swing',
    duration: 10,
    complete: function(){
    lastScrollTop = $('#content1').offset().top;
    scrolltype = "none";
    }
    });
    menuBanner();
  }
  else {
  {
    scrolltype = "override";
    pg = 0;
    $('html').animate({
    scrollTop: '' + 0 + 'px'
    },
    {
    easing: 'swing',
    duration: 10,
    complete: function(){
    lastScrollTop = 0;
    scrolltype = "none";
    }
    });
    menuLanding();
  }
  }
});
$('#panel1').on('click', function(){
  menuBanner();
  scrolltype = "override";
  pg = 2;
  $('html').animate({
  scrollTop: '' + $('#content2').offset().top + 'px'
  },
  {
  easing: 'swing',
  duration: 10,
  complete: function(){
  lastScrollTop = $('#content2').offset().top;
  scrolltype = "none";
  }
  });
});
$('#panel2').on('click', function(){
  menuBanner();
  scrolltype = "override";
  pg = 4;
  $('html').animate({
  scrollTop: '' + $('#content4').offset().top + 'px'
  },
  {
  easing: 'swing',
  duration: 10,
  complete: function(){
  lastScrollTop = $('#content4').offset().top;
  scrolltype = "none";
  }
  });
});
$('#panel3').on('click', function(){
  menuBanner();
  scrolltype = "override";
  pg = 6;
  $('html').animate({
  scrollTop: '' + $('#content6').offset().top + 'px'
  },
  {
  easing: 'swing',
  duration: 10,
  complete: function(){
  lastScrollTop = $('#content6').offset().top;
  scrolltype = "none";
  }
  });
});

$('.cont_gd_off_after').on('click',
  function() {
    if(!$(this).hasClass('gd_on_after')) {
      $(this).toggleClass('gd_on_after').toggleClass('cont_gd_off_after').html('Close   ' +
      $(this).html().substring(8, $(this).html().length));
      $(this).parent().toggleClass('gd_on').toggleClass('cont_gd_off').toggleClass('jumpin');
    }
    else {
      $(this).toggleClass('gd_on_after').toggleClass('cont_gd_off_after').html('Enlarge ' +
      $(this).html().substring(8, $(this).html().length));
      $(this).parent().toggleClass('gd_on').toggleClass('cont_gd_off').toggleClass('jumpin');
    }
  }
);
$('.left_chevron_after').on('click', function(){
  $(this).parent().css('transform', 'translate(0vw, 0)')
});
$('._close').on('click', function(){
  $(this).parent().css('transform', 'translate(-100vw, 0)');
});
$('.img_off').on('click', function(){
  $(this).toggleClass('img_on img_off');
});
$('.img_on').on('click', function(){
  $(this).toggleClass('img_on img_off');
});
/*$(".g_no_pointer").on('click',
  function() {
    if(!$(this).parent().hasClass('gd_on')) {
      $(this).parent().addClass('gd_on').css('transform',
      'translate(' + -0.8*$(this).parent().position().left + 'px, ' + -0.8*$(this).parent().position().top + 'px)');

      $(this).css('opacity', '1');
    }
    else {
      $(this).parent().removeClass('gd_on').css('transform', 'none');

      $(this).css('opacity', '0');
    }
  }
);*/


    /** slider example
    $('#volume').on('input', function(event, ui) {
			var calc = Math.floor(parseInt($('#volume').val()))/100 || 0;
			audioElement.volume = calc;
			//console.log(calc);
		}); */

//both mobile and desktop code
/**
$('._text').each(function( k, v ){
  var __name = v.id;
   //$('#' + __name + '_text').text();
   $.get('' + __name + '_text.txt', function(data) {
    v.text = data;
   });
});
*/

//mobile site
if(isMobile){
	//$('#desktop').hide();
  $('#mobile').hide();
  $('#landimg').css('width', $(window).width()*2.5 + 'px').css('height', $(window).height()*2.5 + 'px');
  $('.text').each(function(){
    var cur = $(this);
    cur.css('width', '80vw').css('font-size', '4vw');
  });
  $('.fullimg').each(function(){
    var cur = $(this);
    cur.css('height', '140vh').css('width', '140vh').css('left', '-43vh');
  });
  $('.ital').each(function(){
    var cur = $(this);
    cur.css('width', '80vw').css('font-size', '5vw').css('top', '5vh').css('height', 'auto');
  });
  $('.center_land').each(function(){
    var cur = $(this);
    cur.css('font-size', '5vw').css('height', 'auto');
  });
  $('#landimg').css('height', '140vh').css('width', 'auto').css('left', '-43vh');
	//

}
//pc site
if(!isMobile){
	$('#mobile').hide();
	//

}
//jquery end tags
});
})(jQuery); //end of load reqs

// funcs

//slider funcs


// Update sliders on resize.
// Because we all do this: i.imgur.com/YkbaV.gif
$(window).resize(function(){
  $('.ba-slider').each(function(){
    var cur = $(this);
    var width = (cur.width()*slider_mod)+'px';
    cur.find('.resize img').css('width', width);
  });
});

function drags(dragElement, resizeElement, container) {

  // Initialize the dragging event on mousedown.
  dragElement.on('mousedown touchstart', function(e) {

    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');

    // Check if it's a mouse or touch event and pass along the correct value
    var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

    // Get the initial position
    var dragWidth = dragElement.outerWidth(),
        posX = dragElement.offset().left + dragWidth - startX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth();

    // Set limits
    minLeft = containerOffset + 10;
    maxLeft = containerOffset + containerWidth - dragWidth - 10;

    // Calculate the dragging distance on mousemove.
    dragElement.parents().on("mousemove touchmove", function(e) {

      // Check if it's a mouse or touch event and pass along the correct value
      var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

      leftValue = moveX + posX - dragWidth;

      // Prevent going off limits
      if ( leftValue < minLeft) {
        leftValue = minLeft;
      } else if (leftValue > maxLeft) {
        leftValue = maxLeft;
      }

      // Translate the handle's left value to masked divs width.
      widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

      // Set the new values for the slider and the handle.
      // Bind mouseup events to stop dragging.
      $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
        $(this).removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      $('.resizable').css('width', widthValue);
    }).on('mouseup touchend touchcancel', function(){
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
    e.preventDefault();
  }).on('mouseup touchend touchcancel', function(e){
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}


//end slider funcs
function r(min, max) {
        var minNumber = min; // le minimum
        var maxNumber = max; // le maximum
        return Math.floor(Math.random() * (maxNumber + 1) + minNumber); // la fonction magique
    }
//

    function menuBanner(){
      $('#story').toggleClass('landing_button').toggleClass('return_button').html('Back/Home')
      .css('z-index', 12).attr('id', 'backtotop').css('display', 'block');
    }
    function menuLanding(){
      $('#backtotop').toggleClass('return_button').toggleClass('landing_button').html('Interactive Version')
      .css('z-index', 12).attr('id', 'story').css('display', 'none');
    }

    function displayEl(on, _el){
      if (on){
        console.log('+');
        _el.css('opacity', '1').css('transform', 'none');

      }
      else{
        console.log('-');
        _el.css('opacity', '0').css('transform', 'translate(0, -5vh)');
      }
    }
    function check_if_in_view() {
  var window_height = $(window).height();
  var window_top_position = $(window).scrollTop()-(.4*$(window).height());
  var window_bottom_position = (window_top_position + window_height);

  $('.jumpin').each(function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}
