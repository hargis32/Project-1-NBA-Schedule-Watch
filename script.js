<<<<<<< HEAD
=======

>>>>>>> 2cd0953619ac9ea73ff662e74b9b14fe4f60cd39

function searchAPI(location, radius) {
    var locQueryUrl = "https://www.mapquestapi.com/search/v2/radius?"
}

function handleLocationFormSubmit(event) {
    event.preventDefault();

    // link id to zipcode/address input
    var locationInputVal = document.querySelector('#location-input').value;
    // link id to #-mile-radius input, if we so choose....
    var radiusInputVal = document.querySelector('#radius-input').value;
    if (location) {
        getLocalBar(location);
    }
    else (!locationInputVal) {
        console.error('Not a valid address. Please try again.');
        return;
      }
};

var getLocalBar = function (location) {
    // need to double check endpoints and paramaters. 581301 refers to code for "Bars" as default restaurant type 
    var apiURL = "http://www.mapquestapi.com/search/v2/radius?origin=" + locationInputVal +"&radius=" + radiusInputVal + "maxMatches=6&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581301&outFormat=json&key=KEY";

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (#) {
                    console.log(#);
                    displayBars(#);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })

};
// need to pick up here. 
var displayBars = function

searchformEl.addEventListener("submit", handleLocationFormSubmit);

