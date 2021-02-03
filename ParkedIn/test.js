const buttonLakeLouiseParking = document.querySelector("#headingOne")
const buttonMoraineLakeParking = document.querySelector("#headingTwo")
const buttonOverflowParking = document.querySelector("#headingThree")

function panToLocation(location, map) {
    map.panTo(location);
}

buttonLakeLouiseParking.addEventListener("click", panToLocation(lakeLouiseParkingCoordinates, map));
buttonMoraineLakeParking.addEventListener("click", panToLocation(moraineLakeParkingCoordinates));
buttonOverflowParking.addEventListener("click", panToLocation(overflowParkingCoordinates));