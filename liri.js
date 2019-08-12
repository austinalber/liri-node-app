// Require dotenv
require("dotenv").config();

// Imported Files
var keys = require("./keys.js");

// Variables
var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
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
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
};

function spotifyThisSong(userInput) {

};

function movieThis(userInput) {

};

function doWhatItSays() {

};