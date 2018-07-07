var backimg;
var backgrounds;
var currentbg, currentmenu;
var menuclasses, infos;
var active;
var activeSection;
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
		//alert('Please use google chrome on a pc to optimally view this website.');
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

	//Sound

	  audioElement = document.createElement('audio');

	  audioElement.setAttribute('src', "songs\\" + "Bluu - Droop" + ".mp3");
	    audioElement.addEventListener('ended', function() {
	        if(!isMobile) playsong('next');
          else mobileplaysong('next');
	    }, false);

	    audioElement.addEventListener("canplay",function(){
	        //$("#length").text("Duration:");
	        //$("#source").text("Source:");
	        //$("#status").text("Status: Ready to play").css("color","green");
					//$("#songimage").attr('src', "songs\\" + "droop" + "art" + ".png");
					//$("#songimage").text('Bluu - Droop');
	    });

			audioElement.addEventListener("timeupdate",function(){
				if(time == 0){
					var x = Math.floor(100*audioElement.currentTime/audioElement.duration) || 0;
					//console.log(  x  );
          if(!isMobile) {$('#track').val(x);}
          else {$('#mobile_track').val(x);}
				}
				else {
					audioElement.pause();
					console.log(  'time'  );
          if(!isMobile) {$('#track').val(time);}
          else {$('#mobile_track').val(time);}
					audioElement.currentTime = time;
					time = 0;
					audioElement.play();
				}
			});
      //audioElement.play();
	//!Sound


  var num = 0; //pages
  var pages = new Array();
  if(!isMobile){
   $( '.fullpage' ).each(function( index, element ){
       pages.push($( '.fullpage' )[index].id);
   });
  }
  if(!isChrome){
    $( '#content1' ).css('background-position', '0');
  }
//scrolling

	var pg = 0;

	lastScrollTop = 0, delta = $(window).innerHeight()*.02;
	var scroll = 0;
				$(window).scroll(_.debounce(function(event){

          if(scrolltype == "override"){
            event.preventDefault();
            return;
          }

				if(!isMobile){

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

        if (!$('html').is(':animated')){  //dont interrupt current scroll
				event.preventDefault();
				 var st = $(this).scrollTop();

				 if(Math.abs(lastScrollTop - st) <= delta)  return;
         //console.log($(window).width()*.7 + ', ' + st + ', ' + lastScrollTop);

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
						pg = Math.min(pg + 1, pages.length-1)
						var $elemen = pages[pg];
						var px = ($('#' + $elemen).offset().top);
						//anim
            lastScrollTop = px;
            scrolltype = "none";
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
						pg = Math.max(pg - 1, 0);
						var $elemen = pages[pg];
						var px = ($('#' + $elemen).offset().top);
						//anim
            lastScrollTop = px;
            scrolltype = "none";
						//!anim
            }
				 }
		 }
		 else{

			 event.preventDefault();

		 }
	 }
 }, 5));
