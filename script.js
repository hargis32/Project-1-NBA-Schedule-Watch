var key = "OdxfzW97A9GgejJGoakDEF76rmEVTHu2"

function handleLocationFormSubmit(event) {
    event.preventDefault();

    // link id to zipcode/address input
    var locationInputVal = document.querySelector('#location-input').value;
    // link id to #-mile-radius input, if we so choose....
    var radiusInputVal = document.querySelector('#radius-input').value;
    if (location) {
        getLocalBar(location);
    }
    else if (!locationInputVal) {
        console.error('Not a valid address. Please try again.');
    }
    else if (!radiusInputVal) {
        console.error('Not a valid radius. Please enter number');
    }
    return;
};

var getLocalBar = function (locationInputVal, radiusInputVal) {
    // need to double check endpoints and paramaters. 581301 refers to code for "Bars" as default restaurant type 
    var apiURL = "http://www.mapquestapi.com/search/v2/radius?origin=" + locationInputVal + "&radius=" + radiusInputVal + "maxMatches=6&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581301&outFormat=json&key=" + key;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data)
                    displayBars(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })

};

var displayBars = function () {
    var mapEl = document.getElementById('map');

    var name = document.createElement('p');
    name.textContent(response.searchResults.fields.name);

    var location = document.createElement('p');
    location.textContent(response.searchResults.fields.address);

    var phoneNum = document.createElement('p');
    phoneNum.textContent(response.searchResults.fields.phone);

    mapEl.appendChild(name);
    mapEl.appendChild(location);
    mapEl.appendChild(phoneNum);
};
// YOU NEED TO CREATE A SELECTOR FOR THIS ELEMENT.
// searchformEl.addEventListener("submit", handleLocationFormSubmit);



/*
    GAMES CODE ===============================
*/

// global variable holds all games
var gamesArray;

// Get all the games and put in array
async function getGames() {
    var games = await fetch('https://gy62hh4w41.execute-api.us-east-1.amazonaws.com/default/nbagames');
    gamesArray = await games.json();
}

var gamesFormEl = document.querySelector("#form-games");
gamesFormEl.addEventListener("submit", searchGames);

function searchGames(event) {
    event.preventDefault();

    // get date from form text field
    var dateValue = document.querySelector("#search-games").value;
    // create date from text field
    var userDate = new Date(dateValue);
    // call function to filter games
    var gamesForDate = getGamesInDate(userDate, gamesArray);
    // do something with data (create some dom nodes)
    console.log("TODAY'S GAMES:", gamesForDate);

    // HERE'S WHERE YOU WOULD TAKE gamesForDate AND OUTPUT/RENDER TO DOM
}

// filters games array by date
function getGamesInDate(date, games) {
    return games.filter(game => {
        var gameDate = new Date(game.gameDateTimeUTC);
        return date.getFullYear() === gameDate.getFullYear() && date.getMonth() === gameDate.getMonth() && date.getDate() === gameDate.getDate();
    });
}

// initialize get games to fetch all games
getGames();