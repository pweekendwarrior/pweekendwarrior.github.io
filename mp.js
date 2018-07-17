var scrolltype = "none";
var canScroll = true;
var isMobile = false;
var pause = true;
var audioElement;
var songs = new Array(); //name yields src
var lastScrollTop, delta;
var last, _element;
var min = true;
var songNum = 0;
var isChrome;
let menutype = "landing";
var isChromium = window.chrome,
    vendorName = window.navigator.vendor,
    isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
    isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;
var time = 0;
(function($) {
	'use strict';


$( window ).on( "load", function(){

	// device detection
	if (/Mobi/.test(navigator.userAgent)) {
    // mobile!
    isMobile = true;
    mobFunc();
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
	}
  var num = 0; //pages
  var pages = new Array();
   $( '.fullpage' ).each(function( index, element ){
       pages.push($( '.fullpage' )[index].id);
   });

  //scrolling

  	var pg = 0;

  	lastScrollTop = 0, delta = $(window).height()*.02;
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
  					$('html, body').animate({
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

           if(pg == 0 && !isMobile) {
             var ntc = (st%$('#content0').height())/$('#content0').height();
           $('#logo_img').css('transform', 'translateY(' +
           15*ntc + '%)')
           .css('filter', 'blur(' +
           10*ntc + 'px)');
           //console.log('frontpage');
           }
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
           //check_if_in_view();
           lastScrollTop = st;
           scrolltype = "none";
           //console.log('update');
   }, 55));
  //end scrolling function

  //Sound

	  audioElement = document.createElement('audio');

	  audioElement.setAttribute('src', "songs\\" + "KDT - Moonrise" + ".mp3");
	    audioElement.addEventListener('ended', function() {
	        playsong('next');
	    }, false);

	    audioElement.addEventListener("canplay",function(){
					$("#songimage").attr('src', "songs\\" + "KDT - Moonrise" + "_art" + ".png");
					$("#songtitle").text('KDT - Moonrise');
	    });

			audioElement.addEventListener("timeupdate",function(){
				if(time == 0){
					var x = Math.floor(100*audioElement.currentTime/audioElement.duration) || 0;
					//console.log(  x  );
          $('#track').val(x);
				}
				else {
					audioElement.pause();
					//console.log(time);
          $('#track').val(time);
					audioElement.currentTime = time;
					time = 0;
					audioElement.play();
				}
			});
      //audioElement.play();
	//!Sound

 $('#but_stream').on('click', function(){
   var destination = '' + ($('#content1').offset().top + $('#content1').height()*.1) + 'px';
   scrolltype = "override";
   pg = 1;
   $('html, body').animate({
   scrollTop: destination
   },
   {
   easing: 'swing',
   duration: 710,
   complete: function(){
   lastScrollTop = destination;
   scrolltype = "none";
   }
   });
 });
 $('#but_lease').on('click', function(){
  var destination = '' + ($('#content2').offset().top + $('#content2').height()*.1) + 'px';
  scrolltype = "override";
  pg = 2;
  $('html, body').animate({
  scrollTop: destination
  },
  {
  easing: 'swing',
  duration: 710,
  complete: function(){
  lastScrollTop = destination;
  scrolltype = "none";
  }
  });
});
$('#but_contact').on('click', function(){
  var destination = '' + ($('#content4').offset().top + $('#content4').height()*.1) + 'px';
  scrolltype = "override";
  pg = 4;
  $('html, body').animate({
  scrollTop: destination
  },
  {
  easing: 'swing',
  duration: 710,
  complete: function(){
  lastScrollTop = destination;
  scrolltype = "none";
  }
  });
});
  //
	 $("#action_arrow").click(function(){
	 	$('html, body').animate({
	 	scrollTop: '' + $("#content1").offset().top*1.1 + 'px'
	 	},
	 	{
	 	easing: 'swing',
	 	duration: 970,
	 	});
	 });
	 $('.songbutton').click(function(target){
 		playsong($(this).attr('id') + '');
 	});

	$("#playpause").click(function(){
	 if(pause){
		 $("#playpause").attr('src',
     'https://github.com/pweekendwarrior/pweekendwarrior.github.io/blob/master/assets/pause_reg.png?raw=false')
     .attr('width', '20%');
		 audioElement.play();
		 pause = false;
	 }
	 else{
		 $("#playpause").attr('src',
     'https://github.com/pweekendwarrior/pweekendwarrior.github.io/blob/master/assets/play_reg.png?raw=false')
     .attr('width', '20%');
		 audioElement.pause();
		 pause = true;
	 }  });
   //
   $('#prevsong').click(function(){
     playsong('prev');
   });
   $('#nextsong').click(function(){
     playsong('next');
   });
	 //
    $('#volume').on('input', _.throttle(function(event, ui) {
			var calc = Math.floor(parseInt($('#volume').val()))/100 || 0;
			audioElement.volume = calc;
			//console.log(calc);
		}, 50));
		$('#track').on('input', _.throttle(function(event, ui) {
			var calc = $('#track').val()/100;
			time = calc*audioElement.duration;
			console.log(calc*audioElement.duration);
			//console.log(calc);
		}, 50));


//both



//mobile site
//pc site
if(!isMobile){

	//
}
writebutton('KDT - Moonrise');



});
})(jQuery); //end of load reqs

