// node modules to run the program

var keys = require("./keys.js");
var twitterKeys = keys;

var fs = require("fs");
var twitter = require("twitter");
var request = require("request");
var spotify = require ("node-spotify-api");


// twitter function

	if (process.argv[2] === "my-tweets") {
	myTweets();
}

function myTweets() {

	var client = new twitter(twitterKeys);

	var params = { screen_name: 'EmilyFritz_', count: 5 };

	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		if (!error) {
		    var data = [];
		    for (var i = 0; i < tweets.length; i++) {
		        
		        data.push({
		            'Date: ' : tweets[i].created_at,
		            'Tweet: ' : tweets[i].text,
	        	});
		    }
				console.log(data);
		}
	});

}


// spotify function

	if (process.argv[2] === "spotify-this-song") {
	spotifyThisSong();
}

function spotifyThisSong() {

	var spotifyId = new spotify({
	  id: 'ae9e3cd89cf04d1487247ea45151ff3c',
	  secret: 'cdcfb461f8934795922ab6626a460d40'
	});

	var songName = process.argv[3];
	 
	spotifyId.search({ type: 'track', query: songName }, function(err, data) {

	// console.log(JSON.stringify(data, null, 2));

	  if (err) {
	    return console.log('Error. Try a new track');
	  }
	  else {
	  	console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Preview Track: " + data.tracks.items[0].preview_url);
		   }
	  });
 
};



// omdb function

	if (process.argv[2] === "movie-this") {
	movieThis();
}

function movieThis() {

	var movieName = process.argv[3];

	var movieUrl = 'http://www.omdbapi.com/?t='+movieName+'&apikey=40e9cece';

	request(movieUrl, function (error, response, body) {
		if (error) {
	    return console.log('Error. Try a new movie');
	  }
	  else {

	  	var data = JSON.parse(body);

	  	console.log("Title: " + data.Title);
		console.log("Year Released: " + data.Year);
		console.log("IMDB Rating: " + data.Ratings[0].Value);
		console.log("Rotton Tomatoes Rating: " + data.Ratings[1].Value);
		console.log("Country: " + data.Country);
		console.log("Language: " + data.Language);
		console.log("Plot: " + data.Plot);
		console.log("Actors: " + data.Actors);
		   }
	 
	});
}

// do-what-it-says function


if (process.argv[2] === "do-what-it-says") {
	doWhatItSays();
}








