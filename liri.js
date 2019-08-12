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

// User Inputs
var method = process.argv[2];
var userInput = process.argv[3];

// If input is greater than one word, compress into one string
inputCheck();

// Run LIRI function
LIRI();

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
        console.log("\nNo 'user input' detected. Displaying default song: 'The Sign'\n");
    }
    spotify.search({
        type: "track",
        query: userInput
    }).then(function(response) {
        // For loops to go through all possible entries from response
        for(var i = 0; i < 3; i++) {
            // Display song information to terminal
            console.log(
                "--------------------" +
                "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                "\nSong name: " + response.tracks.items[i].name +
                "\nLink to song: " + response.tracks.items[i].preview_url +
                "\nAlbum: " + response.tracks.items[i].album.name + "\n"
            );
        }
    // If spotify search fails, display error
    }).catch(function(error) {
        console.log(error);
    })
}

function movieThis(userInput) {
    // If no userInput is detected, use default song
    if(!userInput) {
        userInput = "Mr. Nobody";
        console.log("\nNo 'user input' detected. Displaying default movie: 'Mr. Nobody'\n");
    }

    // Use axios to retrieve bandsintown URL
    axios.get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        // Display information to terminal
        console.log(
            "\n--------------------" +
            "\nMovie Title: " + response.data.Title +
            "\nRelease Year: " + response.data.Year +
            "\nIMDB rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
            "\nCountry Produced in: " + response.data.Country +
            "\nLanguage: " + response.data.Language + 
            "\nMovie Plot: " + response.data.Plot +
            "\nActors in Movie: " + response.data.Actors + "\n");
    })
    // Print error if axios grab is unsuccessful
    .catch(function(error) {
        console.log(error);
    });
}

function doWhatItSays() {
    // Use fs to read 'random.txt' and retieve data as a string
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }
        // Split the data retrieved from 'random.txt' into an array
        var dataArr = data.split(',');

        // Switch statement to determine method from 'random.txt'
        switch(dataArr[0]) {
            case "concert-this":
                concertThis("Rock");
            break;
            case "spotify-this-song":
                spotifyThisSong(dataArr[1]);
            break;
            case "movie-this":
                movieThis();
            break;
            default:
                console.log("\nNo method detected from 'random.txt' file.\n")
        }
        spotifyThisSong(dataArr[0], dataArr[1]);
    })
}

function inputCheck() {
    if(process.argv.length > 4) {
        for(var i = 4; i < process.argv.length; i++) {
            userInput = userInput + "+" + process.argv[i];
        }
    }
    return userInput;
}

function LIRI() {
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

        // If no method is selected, display error to user and show potential methods
        default:
            console.log(
                "\nIncorrect selection. Please choose from one of the following methods:\n" + 
                "\n*  concert-this" + "\n*  spotify-this-song" + "\n*  movie-this" + "\n*  do-what-it-says\n");
    }
}