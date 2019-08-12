// Require dotenv
require("dotenv").config();

// Imported Files
var keys = require("./keys.js");

// Variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require('axios');
var fs = require("fs");
var request = require("request");

// User Inputs
var method = process.argv[2];
var userInput = process.argv[3];

// Switch Statement for Methods
switch(method) {
    // Search Bands in Town Artits Events API
    case "concert-this":
        concertThis(userInput);
    break;

    // Show Information About the Song in Terminal
    case "spotify-this-song":
        spotifyThisSong(userInput);
    break;

    // Show Information About the Movie in Terminal
    case "movie-this":
        movieThis(userInput);
    break;

    // Take Information From 'random.txt' and use it to Call one of LIRI's Commands
    // Default will run 'spotify-this-song'
    case "do-what-it-says":
        doWhatItSays();
    break;

    // If no Method is Selected
    default:
        console.log("Incorrect selection.");
}

// Functions
function concertThis(userInput) {
    // Use axios to retrieve bandsintown URL
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
    .then(function(response) {
        // For loops to go through all possible entries from response
        for(var i = 0; i < response.data.length; i++) {

            // Save date of event as a variable, and split it into YYYY-MM-DD format
            var date = (response.data[i].datetime).split("T");

            // Display information to terminal
            console.log(
                "--------------------" +
                "\nVenue name: " + response.data[i].venue.name + " " + response.data[i].venue.city + ", " + response.data[i].venue.country +
                "\nDate of event: " + moment(date[0], "YYYY-MM-DD").format("dddd, MMMM Do YYYY") + " at " + moment(date[1], "hh:mm:ss").format("h:mm a") + "\n");
        }
    })
    // Print error if axios grab is unsuccessful
    .catch(function(error) {
        console.log(error);
    });
}

function spotifyThisSong(userInput) {
    // If no userInput is detected, use default song
    if(!userInput) {
        userInput = "The Sign";
    }
    spotify.search({
        type: "track",
        query: userInput
    }).then(function(response) {
        // For loops to go through all possible entries from response
        console.log(response.tracks);
        for(var i = 0; i < 5; i++) {
            // Display song information to terminal
            // console.log(
            //     "--------------------" +
            //     "Artist(s): " + 
            // );
        }
    // If spotify search fails, display error
    }).catch(function(error) {
        console.log(error);
    })
}

function movieThis(userInput) {

}

function doWhatItSays() {

}