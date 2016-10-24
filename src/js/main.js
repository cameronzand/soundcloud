import $ from 'jquery';
import CLIENT_ID from './clientid';

//console.log(id);



function getTrack (searchTerm) {
  return $.ajax({
    url: `http://api.soundcloud.com/tracks`,
    data: {
    	client_id: CLIENT_ID,
    	q: searchTerm
    }
  });
};

getTrack("weezer").then(addToPage);

$("#search-button").click(function (event) {
	event.preventDefault();

	var searchQuery = $("#query").val();
	getTrack(searchQuery).then(addToPage);

	console.log(searchQuery);
	// get the user input
	// run that through getTrack
	// then put the results on the page
})





function addToPage (songs) {
	//console.log(songs);
	for (var i = 0; i < songs.length; i++) {
	    var itemHtml = searchTemplate(songs[i]);
 		$(".searchresults").append(itemHtml);
	}
}



function searchTemplate (song) {
	//console.log(song);

	return `
	<div class="results">

		
		<img src="${song.user.avatar_url}">

	</div>
	`;
}