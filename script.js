

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
    else (!radiusInputVal) {
        console.error('Not a valid radius. Please enter number');
    }
        return;
    };

var getLocalBar = function (locationInputVal, radiusInputVal) {
    // need to double check endpoints and paramaters. 581301 refers to code for "Bars" as default restaurant type 
    var apiURL = "http://www.mapquestapi.com/search/v2/radius?origin=" + locationInputVal +"&radius=" + radiusInputVal + "maxMatches=6&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581301&outFormat=json&key=" + key;

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

searchformEl.addEventListener("submit", handleLocationFormSubmit);

