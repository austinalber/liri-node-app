# liri-node-app

## Overview

LIRI is a Language Interpretation and Recognition Interface. It will be run through a command line node app that takes in parameters and gives the user back data in an organized method. LIRI will be supplied with two inputs, a method to determine the action the program will follow, and an input value that will be used in the search engine API's. The methods included are:

1. Search Spotify's API for song information.
2. Search tvmaze.com for upcoming events at concert venues
3. Use OMBD's database to search for movie information.

The program will only run a maxiumum of three functions for each run-through. The program will begin by taking the user inputs from the initial terminal submission, and follow a switch statement to determine which function will be called upon.

## Usage

In order for the user to correctly use this program, they must first have their terminal loaded in the same directory as the 'liri.js' file. Once this is done the user can use node to run the application. In order for the user to run the application through node, the user must enter 'node liri.js' followed by a method and then an input.

For method selection, the user has the option to choose between four different functions. They include:

1. "concert-this": Search 'Band in Town' API for artist event info
2. "spotify-this-page': Show information about a song from spotify's API
3. "movie-this": Show information about a movie from OMDB's API
4. "do-what-it-says": Takes information from 'random.txt' and runs whatever function is specified in the .txt file.

Following the method input, the user must enter value that cooresponds to the method selected. The user has the ability to input spaces between first and last names along with spaces between words in song titles and movie titles. The spaces in the terminal will be automatically changed so the input can be entered into a URL without error.

## Resources

### Images

* [Concert This](./images/concert-this.png)
* [Do What It Says](./images/do-what-it-says.png)
* [Movie This](./images/movie-this.png)
* [Spotify This Song](./images/spoitfy-this.png)



### GitHub Repository

* https://github.com/austinalber/liri-node-app

### Technologies Utilized

In this application, it was required to install multiple node packages. They include:

1. node-spotify-api
2. moment
3. axios
4. fs

## My Role

My role in this application was focused on creating the logic to ensure all functions run correctly after user inputs are recieved. All API and node packages were supplied for this application, but no code structure was given. 

My job in the development of this application was to psuedo-code a potential structure for the application once the assignment was presented in class. I believed the most efficient method of creating the application was to have pre-defined functions for each method and a switch statement to easily separate conditions.

At the conclusion of the project, I determined that the switch statement followed by pre-defined functions was the most efficient structure that I was capable of creating with my current knowledge. However, in future updates, updating the user inputs with the node package: 'inquirer' would be a much more visually pleasing solution and it would also allow the user to use arrow keys to switch between functions rather than typing out the method name each runthrough.