require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

switch (search) {
    case "concert-this":
        var concertUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
        axios.get(concertUrl)
            .then(function (res) {
                console.log(res.data[0].venue.name);
                console.log(res.data[0].venue.city);
                console.log(res.data[0].datetime);
            })
        break;
    case "spotify-this-song":
        spotify
            .search({
                type: "track",
                query: term
            })
            .then(function (res) {
                console.log(res.tracks.items[0].artists[0].name);
                console.log(res.tracks.items[0].name);
                console.log(res.tracks.items[0].preview_url);
                console.log(res.tracks.items[0].album.name);

            })
            .catch(function (err) {
                console.log(err);
            });
        break;

    case "movie-this":
        var movieUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy"
        axios.get(movieUrl)
            .then(function (res) {
                console.log(res.data.Title);
                console.log(res.data.Year);
                console.log(res.data.imdbRating);
                console.log(res.data.Ratings[1].Value);
                console.log(res.data.Country);
                console.log(res.data.Language);
                console.log(res.data.Plot);
                console.log(res.data.Actors);
            })
        break;
    case "do-what-it-says":
        fs.readFile('random.txt', "utf8", (err, data) => {
            var dataArr = data.split(",");
            console.log(dataArr);
            var switcherino = dataArr[0];
            var term = dataArr[1];
            
            switch (switcherino) {
                case "concert-this":
                    term = term.substring(1, term.length - 1);
                    var concertUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
                    console.log(concertUrl);
                    axios.get(concertUrl)
                        .then(function (res) {
                            console.log(res.data[0].venue.name);
                            console.log(res.data[0].venue.city);
                            console.log(res.data[0].datetime);
                        })
                    break;
                case "spotify-this-song":
                    spotify
                        .search({
                            type: "track",
                            query: term
                        })
                        .then(function (res) {
                            console.log(res.tracks.items[0].artists[0].name);
                            console.log(res.tracks.items[0].name);
                            console.log(res.tracks.items[0].preview_url);
                            console.log(res.tracks.items[0].album.name);

                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    break;

                case "movie-this":
                    var movieUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy"
                    axios.get(movieUrl)
                        .then(function (res) {
                            console.log(res.data.Title);
                            console.log(res.data.Year);
                            console.log(res.data.imdbRating);
                            console.log(res.data.Ratings[1].Value);
                            console.log(res.data.Country);
                            console.log(res.data.Language);
                            console.log(res.data.Plot);
                            console.log(res.data.Actors);
                        })
                    break;
            }

        });
        break;
}