var topics = ['Dragon Ball Z', 'Full Metal Alchemist', 'Project A-Ko', 'Mobile Suit Gundam', 'Naruto Shippuden', 'Ghost in the Shell', 'One Punch Man', 'Kill la Kill'];

appendButtons();
attachClickEvent();


// gif generator button
$('#makeBtn').click(function(){
	                                                                
	var newButton = $('#btnInput').val();
	topics.push(newButton);
	
	appendButtons();
	attachClickEvent();
	return false;
});

// click for gif action/still
$(document).on('click', 'img', function(){
	var src = $(this).attr('src');
	var active = $(this).attr('data-active');
	var still = $(this).attr('data-still');

	if (src == still){
		$(this).attr('src', active);
	}
	else{
		$(this).attr('src', still);
	}
});

// click to initiate submission of search data to API
function attachClickEvent(){
	$('.gifBtn').click(function(){
		var q = $(this).text(),
			api = "http://api.giphy.com/v1/gifs/search?";
			
		$('#gif-area').empty();

		api += $.param({
			'q' : q,
			'rating' : 'pg',
			'limit' : 10,
			'api_key' : 'dc6zaTOxFJmzC'
		});
		
		$.ajax({url: api, method: "GET"})
		.done(function(info){
			
			for (var i=0; i<info.data.length; i++){
				var gif = info.data[i].images.original.url;
				var stillGif = info.data[i].images.original_still.url;
				var rating = info.data[i].rating;	

				$('#gif-area').append('<section class="col-md-4 gif"><h3 id="rating">Rating: ' + rating + '</h3><img data-active="' + 
								gif +'" data-still="'+ stillGif +'" src="' + stillGif + '" /></section>');
				$('img').addClass('img img-responsive');
			}
		});
	});
}

// append buttons function
function appendButtons(){

	$('#button-area').empty();
	
	for (var i=0; i<topics.length; i++){
		$('#button-area').append('<button class="gifBtn btn btn-primary btn-lg">' + topics[i] + '</button>');
	}
} 


 


