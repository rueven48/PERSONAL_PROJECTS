/*********** Vars ****************/
var songs_name = []; // arr of the songs names
var tracks = []; // arr of the songs url
var arr_albums = [];  // inside  album arr there is objs : id,name,image source
var index_tracks = 0;
var index_song_clicked = '';
var prev_index_song = '';
var curr_song = '';
var album_id_index = 0;
var album_id = 0;
var flag = true; //  tell me if button play of album inside player clicked paused or play
var audio = ''; // declare variable that will hold the player
var prev_album_id = 0;
var counter_clicks_song = 0; // count double click on the same song in order to pause it and than play it from last pos.
/*********** End Vars ****************/


/********* Init *************/

$(document).ready(function(){
	var url = "http://localhost/playlist/api/playlist";
	$.get(url,function(obj){
		initLoad(obj);
		
	});	
	
});


/**

  @function initLoad - Init the playlists to DOM
  @param obj
  @returns void

*/

function initLoad(obj){
	
	for (var i = 0; i < obj.data.length; i++){
		$('#my_unorder_list').append('<li class="container_of_album" data-albumname="'+ obj.data[i].name +'"  >' 

										+ '<p class="name_of_album_title">' + obj.data[i].name + '</p>'

										+ '<img class="rounded-circle album_image" src="' + obj.data[i].image + '">'

										+ '<button data-playid="'+ obj.data[i].id +'" class="button_play_of_album rounded-circle" type="button">'

											+ '<i class="fa fa-play" aria-hidden="true"></i>'

	 									+ '</button>'

										+ '<button data-deleteid="'+ obj.data[i].id +'" data-toggle="confirmation" class="button_delete_album_inside_album rounded-circle" type="button">'	

											+ '<i class="fa fa-times" aria-hidden="true"></i>'

										+ '</button>'

										+ '<button data-editid="'+ obj.data[i].id +'" class="button_edit_album_inside_album rounded-circle" data-toggle="modal" data-target="#my_modal_playlist" type="button">'	

											+ '<i class="fa fa-pencil" aria-hidden="true"></i>'

										+ '</button>'

									+ '</li>');

		
		curveAlbumName();
		setAlbumsInArray(obj,i);
		onMethodsInInitLoad(i);
	}
}

/**

  @function setAlbumsInArray - so i can save the album data in my memory (array) --> i want to to do the ajax calls min times  
  @param obj,i
  @returns void

*/

function setAlbumsInArray(obj,i){  //every album is an obj and is push into array so there will be arrays of objects 
	var album_pic_obj = { "id" : obj.data[i].id,"name" : obj.data[i].name ,"image" : obj.data[i].image };
	arr_albums.push(album_pic_obj);
}

/**

  @function curveAlbumName - i am using jquey plugin called arctext to bend each of the title name of album like rainbow style
  @returns void

*/

function curveAlbumName(){
	$('.name_of_album_title').arctext({radius: 110});
}

/********* Init *************/


/********* Task Operations *************/


/**

  @function setSongInArrays - so i can save the songs name and url in my memory, in 2 arrays called ---> songs_name,tracks
  @param obj,i
  @returns void

*/

function setSongInArrays(obj,i){
	songs_name.push(obj.data.songs[i].name);
	tracks.push(obj.data.songs[i].url);
}

/**

  @function clearDomPlayerAndArrays - every time i play album or reload the page, i am clearing the previous album and previous Arrays
  @returns void

*/

function clearDomPlayerAndArrays(){
	$('#container_audio_ol_plus_album_image').remove();	
	tracks = [];
	songs_name = [];
	index_tracks = 0;
}

/**

  @function clearDomFromAllClassModal - classModal when launch and closed keep div modal append to DOM, before i launch 1 i am removing the previous modal from DOM so there will be no conflict
  @returns void

*/

function clearDomFromAllClassModal(){
	$('.modal').remove();
}


/**

  @function clearDomFromAllAlbums - when i reload page i am cleaning the previus albums from DOM
  @returns void

*/

function clearDomFromAllAlbums(){
	$('#my_unorder_list').children().remove();
	prev_album_id = 0;  // in order for the slide down to work again and not remember the prev album
}

/**

  @function reloadPage - this is actually a new call to ajax to begin the program (before i will clean the previous albums,player,arrays) 
  @returns void

*/

function reloadPage(){
   var url = "http://localhost/playlist/api/playlist";
		$.get(url,function(obj){
			clearDomPlayerAndArrays();
			clearDomFromAllAlbums();
			initLoad(obj);
 		});
}

/**

  @function AddIconPlayToFirstSong - i want to add an icon play before the name, to the first song that playing
  @returns void

*/

function AddIconPlayToFirstSong(){
	$('ol>li:first').toggleClass('li_names_of_song_playing_now');
	$('ol>li:first').toggleClass('delete_list_number_playing');
}

/**

  @function removeClassNotPlayingToSong - that means that i want the song to be visible because his playing now (all songs auto get by default class 'li_names_of_song_not_playing')
  @param li_of_specific_song
  @returns void

*/

function removeClassNotPlayingToSong(li_of_specific_song){
	$(li_of_specific_song).removeClass('li_names_of_song_not_playing');
}

/**

  @function addClassNotPlayingToSong - that means that the song isnt play any more, and i am giving him opacity 0.65 so he will be less visible
  @param li_of_specific_song
  @returns void

*/

function addClassNotPlayingToSong(li_of_specific_song){
	$(li_of_specific_song).addClass('li_names_of_song_not_playing');
}

/**

  @function removePreviousClassPaused - that means that the song isnt play any more, and i am giving him opacity 0.65 so he will be less visible
  @param index
  @returns void

*/

function removePreviousClassPaused(index){
	$('#list_of_songs li').eq(index).removeClass('li_names_of_song_playing_now_paused');
}


/**

  @function addPlayIconAndBoldToSongNameClicked - adding style css to song name clicked by user (play)
  @param li_of_specific_song
  @returns void

*/

