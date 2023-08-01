// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let div = document.getElementById("missionTarget");
   div.innerHTML = `
   
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter:${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
   `
}

function validateInput(testInput) {
  
    if (testInput === "" || testInput === 0)
    {
        return "Empty";
    }
    else if (!isNaN(testInput))
    {
        return "Is a Number";
    }
    else if (isNaN(testInput))
    {
        return "Not a Number";
    }
 }



function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
  
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty" ){
        alert("All fields are required!");

    }else if(validateInput(pilot) === "Is a number" || validateInput(copilot) === "Is a number" || validateInput(fuelLevel) === "Not a number" || validateInput(cargoMass) === "Not a number"){
        alert("Please enter a correct information!");
    }else{
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        let launchStatus = document.getElementById("launchStatus");
        list.style.visibility = "visible";

        if(fuelLevel < 10000 || cargoMass > 10000){
            launchStatus.innerHTML  = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
            fuelStatus.innerHTML  = "Fuel level high enough for launch";
            cargoStatus.innerHTML  = "Cargo mass too heavy for launch";

        }else if(fuelLevel < 10000){
            launchStatus.innerHTML  = "Shuttle Not Ready for Launch";
            fuelStatus.innerHTML  = "Fuel level too low for launch";
            cargoStatus.innerHTML  = "Cargo mass low enough for launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
      
        }else if(cargoMass > 10000){
            launchStatus.innerHTML  = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
            fuelStatus.innerHTML  = "Fuel level high enough for launch";
            cargoStatus.innerHTML  = "Cargo mass too heavy for launch";

        }else{
            fuelStatus.innerHTML = "Fuel level high enough for launch"
            cargoStatus.innerHTML = "Cargo mass low enough for launch"
            launchStatus.innerHTML  = "Shuttle is Ready for Launch";
            launchStatus.style.color = "#419F6A";

        }
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      return response.json();
});

    return planetsReturned;
}

function pickPlanet(planets) {
    let number  = Math.floor(Math.random()*planets.length);
    return planets[number];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
