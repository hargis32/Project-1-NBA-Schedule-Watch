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

    }
};



searchFoodEl.addEventListener("submit", handleLocationFormSubmit);