function addPlayIconAndBoldToSongNameClicked(li_of_specific_song){
	$(li_of_specific_song).removeClass('li_names_of_song_playing_now_paused');
	$('ol>li').removeClass('delete_list_number_playing');
	$(li_of_specific_song).toggleClass('delete_list_number_playing');
	$('ol>li').removeClass('li_names_of_song_playing_now');
	$(li_of_specific_song).toggleClass('li_names_of_song_playing_now');
}

/**

  @function addPauseIconAndBoldToSongNameClicked - adding style css to song name clicked by user (pause)
  @param li_of_specific_song
  @returns void

*/

function addPauseIconAndBoldToSongNameClicked(li_of_specific_song){
	$(li_of_specific_song).attr("class","li_names_of_song_playing_now_paused li_names_of_song_not_playing");
	$(li_of_specific_song).addClass("delete_list_number_playing");
}

/**

  @function changeSongNamePlayingNow - change the name of the song now playing, if the last song ended i stop the playing and put 'none' in the text 
  @param index_name
  @returns void

*/

function changeSongNamePlayingNow(index_name="none"){
	if( index_name != 'none'){
		$('#container_of_song_name_playing').text('NOW PLAYING : ' + songs_name[index_name]); //continue playing
	}else{
		$('#container_of_song_name_playing').text('NOW PLAYING : none'); //stop playing 
	}
} 

/**

  @function stopSpinAlbumAndSetPlayIcon - stop the album to rotate and change the icon inside him tp play icon
  @returns void

*/

function stopSpinAlbumAndSetPlayIcon(){
	$('#container_audio_ol_plus_album_image>.container_image_in_player').removeClass('spin'); 
	$('.button_of_album_inside_player>.fa-pause').attr("class","fa fa-play");
}

/**

  @function continueSpinAlbumAndSetPauseIcon - continue the album to rotate and change the icon inside him tp pause icon
  @returns void

*/

function continueSpinAlbumAndSetPauseIcon(){
	$('#container_audio_ol_plus_album_image>.container_image_in_player').addClass('spin');
	$('.button_of_album_inside_player>.fa-play').attr("class","fa fa-pause");
}

/**

  @function getIndexLocationOfAlbumId - i want to know the index location and not just album id because the album id isnt the right indicator
  @param album_id
  @returns boolean,i

*/

function getIndexLocationOfAlbumId(album_id){
	for(var i = 0; i < arr_albums.length; i++){
		if( album_id == arr_albums[i].id ){
			return i;
		}
	}
	return false;
}

/**

  @function slidePlayer - this function do the slide both up and down dependent on the parmater send to the function--> (action='slideUp'-->up ,action='slideDown'-->down )
  @param action
  @returns void

*/

function slidePlayer(action){
	$("#container_audio_ol_plus_album_image")[action](1000);
    $("#list_of_songs")[action](1000);
    $("#container_of_song_name_playing")[action](1000);
    $(".container_image_in_player")[action](1000); 
}

/**

  @function play - put the song url into the src of the audio tag and play the song 
  @param curr_song
  @returns void

*/

function play(curr_song){
	audio.src = curr_song;
	audio.play();
}

/**

  @function songEnded -  when there is event 'ended' to song the next song will be play and all logic attach to it will work 
  @param album_id_index
  @returns void

*/

function songEnded(album_id_index){
	if(index_song_clicked == ($('ol').children('li').size()-1)){ // we are at last song of current album
		removePlayIconAndShowSongsNumbers();
		changeSongNamePlayingNow();
		stopSpinAlbumAndSetPlayIcon();
		changeTagTitleByAlbumAndSong(album_id_index,'');
		index_tracks = index_song_clicked;
		index_tracks++;
		audio.src = '';
		audio.pause();
		audio.currentTime = 0;
   	}
    if(index_tracks < tracks.length){
       	if(index_song_clicked != '' || index_song_clicked != 0){ // that indicate that there were click event on song name
    		index_tracks = index_song_clicked;
       	}
    	index_tracks++;
    	curr_song = tracks[index_tracks];
		audio.src = curr_song;
    	audio.play();
    	addClassNotPlayingToSong('ol>li:first'); // change opacity to 0.65 no to see the first song
    	changePlayIconToNextSong(index_tracks); //change play icon to the next song when song ended
    	changeSongNamePlayingNow(index_tracks);
    	changeTagTitleByAlbumAndSong(album_id_index,songs_name[index_tracks]); 
    }
}

/**

  @function removePlayIconAndShowSongsNumbers -  will remove the play and show numbers list to song not playing now  
  @returns void

*/

function removePlayIconAndShowSongsNumbers(){
	$('ol').children('li').each(function (){
			$('ol li').removeClass("li_names_of_song_playing_now");
			$('ol li').removeClass('delete_list_number_playing');
	});
}

/**

  @function changePlayIconToNextSong - change play icon to next song and remove play icon from previous   
  @param index_tracks
  @returns void

*/

function changePlayIconToNextSong(index_tracks){
	if( $('ol>li:eq('+ index_tracks + ')') ){ 
       	$('ol>li:eq('+ (index_tracks-1) + ')').toggleClass('li_names_of_song_playing_now');
    	$('ol>li:eq('+ index_tracks + ')').toggleClass('li_names_of_song_playing_now');
    	$('ol>li:eq('+ index_tracks + ')').toggleClass('delete_list_number_playing');
    	$('ol>li:eq('+ (index_tracks-1) + ')').toggleClass('delete_list_number_playing');
    }
}

/**

  @function changeTagTitleByAlbumAndSong - change tag title both album name and song name according to song that playing now   
  @param album_id_index,song_name
  @returns void

*/

function changeTagTitleByAlbumAndSong(album_id_index,song_name){
	$('title').text(arr_albums[album_id_index].name +':'+ song_name ); 
}

/**

  @function setInputsValuesInPlaylistSongs - set the song url and song name in their inputs in update mode
  @param obj
  @returns void

*/

function setInputsValuesInPlaylistSongs(obj){
	for (var i = 0; i < obj.data.songs.length; i++){
			$('.new_input_song_url').eq(i).attr("value",obj.data.songs[i].url);
			$('.new_input_song_name').eq(i).attr("value",obj.data.songs[i].name);
	}
}

