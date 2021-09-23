var key = "OdxfzW97A9GgejJGoakDEF76rmEVTHu2";
var searchFoodEl = document.querySelector('#search-food');
var barResultsEl = document.querySelector('#bar-results');
var locationInputEl = document.querySelector('#location-input');
var radiusInputEl = document.querySelector('#radius-input');

function handleLocationFormSubmit(event) {
    event.preventDefault();

    // link id to zipcode/address input
    var location = locationInputEl.value.trim();
    // link id to #-mile-radius input, if we so choose....
    var radius = radiusInputEl.value.trim();
   
        getLocalBar(location, radius);
    };

var getLocalBar = function (location, radius) {
    // need to double check endpoints and paramaters. 581301 refers to code for "Bars" as default restaurant type 
    var apiURL = "https://www.mapquestapi.com/search/v2/radius?origin=" + location +"&radius=" + radius + "&maxMatches=6&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581301&outFormat=json&key=" + key;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
            console.log(data);
            displayBars(data);
        });
    }
    });
};

           
var displayBars = function (data) {

    // grab search results from returned data and put into its own var
    var resultsArr = data.searchResults;
    //
    
    for (var i = 0; i < resultsArr.length; i++) {
        var barName = resultsArr[i].fields.name;
        var barLocation = resultsArr[i].fields.address;
        var barPhoneNum = resultsArr[i].fields.phone;

        var barNameEl = document.createElement('p');
        barNameEl.textContent = barName;

        var barLocationEl = document.createElement('p');
        barLocationEl.textContent = barLocation;

        var barPhoneNumEl = document.createElement('p');
        barPhoneNumEl.textContent = barPhoneNum;

        var barInfo = document.createElement('div');
        barInfo.appendChild(barNameEl);
        barInfo.appendChild(barLocationEl);
        barInfo.appendChild(barPhoneNumEl);

        barResultsEl.appendChild(barInfo);

    }
};



searchFoodEl.addEventListener("submit", handleLocationFormSubmit);