//end scrolling function


 $('#but_stream').on('click', function(){
   var destination = '' + ($('#content1').offset().top + $('#content1').height()*.1) + 'px';
   scrolltype = "override";
   pg = 1;
   $('html').animate({
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
  $('html').animate({
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
  $('html').animate({
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

   $("#logo_img").on('click', function(){
     $("#logo_img").toggleClass('logo_clicked');
   });

	 $("#action_arrow").click(function(){
	 	$('html').animate({
	 	scrollTop: '' + $("#content1").offset().top + 'px'
	 	},
	 	{
	 	easing: 'swing',
	 	duration: 370,
	 	});
	 });
	 $("#droparr1").click(function(){
	 	$("#songselection").toggleClass('hidesongselection').toggleClass('showsongselection');
    $("#songplayer").css('opacity', '0');
	 });
	 $("#droparr2").click(function(){
	 	$("#songselection").toggleClass('hidesongselection').toggleClass('showsongselection');
    $("#songplayer").css('opacity', '1');
	 });
	 $('.songbutton').click(function(target){
 		playsong($(this).attr('id') + '');
 	});
	/*$('#restart').click(function() {
			audioElement.currentTime = 0;
	});
	$('#fwd').click(function() {
			audioElement.currentTime += 5*1;
	});
	$('#bck').click(function() {
			audioElement.currentTime -= 5*1;
	})*/;

	$("#playpause").click(function(){
	 if(pause){
		 $("#playpause").attr('src', 'pause_reg.png').attr('width', '20%');
		 audioElement.play();
		 pause = false;
		 //console.log('play');
	 }
	 else{
		 $("#playpause").attr('src', 'play_reg.png').attr('width', '20%');
		 audioElement.pause();
		 pause = true;
		 //console.log('pause');
	 }  });
	 //
	 $("#mobile_playpause").click(function(){
		if(pause){
			$("#mobile_playpause").attr('src', 'pause_reg.png');
			audioElement.play();
			pause = false;
			//console.log('play');
		}
		else{
			$("#mobile_playpause").attr('src', 'play_reg.png');
			audioElement.pause();
			pause = true;
			//console.log('pause');
		}  });



    $('#volume').on('input', function(event, ui) {
			var calc = Math.floor(parseInt($('#volume').val()))/100 || 0;
			audioElement.volume = calc;
			//console.log(calc);
		});
		$('#track').on('input', function(event, ui) {
			var calc = $('#track').val()/100;
			time = calc*audioElement.duration;
			console.log(calc*audioElement.duration);
			//console.log(calc);
		});


    /**$('#menuicon').click(function(){
      $('#menuicon').toggleClass('appear');
      $('#menuicon').toggleClass('disappear');
    });**/


    $('#mobile_volume').on('input', function(event, ui) {
      var calc = Math.floor(parseInt($('#mobile_volume').val()))/100 || 0;
      audioElement.volume = calc;
      //console.log(calc);
    });
    $('#mobile_track').on('input', function(event, ui) {
      var calc = $('#mobile_track').val()/100;
      time = calc*audioElement.duration;
      console.log(calc*audioElement.duration);
      //console.log(calc);
    });


//both












//mobile site
if(isMobile){
	$('#desktop').hide();
	//
  mobilewritebutton('Chlo - Disney');
	mobilewritebutton('Bluu - Droop');
	mobilewritebutton('Bluu - Resignation ft NoWaH');








}





//pc site
if(!isMobile){
	$('#mobile').hide();
	//
  writebutton('Chlo - Disney');
	writebutton('Bluu - Droop');
	writebutton('NoWaH - I Am');

















}









});
})(jQuery); //end of load reqs

// funcs
	function writebutton(name){
			//var sound = $("<source type='audio' src = 'file://songs\\" + bname + "' value='" + btext + "' id = '" + bname + "' class = 'song' onclick = 'bclic(" + bname + ")'/>");
			//console.log("<input type= \'button\' value= \'" + name + "\' id = \'" + name + "\' class = \'songbutton\' onclick = \'playsong( \"" + name + "\" )\'/>");
			var tmp = $("<input type= \'button\' value= \'" + name + "\' id = \'" + name + "\' class = \'draw meet songbutton\' onclick = \'playsong(\"" + name + "\")\'/>");
			tmp.appendTo($("#songselection"));
			songs.push(name);
			//console.log('wrote ' + tmp.attr('id'));
	}
	function mobilewritebutton(name){ //mobile
			//var sound = $("<source type='audio' src = 'file://songs\\" + bname + "' value='" + btext + "' id = '" + bname + "' class = 'song' onclick = 'bclic(" + bname + ")'/>");
			var tmp = $("<input type=\'button\' value=\'" + name + "\' id = \'" + name + "\' class = \'mobile mobile_songbutton\' onclick = \'mobileplay(\"" + name + "\")\'/>");
			tmp.appendTo($("#mobile_songs"));
			songs.push(name);
			//console.log('[mobile] wrote ' + tmp.attr('id'));
	}
	function playsong(name){
		//console.log('name is ' + name);
	  last = songs.length-1;
		//random button
		if (name != 'random' && name != 'next') {
			_element = $('#' + name);
      console.log('(song) playing selected song -- ' + name);
		}
    else if (name == 'next'){
      if(songNum > songs.length-2){
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
      $('#songimage').attr('src', 'art\\' + name + '_art' + '.png');
      console.log('(art) exists');
      $('#songimage').on('error', function()
      {
        $('#songimage').attr('src', '' + 'placeholder_song_title' + '.png');
        console.log('(art) does not exist');
      });

      //

      //

		//play
		$("#playpause").attr('src', 'pause.png').attr('width', '20%');
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
				//audioElement.play();
			}
		});
		console.log('playing ' + name);
	}
	function mobileplay(name){ //mobile
	  last = songs.length-1;
    if(songNum == songs.length-1){
      songNum = 0;
    }
    if (name != 'random' && name != 'next') {
			_element = $('#' + name);
		}
    if (name == 'next'){
      songNum++;
      name = songs[songNum];
	    _element = $('#' + name);
    }
		else {
      songs = shuffle(songs);
      songNum = 0;
			name = songs[songNum];
	    _element = $('#' + name);
	  }
		audioElement.setAttribute('src', '' + 'songs\\' + name + '.mp3');
		//play
		$("#mobile_playpause").attr('src', 'pause.png');
		audioElement.play();
		pause = false;
		audioElement.play();
		audioElement.addEventListener('ended', function() {
	    playsong('next');
		}, false);
		console.log('playing ' + name);
	}
  //
  function exists(path) {
  	filename = path;

  	var response = jQuery.ajax({
  		url: filename,
  		type: 'HEAD',
  		async: false
  	}).status;

  	return (response != "200") ? false : true;
  }
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
      console.log(menutype);
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
      console.log('*' + menutype);
    }