/**

  @function updatePlaylistSongs - set new obj with data from user and send it to the api using post request
  @param album_id
  @returns void

*/

function updatePlaylistSongs(album_id){
	var name_input = $('.new_input_song_name');
	var url_input = $('.new_input_song_url');
	var obj_data = {}; //new data obj that will hold all the songs data
	var data = addPlaylistSongsFromUserIntoNewObj(name_input,url_input,obj_data);
	var url = "http://localhost/playlist/api/playlist/" + album_id +"/songs";
	postRequestToApi(url,data,true);
}

/**

  @function updateObjAlbumInArrAlbums - on update mode i need to update the arr_albums with the album title and image album
  @returns void

*/

function updateObjAlbumInArrAlbums(){
	arr_albums[album_id_index].name = $('#input_playlist_name').val();
	arr_albums[album_id_index].image = $('#input_playlist_url').val();
}

/**

  @function setValuesInputsInPlaylistWindow - on update i  am showing the album title and the url pic in their inputs  
  @returns void

*/

function setValuesInputsInPlaylistWindow(){
	$('#input_playlist_name').val(arr_albums[album_id_index].name);
	$('#input_playlist_url').val(arr_albums[album_id_index].image);
}

/**

  @function setPictureInPreview - on update set the image album in the preivew place    
  @returns void

*/

function setPictureInPreview(){
	$('#preview_album_image').attr("src",arr_albums[album_id_index].image);
}

/**

  @function playAlbum - do the logic of play spesific album, open player,gets songs from api, and play the first song
  @param button_play
  @returns void

*/

function playAlbum(button_play){
	album_id = $(button_play).attr("data-playid");
	if(prev_album_id == album_id){ // if its true that means that there was double click on button and it needs to close the player
		slidePlayer("slideUp");  //send to function the place in the array to do slideup
		audio.pause();
		$('title').text('My Awsome Player');
		prev_album_id = 0;
	}else{
		prev_album_id = album_id; // else is if the play button clicked only once 
		var url = "http://localhost/playlist/api/playlist/"+ album_id +"/songs";
		$.get(url,function(obj){
			var album_id_index = getIndexLocationOfAlbumId(album_id);
			clearDomPlayerAndArrays();
			appendPlayerAfterHeader(obj,album_id_index);
			slidePlayer("slideDown"); //send to function the place in the array to do slidedown
			audio = $('audio')[0];
			play(tracks[index_tracks]);
			AddIconPlayToFirstSong();
			removeClassNotPlayingToSong('ol>li:first');
			changeTagTitleByAlbumAndSong(album_id_index,songs_name[0]); 
			onMethodsInPlayAlbum(album_id_index);
		});	
	}
}

/**

  @function playAlbum - create new album and do init to the program
  @returns void

*/

function CreateNewAlbum(obj_data){
	var name_input = $('.name_input');
	var url_input = $('.url_input');
	var data = addPlaylistSongsFromUserIntoNewObj(name_input,url_input,obj_data);
	var url =  "http://localhost/playlist/api/playlist";
	postRequestToApi(url,data,true);
}


/**

  @function playAlbum - update spesific album 
  @returns void

*/

function editAlbum(edit_button){
	var headline_edit_playlist = 'Edit Playlist'; //headline in edit mode
	var button_next = '<input type="button" class="btn btn-primary" id="button_next" value="Update" data-dismiss="modal" data-toggle="modal" data-target="#my_modal_songs">';
	appendPlaylistWindowToBody(headline_edit_playlist,button_next);
	var album_id = $(edit_button).attr("data-editid");
	album_id_index = getIndexLocationOfAlbumId(album_id); //album_id_index is global
	setValuesInputsInPlaylistWindow();
	setPictureInPreview();
	onMethodsInEditPlaylistWindow(album_id);
}

/**

  @function playAlbum - delete spesific album that the user click the 'x' button and do init to the program
  @returns void

*/

function deleteAlbum(delete_button){
	album_id = $(delete_button).attr("data-deleteid");
	var url1 = "http://localhost/playlist/api/playlist/"+ album_id;
	$.ajax({
        url: url1,
        type: 'DELETE',
        success : function(e){
    		reloadPage();
        }
    });
}

/**

  @function clearErrorMessage - clean message error 
  @returns void

*/

function clearErrorMessage(){
	$('#error_playlist_message').css("visibility","hidden");
}

/**

  @function resetInputFields - reset the fields and do some css style when button reset is clicked
  @returns void

*/

function resetInputFields(){
	$('#input_playlist_name').val('');
	$('#input_playlist_url').val('');
	$('#input_playlist_name').css("border","gray solid 1px");
	$('#input_playlist_url').css("border","gray solid 1px");
	clearErrorMessage();
}

/**

  @function addPlaylistSongsFromUserIntoNewObj - in update or create mode - put each song name and url into obj and push it
  into an array and in the end put it obj named obj_data in key 'songs'.
  @param name_input,url_input,obj_data
  @returns object

*/

function addPlaylistSongsFromUserIntoNewObj(name_input,url_input,obj_data){
	var songs_arr = []; // final arr to push all obj into
	var song_obj = {}; // obj of one song
	songs_name = [];   // arr of songs name
	tracks = []; // arr of url src
	
	name_input.each(function(){
		songs_name.push( $(this).val() );
	});
	
	url_input.each(function(){
		tracks.push( $(this).val() );
	});
	
	for(var i = 0; i < songs_name.length; i++){
		var song_obj = {};		
		if(songs_name[i] != ''){
			song_obj.name  = songs_name[i];	
		}
		
		for( var j = i ; j < tracks.length; j++){
			if(tracks[j] != ''){
				song_obj.url  = tracks[j];
				songs_arr.push(song_obj);
				break;
			}
			break;
		}
	}
	obj_data.songs = songs_arr;
	return obj_data;
}

/**

  @function postRequestToApi - in update or create send ajax request with data on post method
  @param url,data,reload
  @returns void

*/