// funcs
	function writebutton(name){
			var tmp = $("<button id = \'" + name
      + "\' class = \'songbutton\' onclick = \'playsong(\"" + name + "\")\'/>");
      tmp.html(name).css('background-image', 'url(songs\\art\\' + name + '_art.jpg)');
			tmp.appendTo($("#songselection"));
			songs.push(name);
	}
	function playsong(name){
		//console.log('name is ' + name);
	  last = songs.length-1;
		//random button
		if (name != 'random' && name != 'next' && name != 'prev') {
			_element = $('#' + name);
      console.log('(song) playing selected song -- ' + name);
		}
    else if (name == 'next'){
      if(songNum >= songs.length-1){
        songNum = 0;
        console.log('(next) repeat playlist');
      }
      else {
        songNum++;
      }
      name = songs[songNum];
	    _element = $('#' + name);
      console.log('(next) playing next song -- ' + name);
    }
    else if (name == 'prev'){
      if(songNum == 0){
        songNum = Math.max(0, songs.length-1);
        console.log('(prev) last in playlist');
      }
      else{  songNum--; }
      name = songs[songNum];
	    _element = $('#' + name);
      console.log('(prev) playing prev song -- ' + name);
    }
		else {
      songs = shuffle(songs);
      songNum = 0;
			name = songs[songNum];
	    _element = $('#' + name);
      console.log('(shuffle) shuffled songs; playing first song -- ' + name);
    }
		//console.log(name);

		audioElement.setAttribute('src', '' + 'songs\\' + name + '.mp3');
		//song art
        $('#songimage').attr('src', 'songs\\art\\' + name + '_art' + '.jpg');
      //

      //

		//play
		$("#playpause").attr('src',
    'https://github.com/pweekendwarrior/pweekendwarrior.github.io/blob/master/assets/pause_reg.png?raw=false')
    .attr('width', '20%');
		audioElement.play();
		pause = false;

		$('#songtitle').text(name);

		audioElement.addEventListener('ended', function() {
	    playsong('next');
				//this.play();
		}, false);

		audioElement.addEventListener("timeupdate",function(){
			if(time == 0){
				var x = Math.floor(100*audioElement.currentTime/audioElement.duration) || 0;
				//console.log(  x  );
				$('#track').val(x);
			}
			else {
				audioElement.pause();
				//console.log(  'time'  );
				$('#track').val(time);
				audioElement.currentTime = time;
				time = 0;
			}
		});
	}
  //
//
function r(min, max) {
        var minNumber = min; // le minimum
        var maxNumber = max; // le maximum
        return Math.floor(Math.random() * (maxNumber + 1) + minNumber); // la fonction magique
    }
//
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function menuBanner(){
      if(menutype == 'landing'){
        $('#menu').toggleClass('menu_landing').toggleClass('menu_banner');
        menutype = 'banner';
      }
      else if(menutype == 'disc'){
        $('#menu').toggleClass('menu_disc').toggleClass('menu_banner');
        menutype = 'banner';
      }
      else if(menutype == 'banner'){
        //do nothing
      }
      //console.log(menutype);
    }
    function menuLanding(){
      if(menutype == 'landing'){
        //do nothing
      }
      else if(menutype == 'disc'){
        $('#menu').toggleClass('menu_disc').toggleClass('menu_landing');
        menutype = 'landing';
      }
      else if(menutype == 'banner'){
        $('#menu').toggleClass('menu_banner').toggleClass('menu_landing');
        menutype = 'landing';
      }
      //console.log('*' + menutype);
    }
    function mobFunc(){
      $('#stylesheet1').attr('href', 'mp_mobile.css');
      $('content')
    }
