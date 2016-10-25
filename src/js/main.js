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


$("form").submit(function (event) {
	event.preventDefault();

	var searchQuery = $("#query").val();
	$(".searchresults").html("")
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
	$(".stream-container").click(audioTemplate);
}


function audioTemplate (event) {
	console.log(event);
	var audioHtml = `
	    <audio controls="controls" class="audio" autoplay>
			<source src="${event.currentTarget.dataset.streamUrl}?client_id=${CLIENT_ID}"></source>
        </audio>
	`;
	$(".audio-container").html(audioHtml);

}



function searchTemplate (song) {
	console.log(song);
	if(song.artwork_url === null){
		song.artwork_url = "http://fillmurray.com/100/100"
	}
	return `
	<div class="results">

		
		<div class="stream-container" data-stream-url="${song.stream_url}"><img src="${song.artwork_url}" class="art">
		<div class="songtitle">${song.title}</div>
		</div>

	</div>
	`;
}