function postRequestToApi(url,data,reload=false){  // using default parmater i want to reload the page after create album and after update songs finished only 
	$.post(url,data,function(obj){
		if(reload){
			reloadPage();
		}		
	});
}

/**

  @function setAlbumAndPicFromUserIntoNewObj - set the data of album title and pic album in obj to send it further to add songs to it later
  @returns obj

*/

function setAlbumAndPicFromUserIntoNewObj(){
	var obj_data = {}; //new playlist obj
	obj_data.name = $('#input_playlist_name').val();
	obj_data.image = $('#input_playlist_url').val();
	return obj_data;
}

/**

  @function loadAddPlaylistSongsWindow - load playlist songs window to DOM, and do on on Method on inputs
  @param obj_data
  @returns void

*/

function loadAddPlaylistSongsWindow(obj_data){
	var headline_add_playlist = 'Add Playlist Songs'; //headline in add mode
	appendPlaylistSongsWindowToBody(headline_add_playlist);
	appendInputsAndLabelsForPlaylistSongsWindow(3); //default is 3 lines of songs
	onMethodsInAddPlaylistSongs(obj_data);
}

/**

  @function loadAddNewPlaylistWindow - on create mode load playlist window to DOM, and do on on Method on inputs
  @returns void

*/

function loadAddNewPlaylistWindow(){
	var headline_add_playlist = 'Add  New Playlist '; //headline in add mode
	var button_next = '<input type="button" class="btn btn-primary" id="button_next" value="Next" data-dismiss="modal" data-toggle="modal" data-target="#my_modal_songs">';
	appendPlaylistWindowToBody(headline_add_playlist,button_next);
	onMethodsInAddPlaylistWindow();
}

/**

  @function changeValidUrlPreviewAlbumPic - if valid url of the album picture set css style according, else set empty picture 'preview' 
  @returns void

*/

function changeValidUrlPreviewAlbumPic(){
	var is_valide_url = isValidUrlPic();
	if(is_valide_url){
		$('#preview_album_image').attr("src",$('#input_playlist_url').val());
		$('#input_playlist_url').css("border","1px solid gray");
		$('#error_playlist_message').css("visibility","hidden");
		$('#button_next').attr("data-dismiss",'modal');
	}else{
		$('#preview_album_image').attr("src","pictures/preview.png");
	}	
}

/**

  @function showErrorMessage - show error text message
  @param input,message
  @returns void

*/

function showErrorMessage(input,message){
	input.text(message);
}

/**

  @function albumSearch - check if their is more than 2 letters of the album name - if there is a match it will show only in
  on DOM and the other albums will be in display:none but will not remove actually from the DOM,
  if the delete the serach it will return all the albums to DOM and remove display:none from all the albums, also the function 
  call to autoComplete function. 
  @param input_search
  @returns void

*/

function albumSearch(input_search){
  var search_value = $(input_search).val().toLowerCase();

  if(search_value.length > 2 || search_value.length == 0){

      $('#my_unorder_list > li').each(function(){
	      var album_name = $(this).data("albumname").toLowerCase();
	      if(album_name.indexOf(search_value) != -1){  // if its equal -1 that mean that the word isnt in album_name otherwise it is.

	      $(this).removeClass("display-none"); // if found match than ramove class display none to show album
	      }else{

	      $(this).addClass("display-none"); // if found no match than ramove all others by adding class display none to vanish them from screen
	      }
	  });
  }
  albumAutoComplete();
}

/**

  @function albumSearch - do auto complete of the name of the album and show under input search only if the word is more than 2 letters 
  and their is a match.
  @returns void

*/

function albumAutoComplete(){
  var namesArr = [];
  $('#my_unorder_list > li').each(function() {
    var album_name = $(this).data("albumname").toLowerCase();
    namesArr.push(album_name);
  });

  $( "#input_search" ).autocomplete({
     source: namesArr
   });
}

/********* Hover Operations *************/

/**

  @function mouseOverOnSongName - when mouse is over song name remove order list number
  @param song_li
  @returns void

*/

function mouseOverOnSongName(song_li){
	$(song_li).addClass('delete_list_number_not_playing');
}

/**

  @function mouseOutOnSongName - when mouse is out song name add order list number
  @param song_li
  @returns void

*/

function mouseOutOnSongName(song_li){
	$(song_li).removeClass('delete_list_number_not_playing');
}

/********* Hover Operations *************/



/********* Click Operations *************/

/**

  @function clickOnSongName - do logic when song named clicked, play the song clicked and do css style according
  @param li_of_specific_song,album_id_index
  @returns void

*/

function clickOnSongName(li_of_specific_song,album_id_index){
	index_song_clicked = songs_name.indexOf(li_of_specific_song.innerText);
	if(prev_index_song == index_song_clicked){
		songNameIsDoubleClicked(li_of_specific_song);
	}else{
		removePreviousClassPaused(prev_index_song);
		prev_index_song = index_song_clicked;
		curr_song = tracks[index_song_clicked];
		play(curr_song);
		continueSpinAlbumAndSetPauseIcon();
		addClassNotPlayingToSong('ol>li:first');
		addPlayIconAndBoldToSongNameClicked(li_of_specific_song);
		changeSongNamePlayingNow(index_song_clicked);
		changeTagTitleByAlbumAndSong(album_id_index,songs_name[index_song_clicked]);  
	}
}

/**

  @function songNameIsDoubleClicked - if song clicked dobule time, i want to play it or pause it according to the last
  state it was before, exp: if before it played than on double clicked it should pause.
  @param li_of_specific_song
  @returns void

*/

function songNameIsDoubleClicked(li_of_specific_song){
	counter_clicks_song++;
	if(counter_clicks_song % 2 == 0){ // only on double click on the same song i want do pause it, and play it by depend on song status
		addPlayIconAndBoldToSongNameClicked(li_of_specific_song);
		audio.play();
		flag = true; // in order to make equal 2 double clicks on the same song (against album button) 
	}else{
		addPauseIconAndBoldToSongNameClicked(li_of_specific_song);
		audio.pause();
		flag = false; // in order to make equal 2 double clicks on the same song (against album button)
	}
}

