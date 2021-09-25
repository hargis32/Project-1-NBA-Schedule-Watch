var key = "OdxfzW97A9GgejJGoakDEF76rmEVTHu2";
var searchFoodEl = document.querySelector('#search-food');
var barResultsEl = document.querySelector('#bar-results');
var locationInputEl = document.querySelector('#location-input');
var radiusInputEl = document.querySelector('#radius-input');

function handleLocationFormSubmit(event) {
    event.preventDefault();

    
    var location = locationInputEl.value.trim();
    
    var radius = radiusInputEl.value.trim();
   
        getLocalBar(location, radius);
        // clears out previous search results when performing new search
        barResultsEl.textContent = "";
        // clears input fields when performing new search
        locationInputEl.value = "";
        radiusInputEl.value = "";
    };

var getLocalBar = function (location, radius) {
    
    var apiURL = "https://www.mapquestapi.com/search/v2/radius?origin=" + location +"&radius=" + radius + "&maxMatches=6&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581301&outFormat=json&key=" + key;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
            console.log(data);
            displayBars(data);
        })
        .catch(function (error) {
            alert("Not a valid location or radius");
        });
    }
    });
};

           
var displayBars = function (data) {

   
    var resultsArr = data.searchResults;
    var savedBars = [];
    
    for (var i = 0; i < resultsArr.length; i++) {
        var barName = resultsArr[i].fields.name;
        var barLocation = resultsArr[i].fields.address;
        // format phone number for normal appearance
        var barPhoneNum = resultsArr[i].fields.phone.substring(5,14) + "-" + resultsArr[i].fields.phone.substring(14,18);

        var barNameEl = document.createElement('p');
        barNameEl.textContent = "Name: " + barName;

        var barLocationEl = document.createElement('p');
        barLocationEl.textContent = "Address: " + barLocation;

        var barPhoneNumEl = document.createElement('p');
        barPhoneNumEl.textContent = "Phone Number: " + barPhoneNum;

        var barInfo = document.createElement('div');
        barInfo.appendChild(barNameEl);
        barInfo.appendChild(barLocationEl);
        barInfo.appendChild(barPhoneNumEl);

        barResultsEl.appendChild(barInfo);

        var Bar = {
            name: barName,
            location: barLocation,
            phone: barPhoneNum,
        };
        savedBars.push(Bar);

        

    }
    localStorage.setItem("storedBars",JSON.stringify(savedBars));
};

function init() {
    var retrieveBars = JSON.parse(localStorage.getItem("storedBars"));
    for (var i = 0; i < retrieveBars.length; i++) {
        if (retrieveBars[i] !== null) {
            var barName = retrieveBars[i].name;
            var barLocation = retrieveBars[i].location;
            var barPhoneNum = retrieveBars[i].phone;
            var barNameEl = document.createElement('p');
            barNameEl.textContent = "Name: " + barName;
            var barLocationEl = document.createElement('p');
            barLocationEl.textContent = "Address: " + barLocation;
            var barPhoneNumEl = document.createElement('p');
            barPhoneNumEl.textContent = "Phone Number: " + barPhoneNum;
            var barInfo = document.createElement('div');
            barInfo.appendChild(barNameEl);
            barInfo.appendChild(barLocationEl);
            barInfo.appendChild(barPhoneNumEl);
            barResultsEl.appendChild(barInfo);  
        }
    }
};


searchFoodEl.addEventListener("submit", handleLocationFormSubmit);


const inputDate = document.querySelector("#search-games")

const nbaGames = async function(event) {
    event.preventDefault();
    var gamesEl = document.getElementById('display-games');
    var games = await fetch('https://gy62hh4w41.execute-api.us-east-1.amazonaws.com/default/nbagames');
    var gamesArray = await games.json();
    console.log(userDate);
    // example date
    var userDate = new Date(inputDate.value);
    var gamesForDate = getGamesInDate(userDate, gamesArray);
    console.log("TODAY'S GAMES:", gamesForDate);

    gamesForDate.forEach(game => {
        gamesEl.innerHTML += game.homeTeam.teamName;
        gamesEl.innerHTML += ' vs '
        gamesEl.innerHTML += game.awayTeam.teamName;
        gamesEl.innerHTML += ' '
        gamesEl.innerHTML += game.gameStatusText;
        gamesEl.innerHTML += '<br>'
    });
}

function getGamesInDate(date, games) {
    return games.filter(game => {
        var gameDate = new Date(game.gameDateTimeUTC);
        return date.getFullYear() === gameDate.getFullYear() && date.getMonth() === gameDate.getMonth() && date.getDate() === gameDate.getDate();
    });
}

document.getElementById("games").addEventListener("submit", nbaGames);

init();