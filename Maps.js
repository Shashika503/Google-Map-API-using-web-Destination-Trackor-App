var myLatlng = { lat: 6.927079, lng: 79.861244 };
var mapOptions = {
  center: myLatlng,
  zoom: 10,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

var directionsService = new google.maps.DirectionsService();

var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

//Create a request

function calcRoute() {
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING,
    UnitSystem: google.maps.UnitSystem.IMPERIAL
  };

  // Pass request to the route method

  directionsService.route(requst, (result, status) => {
    if (status == google.maps.DirectionStatus.OK) {
      //get distance and timestamp

      const output = document.querySelector("#output");
      output.innerHTML =
        "<div class='alert-info'> from:" +
        document.getElementById("from").value +
        " .<br>To: " +
        document.getElementById("to").value +
        ".<br/> Driving distance <i class='fa-solid fa-road'></i>:" +
        result.routes[0].legs[0].distance.text +
        ".<br/>Duration <i class='fa-duotone fa-timer'></i> : " +
        result.routes[0].legs[0].duration.text +
        ". </div>";

      //display routes
      directionsDisplay.setDirections(result);
    } else {
      //delete route from maps
      directionsDisplay.setDirections({ routes: [] });

      //center map in sri lanka
      map.setCenter(myLatlng);

      //show error message
      output.innerHTML =
        "<div class = 'alert-danger'><i class='fa-duotone fa-circle-exclamation'></i> could not retrieve driving distance. </div>";
    }
  });
}

//create a autocomplete objects for all inputs

var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