/**

  @function playerIsClickedPause - stop spin of album and change global variables according logic double clicks gives
  even number that % 2 give zero --> that mean there was 2 clicks on the same song and i am counting the clicks
  and add +1 to the counter
  @returns void

*/

function playerIsClickedPause(){
	stopSpinAlbumAndSetPlayIcon();
	if(counter_clicks_song % 2 == 0){ // in order to make equal 2 double clicks on the same song (against click on song)
		counter_clicks_song++;
	}
	flag = false; // in order to make equal 2 double clicks on the same song (against album button)
}

/**

  @function playerIsClickedPlay - continue spin of album and change global variables acording logic double clicks gives
  even number that % 2 give zero --> that mean there was 2 clicks on the same song and i am counting the clicks
  and add +1 to the counter, here there could be odd counter so i am  counting it also so the next time the counter will be even.
  @returns void

*/

function playerIsClickedPlay(){
	continueSpinAlbumAndSetPauseIcon();
	if(counter_clicks_song % 2 != 0){  // in order to make equal 2 double clicks on the same song (against click on song)
		counter_clicks_song++;
	}
	flag = true; // in order to make equal 2 double clicks on the same song (against album button)
}

/**

  @function buttonNextPlaylistWindowIsClicked - there was click button on 'next' on modal playlist window, set new obj and load
  playlist songs modal window.
  @returns void

*/

function buttonNextPlaylistWindowIsClicked(){
	var obj_data = setAlbumAndPicFromUserIntoNewObj();
	loadAddPlaylistSongsWindow(obj_data);
}

/**

  @function buttonOfAlbumInsidePlayerIsClicked - inside the player there is album that spin, inside him there is a button
  play/pause that play the audio or pause the audio depand on last state. the flag is global variable that give me control of the 
  two positions of  --> play and pause.
  @returns void

*/

function buttonOfAlbumInsidePlayerIsClicked(){
	counter_clicks_song++; // in order to make equal 2 double clicks on the same song 
	if(flag){ //  player stopped
		audio.pause();
		stopSpinAlbumAndSetPlayIcon();
		addPauseIconAndBoldToSongNameClicked($('#list_of_songs li').eq(index_song_clicked)); // change icon of song name to pause
		flag = false;
	}else{ // player continue
		audio.play();
		continueSpinAlbumAndSetPauseIcon();
		addPlayIconAndBoldToSongNameClicked($('#list_of_songs li').eq(index_song_clicked)); // change icon of song name to play
		flag = true;
	}
}

/**

  @function updateIsClicked - when there is a click if validattion o.k. ,update obj album arr, do post request so save changes
  of the album name or pic, do another post request to get the songs and launch songs playlist window with their values, and do
  on method to inputs. 
  @param album_id
  @returns void

*/

function updateIsClicked(album_id){
	var headline_edit_playlist_songs = 'Edit Playlist Songs'; //headline in edit mode
	updateObjAlbumInArrAlbums();
	var data = arr_albums[album_id_index];
	var url = "http://localhost/playlist/api/playlist/" +  album_id;
	postRequestToApi(url,data);
	appendPlaylistSongsWindowToBody(headline_edit_playlist_songs);
	var url2 = "http://localhost/playlist/api/playlist/"+ album_id +"/songs";
	$.get(url2,function(obj){
		appendInputsAndLabelsForPlaylistSongsWindow(obj.data.songs.length);
		setInputsValuesInPlaylistSongs(obj);
		onMethodsInEditPlaylistSongs(album_id);
	});
}

/********* Click Operations *************/


/********* On Methods Operations *************/

/**

  @function onMethodsInInitLoad - 'listen' to diffrents events when the program just first start 
  @param i
  @returns void

*/

function onMethodsInInitLoad(i){
	$('#input_search').on("keyup",function(){ albumSearch(this); });
	$('#container_picture_plus').on("click",function(){
		clearDomFromAllClassModal(); // clear modal from last time
		loadAddNewPlaylistWindow(); // onMethod click to add
	});
	$('.button_play_of_album').eq(i).on("click",function(){  playAlbum(this);  }); //onMethod to play album
	$('.button_delete_album_inside_album').confirmation(); // r u sure u want to delete?
	$('.button_delete_album_inside_album').on("click",function(){
	deleteAlbum(this); }); // onMethod to delete album
	$('.button_edit_album_inside_album').eq(i).on("click",function(){
	clearDomFromAllClassModal() // clear modal from last time;
	editAlbum(this);
	}); //onMethod click to edit 
}

/**

  @function onMethodClickToAllSongsNames - 'listen' to clicks event when there is click on song name 
  @param album_id_index
  @returns void

*/

function onMethodClickToAllSongsNames(album_id_index){
	for (var i = 0; i < $('#list_of_songs li').length; i++) {
	   $('#list_of_songs li').eq(i).on('click',function(){ clickOnSongName(this,album_id_index); });
	}
}

/**

  @function onMethodMouseoverToSongsNamesNotPlaying - 'listen' to mouseover event when there is mouse over on song name 
  @returns void

*/

function onMethodMouseoverToSongsNamesNotPlaying(){
	for (var i = 0; i < $('#list_of_songs li').length; i++) {
	   $('#list_of_songs li').eq(i).on('mouseover',function(){ mouseOverOnSongName(this); });
	}
}

/**

  @function onMethodMouseoutToSongsNamesNotPlaying - 'listen' to mouseout event when there is mouse out from song name 
  @returns void

*/

function onMethodMouseoutToSongsNamesNotPlaying(){
	for (var i = 0; i < $('#list_of_songs li').length; i++) {
	   $('#list_of_songs li').eq(i).on('mouseout',function(){ mouseOutOnSongName(this); });
	}
}

/**

  @function onMethodKeyUpAllSongsUrlInputs - 'listen' to keyup event when there is key up on url inputs 
  @returns void

*/

