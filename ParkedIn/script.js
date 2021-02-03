/**
 * Initiates a map with parking coordinates and zooms at Lake Louise Parking
 */

//Coordinates
const lakeLouiseTownCoordinates = { lat: 51.425, lng: -116.1773 };
const lakeLouiseParkingCoordinates = { lat: 51.4149585, lng: -116.2134862};
const moraineLakeParkingCoordinates = { lat: 51.3294, lng: -116.1817 };
const overflowParkingCoordinates = { lat: 51.3867448, lng: -116.1302803 };

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10.5,
        center: lakeLouiseParkingCoordinates,
    });
    //Markers

    const customMarker = {
        url: "Resources/Icons/customMarker.svg",
        scaledSize: new google.maps.Size(50, 50),
    }
    
    const markerMoraineLakeParking = new google.maps.Marker({
        position: moraineLakeParkingCoordinates,
        map: map,
        icon: customMarker,
    }); 
    const markerLakeLouiseParking = new google.maps.Marker({
        position: lakeLouiseParkingCoordinates,
        map: map,
        icon: customMarker,
    });
    const markerOverflowParking = new google.maps.Marker({
        position: overflowParkingCoordinates,
        map: map,
        icon: customMarker,
    });

    const buttonLakeLouiseParking = document.querySelector("#headingOne")
    const buttonMoraineLakeParking = document.querySelector("#headingTwo")
    const buttonOverflowParking = document.querySelector("#headingThree")
    
    buttonLakeLouiseParking.addEventListener("click", function() {
        map.panTo(lakeLouiseParkingCoordinates);
        map.setZoom(16);
    })
    buttonMoraineLakeParking.addEventListener("click", function() {
        map.panTo(moraineLakeParkingCoordinates);
        map.setZoom(16);
    })
    buttonOverflowParking.addEventListener("click", function() {
        map.panTo(overflowParkingCoordinates);
        map.setZoom(15);
    })

}

//variables
let parkingLots = [];
const availableLots = document.getElementsByClassName("counter");
const availableParkingNumbers = []
const namesParkingLots = document.getElementsByClassName("buttonName");
const lotHours = document.getElementsByClassName("lotHours");
const parkingIconsAndInfo = document.getElementsByClassName("parkingIconsAndInfo");
const directionsButton = document.getElementsByClassName("directionsButton");
const address = document.getElementsByTagName("address");
const featureIcons = ["accessible.svg", "bicycle.svg", "motorbike.svg", "chargingStation.svg", "rv.svg"];
const featureIconsDisplayed = [];
//methods

/**
 * Onloads the list of functions to set up the page.
 * Can be populated with more functions later on.
 */
function pageLoad() {
    // retrieveParkingLots();
    retrieveParkingLotsCouch();
}

/**
 * Fetches parkingLots object from server
 * updates stalls available
 * returns an array of parking lots with following IDs
 * 1 - Lake Louise
 * 2 - Moraine Lake
 * 3 - Overflow 
 */
function retrieveParkingLots() {
    fetch ('http://localhost:8082/parkinglots')
    .then(response => response.json()) //converts response json file to an object
    .then(lots => {
        parkingLots = lots;
    })
    .then(parkingLots => updateParkingContent());
}

function retrieveParkingLotsCouch() {
    fetch ('http://localhost:8082/parkinglotscouch')
    .then(response => response.json()) //converts response json file to an object
    .then(lots => {
        parkingLots = lots;
    })
    .then(() => updateParkingContent());
}


/**
 * goes through the array of parking lots and updates stalls available
 */
function updateParkingContent() { //TODO rename to represent update of parking lots
    for (let i = 0; i < parkingLots.length; i++) {
        namesParkingLots[i].innerHTML = parkingLots[i].name;  
        
        parkingIconsAndInfo[i].innerHTML = `<b>Parking Features:<b> <br>
        ${putFeatureIcons(getFeatureIcons(parkingLots[i]))}
        `
        // console.log(getFeatureIcons(parkingLots[i]));

        address[i].innerHTML = parkingLots[i].address;
        lotHours[i].innerHTML = `<b>Lot Hours:</b> 
        <li>Monday: ${parkingLots[i].hours.monday}</li>
        <li>Tuesday: ${parkingLots[i].hours.tuesday}</li>
        <li>Wednesday: ${parkingLots[i].hours.wednesday}</li>
        <li>Thursday: ${parkingLots[i].hours.thursday}</li>
        <li>Friday: ${parkingLots[i].hours.friday}</li>
        <li>Saturday: ${parkingLots[i].hours.saturday}</li>
        <li>Sunday: ${parkingLots[i].hours.sunday}</li>
        `
        availableLots[i].innerHTML = calculateStallsAvailable(parkingLots[i]);
        parkingWarning(availableLots[i])
    };
}

/**
 * calculates stalls available for each obj
 * @param {parkingLot} obj 
 */
function calculateStallsAvailable (obj) {
    let stallsAvailable = obj.capacity - obj.stallsOccupied;
    if (stallsAvailable === 0) {
        stallsAvailable = "FULL";
    }
    return stallsAvailable;
}


/**
 * sets intervals for stallsAvailable updates
 */
const setIntervalUpdateParkingContent = setInterval(retrieveParkingLotsCouch, 5000);
/**
 * returns an object of a parkign by id
 * @param {
 * 1 - Lake Louise
 * 2 - Moraine Lake
 * 3 - Overflow 
 * } id 
 */
function retrieveParkingLot(id) {
    fetch (`http://localhost:8082/parkingLot?id=${id}`)
    .then(response => response.json()) //converts response json file to an object
    .then(lot => {
        console.log(lot);
        //debugger;
    });
}

//***********************************************************************//
//function for parking warning colours  
function parkingWarning (availableLots) {
    if (parseInt(availableLots.innerHTML) <= 10 && parseInt(availableLots.innerHTML) >= 1 ) {
        availableLots.style.color = "#FFA500";
    } else if (availableLots.innerHTML === "FULL") {
        availableLots.style.color = "#FF0000";
    } else if (parseInt(availableLots.innerHTML) > 10) {
        availableLots.style.color = "#ADFF2F";
    }
}

function getFeatureIcons(parkingLot) {
    let features = parkingLot.parkingFeatures;
    let iconsToDisplay = [];
    for (let i = 0; i < Object.keys(features).length; i++) {
        // if (features[Object.keys(features)[i]] === true) {
        //     iconsDisplayed.push(featureIcons[i]); 
        // }
        if (Object.values(features)[i] === true) {
            iconsToDisplay.push(featureIcons[i]); 
        }
    }
    return iconsToDisplay;
}

function putFeatureIcons(iconsToDisplay){
    iconsToDisplayHTML = ""
    for (let i = 0; i < iconsToDisplay.length; i++) {
        iconsToDisplayHTML += `<img class="parkingIcons" src="Resources/Icons/${iconsToDisplay[i]}" alt="${iconsToDisplay[i]}"></img>`
    }
    return iconsToDisplayHTML
}