function onMethodKeyUpAllSongsUrlInputs(){
	for (var i = 0; i < $('.new_input_song_url').length; i++) {
		$('.new_input_song_url').eq(i).on('keyup',function(){  onMethodMouseOutAllSongsUrlInputs(this);  });
	}
}

/**

  @function onMethodMouseOutAllSongsUrlInputs - 'listen' to mouseout event when there is mouse out from url inputs 
  @param input_song_url
  @returns void

*/

function onMethodMouseOutAllSongsUrlInputs(input_song_url){
	for (var i = 0; i < $('.new_input_song_url').length; i++) {
    	$('.new_input_song_url').eq(i).on('mouseout',function(){ validateWhenMouseOutInUrl(input_song_url); });
    }
}

/**

  @function onMethodsInPlayAlbum - 'listen' to diffrents events inside the player  
  @param album_id_index
  @returns void

*/

function onMethodsInPlayAlbum(album_id_index){
	$('.button_delete_album_inside_player').confirmation();  // u sure u want to delete?
	$('.button_delete_album_inside_player').on("click",function(){ 
	deleteAlbum(this); }); // onMethod to delete album
	$('audio').on('pause',function(){ playerIsClickedPause(); }); // song paused
	$('audio').on('play',function(){ playerIsClickedPlay(); }); // song clicked play
	$('audio').on('ended',function(){ songEnded(album_id_index); }); // song ended
	onMethodClickToAllSongsNames(album_id_index);
	onMethodMouseoverToSongsNamesNotPlaying();
	onMethodMouseoutToSongsNamesNotPlaying();
	$('.button_of_album_inside_player').on('click',function(){ buttonOfAlbumInsidePlayerIsClicked(); });
	$('.button_edit_album_inside_player').on("click",function(){
	clearDomFromAllClassModal() // clear modal from last time;
	editAlbum(this);
	}); //onMethod to edit click
}

/**

  @function onMethodsInEditPlaylistWindow - 'listen' to diffrents events on edit mode inside the playlist window
  @param album_id
  @returns void

*/

function onMethodsInEditPlaylistWindow(album_id){
	$('#input_playlist_url').on('keyup',function(){ changeValidUrlPreviewAlbumPic(); });
	$('#button_reset').on('click',function(){ resetInputFields(); });
	$('#button_next').on('click',function(){ validateButtonNextClicked('edit',album_id); });
}

/**

  @function onMethodsInEditPlaylistSongs - 'listen' to clicks events on edit mode inside the playlist songs window
  @param album_id
  @returns void

*/

function onMethodsInEditPlaylistSongs(album_id){
	onMethodKeyUpAllSongsUrlInputs();
	$('#button_add_song').on('click',function(){ appendInputsAndLabelsForPlaylistSongsWindow(1); });
	$('#button_finish_save').on('click',function(){ validateButtonFinishClicked('edit','',album_id); });
}

/**

  @function onMethodsInAddPlaylistSongs - 'listen' to clicks events on add mode inside the playlist songs window
  @param obj_data
  @returns void

*/

function onMethodsInAddPlaylistSongs(obj_data){
	onMethodKeyUpAllSongsUrlInputs();
	$('#button_add_song').on('click',function(){ appendInputsAndLabelsForPlaylistSongsWindow(1); });
	$('#button_finish_save').on('click',function(){ validateButtonFinishClicked('add',obj_data); });
}

/**

  @function onMethodsInAddPlaylistWindow - 'listen' to diffrents events on add mode inside the playlist window
  @returns void

*/

function onMethodsInAddPlaylistWindow(){
	$('#button_reset').on('click',function(){ resetInputFields(); });
	$('#input_playlist_url').on('keyup',function(){ changeValidUrlPreviewAlbumPic(); });
	$('#button_next').on('click',function(){ validateButtonNextClicked('add'); });
}


/********* On Methods Operations *************/



/********* Validations Operations *************/

/**

  @function isValidUrlPic - validation of the url picture of the album with regex
  @returns boolean

*/

function isValidUrlPic(){
	var input_playlist_url = $('#input_playlist_url').val();
	var regular_url_pattern = /^(https?:\/\/.*\.(?:gif|jpg|jpeg|tiff|png))$/;
	var res = regular_url_pattern.test(input_playlist_url);
    return res;
}

/**

  @function isValidUrlMp3 - validation of the url mp3 song with regex
  @param song_input_ids
  @returns boolean

*/

function isValidUrlMp3(song_input_id){
	var input_playlist_url = $('.new_input_song_url').eq(song_input_id).val();
	var regular_url_pattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?\/=]+\.mp3$/i;
	var res = regular_url_pattern.test(input_playlist_url);
    return res;
}

/**

  @function isValidUrlsMp3 - validation of the urls mp3 song that not empty inputs with regex
  @param input
  @returns boolean

*/

function isValidUrlsMp3(input){
	for (var i = 0; i < input.length; i++){
		var is_input_empty = isInputEmpty(input.eq(i).val());
		if(!is_input_empty){ //if not empty only than check validation pattern
			var song_url_input_id = $(input).eq(i).attr("data-song_url_id");
			var is_valid_url_song = isValidUrlMp3(song_url_input_id);
			if(is_valid_url_song == true){
				continue;
			}else{
				return false;
			}
		}
	}
	return is_valid_url_song;
}

/**

  @function isInputEmpty - validation is input empty ?
  @param input_val
  @returns boolean

*/

function isInputEmpty(input_val){
	if(input_val == ''){
		return true;
	}else{
		return false;
	}
}

/**

  @function isAllTwoPairsOfInputsEmpty - validation of two pairs of --> url song and song name that they are not empty 
  @param input_url,input_name
  @returns boolean

*/

function isAllTwoPairsOfInputsEmpty(input_url,input_name){
	for (var i = 0; i < input_url.length; i++){
		var is_input_url_empty = isInputEmpty(input_url.eq(i).val());
		var is_input_name_empty = isInputEmpty(input_name.eq(i).val());
		
		if(is_input_url_empty == true && is_input_name_empty == true){
			continue;
		}else{
			return false;
		}
	}
	return true;
}

/**

  @function isTherePairOfInputsThatOnlyOneIsFilled - validation that check pairs song url and song name and check if only
  one is filled, i am doing also css style to the border of the song name to indicate if misiing name for the user,
  i dont need to do to the url song because there is separate logic validation to it.  
  @returns boolean

*/

function isTherePairOfInputsThatOnlyOneIsFilled(){
	for (var i = 0; i < $('.new_input_song_url').length; i++) {
				
		for (var k = i; k < $('.new_input_song_name').length; k++){
			
			if( ($('.new_input_song_url').eq(i).val() != '' &&  $('.new_input_song_name').eq(k).val() == '') ){                            
				$('.new_input_song_name').eq(k).css("border","red solid 1px");  // url missing name become red, to url there is spesific check. 
				return true;
			}
			if( ($('.new_input_song_url').eq(i).val() == '' &&  $('.new_input_song_name').eq(k).val() != '') ){
				$('.new_input_song_name').eq(k).css("border","gray solid 1px");  // url not missing name become gray, to url there is spesific check. 
				return true;
			}
			break;
		}
	}
	return false;
}

/**

  @function validateButtonFinishClicked - validate if all the inputs empty, validate if in pairs of inputs only one of them
  is filled, validate if the url mp3 pattern is o.k.  ---> both in add mode or edit mode. if validation is not o.k. do css style
  according to logic and show error message according to the issue.
  @param flag,obj_data,album_id 
  @returns void

*/

function validateButtonFinishClicked(flag,obj_data,album_id){
	var is_all_inputs_empty = isAllTwoPairsOfInputsEmpty($('.new_input_song_url'),$('.new_input_song_name'));
	if(is_all_inputs_empty){
		$('#button_finish_save').attr("data-dismiss", '');
		showErrorMessage($('#error_playlist_songs_url_message'),'One song url field must be filled, try again !');
		showErrorMessage($('#error_playlist_songs_name_message'),'One song name field must be filled, try again !');
		$('#error_playlist_songs_url_message').css("visibility","visible");
		$('#error_playlist_songs_name_message').css("visibility","visible");
	}else{

		var pairs_not_the_same  = isTherePairOfInputsThatOnlyOneIsFilled(); // one pairs empty the other not
		if(pairs_not_the_same){
			$('#error_playlist_songs_url_message').css("visibility","hidden");
			$('#error_playlist_songs_name_message').css("visibility","hidden");
			$('#button_finish_save').attr("data-dismiss", '');
			showErrorMessage($('#error_playlist_songs_url_message'),'Both url and name fields must be filled, try again !');
			$('#error_playlist_songs_url_message').css("visibility","visible");
		}else{ // both fields are not empty

			var is_valid_url = isValidUrlsMp3($('.new_input_song_url'));
			if(is_valid_url){
				if(flag=='add'){  // in add mode
					CreateNewAlbum(obj_data);			
					$('#button_finish_save').attr("data-dismiss", 'modal');
				}	
				if(flag=='edit'){ // in edit mode
					updatePlaylistSongs(album_id);
					$('#button_finish_save').attr("data-dismiss", 'modal');
				}
			}else{  // url not valid
				$('#button_finish_save').attr("data-dismiss", '');
				$('#error_playlist_songs_url_message').css("visibility","visible");
				showErrorMessage($('#error_playlist_songs_url_message'),'Song url pattern is not valid, try again !');
			}
		}
	}
}

/**

  @function validateButtonNextClicked - validate in playlist window, is input empty,is name less than 20 chars, and is url picture o.k using regex
  both in add mode or edit mode. if validation is not o.k. do css style according to logic and show error message according to the issue.  
  @param flag,album_id,headline_edit_playlist
  @returns void

*/

function validateButtonNextClicked(flag,album_id,headline_edit_playlist){
	var is_playlist_name_empty = isInputEmpty($('#input_playlist_name').val());
	
	if(is_playlist_name_empty){
		$('#button_next').attr("data-dismiss", '');
		showErrorMessage($('#error_playlist_message'),'Playlist name is empty, try again !');
		$('#error_playlist_message').css("visibility","visible");
		$('#input_playlist_name').css("border","red solid 1px");
	}else{
		
		if( $('#input_playlist_name').val().length < 20){ // i decided that there will be a limit to length of the song name (20 chars)

			$('#input_playlist_name').css("border","gray solid 1px");
			$('#button_next').attr("data-dismiss", 'modal');
			var is_valide_url = isValidUrlPic();
			if(is_valide_url){
				if(flag=='add'){
					buttonNextPlaylistWindowIsClicked();
				}	
				if(flag=='edit'){
					updateIsClicked(album_id,headline_edit_playlist);
				}
			}else{
				showErrorMessage($('#error_playlist_message'),'Url pattern is not valid, try again !');
				$('#error_playlist_message').css("visibility","visible");
				$('#button_next').attr("data-dismiss", '');
				$('#input_playlist_url').css("border","red solid 1px");
			}	
		
		}else{
			showErrorMessage($('#error_playlist_message'),'Name must be less than 20 chars !');
			$('#error_playlist_message').css("visibility","visible");
			$('#button_next').attr("data-dismiss", '');
			$('#input_playlist_name').css("border","red solid 1px");
		}
	}
}

/**

  @function validateWhenMouseOutInUrl - validate in playlist songs window, is url input valid using regex when mouse cursor is out of the input.
  if validation is not o.k. do css style according to logic and show error message according to the issue.
  @param input_song_url 
  @returns void

*/

function validateWhenMouseOutInUrl(input_song_url){
	var song_url_input_id = $(input_song_url).attr("data-song_url_id");
	var is_valid_url_song = isValidUrlMp3(song_url_input_id);
	if(is_valid_url_song){
		$('#error_playlist_songs_url_message').css("visibility","hidden");		
		$('.new_input_song_url').eq(song_url_input_id).css("border","gray solid 1px")
		$('#button_finish_save').attr("data-dismiss", 'modal');
	}else{
		showErrorMessage($('#error_playlist_songs_url_message'),'Song url pattern is not valid, try again !');
		$('#error_playlist_songs_url_message').css("visibility","visible");
		$('.new_input_song_url').eq(song_url_input_id).css("border","red solid 1px")
		$('#button_finish_save').attr("data-dismiss", '');
	}
}

/********* Validations Operations *************/




/********* Append Childs Operations *************/

/**

  @function appendPlayerAfterHeader - create the player and all childs elements inside him and put it afrer the header on DOM.
  also set the songs in arr.
  @param obj,album_id_index
  @returns void

*/

function appendPlayerAfterHeader(obj,album_id_index){
	
	$('header').after('<div id="container_audio_ol_plus_album_image">' 

							+ '<div id="container_audio_plus_ol">'
                            						
								+ '<audio id="audio_player" controls> </audio>' 
							
								+ '<div id="container_of_song_name_playing"> NOW PLAYING : '

									+  obj.data.songs[0].name

								+ '</div>' 
								
								+ '<ol id="list_of_songs"> </ol>'

                            + '</div>'
                   	

							+ '<div class="container_image_in_player spin">'

								+ '<img class="rounded-circle album_image" src="' + arr_albums[album_id_index].image + '">'

								+ '<button class="button_of_album_inside_player rounded-circle" type="button">'

									+ '<i class="fa fa-pause" aria-hidden="true"></i>' 

								+ '</button>'

							+ '</div>'

							+ '<button data-deleteid="' + album_id + '" class="button_delete_album_inside_player  rounded-circle" data-toggle="confirmation" type="button">'	

								+ '<i class="fa fa-times" aria-hidden="true"></i>'

							+ '</button>'

							+ '<button data-editid="' + album_id + '" class="button_edit_album_inside_player rounded-circle" data-toggle="modal" data-target="#my_modal_playlist" type="button">'	

								+ '<i class="fa fa-pencil" aria-hidden="true"></i>'

							+ '</button>'

					 +'</div>'); 

	
	for (var i = 0; i < obj.data.songs.length; i++){
		$('#list_of_songs').append('<li class="li_names_of_song_not_playing"><span>' + obj.data.songs[i].name + '</span></li>');
		setSongInArrays(obj,i);
	}
}

/**

  @function appendInputsAndLabelsForPlaylistSongsWindow - append all inputs and lables in songs playlist window depends on param
  that been send to the function, this determine the number of times it will add into the DOM.
  @param number_of_divs
  @returns void

*/

function appendInputsAndLabelsForPlaylistSongsWindow(number_of_divs){
	
	var random_number = Math.floor(Math.random() * 100000); // i want random number so the id of every input will be diffrent so the label when clicked will be focus the right input
	
	for(var i = 0; i < number_of_divs; i++){
		$('#button_add_song').before('<div class="mt-5">'

										 + '<label for="url_'+ random_number + '" class="new_label_url">Song URL :</label>'

										 + '<input data-song_url_id="'+ i +'" class="new_input_song_url url_input" type="text" id="url_'+ random_number + '">'
										
										 + '<label for="name_'+ random_number + '" class="new_label_song_name">Name :</label>'
										
										 + '<input data-song_name_id="'+ i +'" class="new_input_song_name name_input" type="text" id="name_'+ random_number + '">'

									 + '</div>');
		random_number++; // counter plus so the id number will be difrrent every loop
	}
}

/**

  @function appendPlaylistSongsWindowToBody - create the playlist songs window and put on DOM, both for add mode or edit mode.
  @param headline
  @returns void

*/

function appendPlaylistSongsWindowToBody(headline){

	$('body').append('<div class="modal fade show" id="my_modal_songs">'

							+ '<div class="modal-dialog modal-dialog-centered modal-lg">'

								+ '<div class="modal-content">'

									+ '<div class="modal-header">'

										+ '<h3 class="modal-title">' + headline + '</h3>'

										+ '<button type="button" class="close" data-dismiss="modal">&times;</button>'

									+ '</div>'

									+ '<div class="modal-body" id="modal_body_add_songs">'

										+ '<button type="button" id="button_add_song">'
	     
	   										+ '<i class="fa fa-plus-circle" aria-hidden="true"></i> Add another song'

	   									+ '</button>'

	   									+ '<p id="error_playlist_songs_url_message"> </p>'

	   									+ '<p id="error_playlist_songs_name_message"> </p>'

	   									+ '<input type="button" class="btn btn-primary" data-dismiss="modal" id="button_finish_save" value="FINISH & SAVE">'

									+ '</div>'
								
								+ '</div>'							

							+ '</div>'	

						+ '</div>');

}

/**

  @function appendPlaylistWindowToBody - create the playlist window and put on DOM, both for add mode or edit mode.
  @param headline,button
  @returns void

*/

function appendPlaylistWindowToBody(headline,button){
	
	$('body').append('<div class="modal fade show" id="my_modal_playlist">'

						+ '<div class="modal-dialog modal-dialog-centered">'

							+ '<div class="modal-content">'

								+ '<div class="modal-header">'

									+ '<h3 class="modal-title">' + headline + '</h3>'

									+ '<button type="button" class="close" data-dismiss="modal">&times;</button>'

								+ '</div>'

								+ '<div class="modal-body" id="modal_body_add_playlist">'

									+ '<label for="input_playlist_name" id="label_playlist_name">Playlist Name</label>'

									+ '<input id="input_playlist_name" type="text" placeholder="e.g. Blood Sugar Magic">'

									+ '<label for="input_playlist_url" id="label_playlist_url">Playlist Url</label>'

									+ '<input id="input_playlist_url" type="text" placeholder="http://">'

									+ '<p id="error_playlist_message"> </p>'

									+ '<img id="preview_album_image" src="pictures/preview.png">'

									+  button

									+ '<input type="button" class="btn btn-primary" id="button_reset" value="RESET FIELDS">'

								+ '</div>'
							
							+ '</div>'							

						+ '</div>'	

					+ '</div>');
												
}

/********* Append Childs Operations *************/





































