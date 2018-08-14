// Current testing fetch() requests are set to Miami University area/District 53 in Ohio
import config from './config.js';

let apikey = config.API_KEY;

var header = new Headers();
header.append("X-API-Key: " + apikey);

function listSenateMembers(){
  fetch('https://api.propublica.org/congress/v1/members/115/OH/current.json').then(function(response){
    return response.json();
  }).then(function(myJson) {
    console.log(myJson);
  });
}

function listHouseMembers(){
  fetch('https://api.propublica.org/congress/v1/members/115/OH/53/current.json').then(function(response){
    return response.json();
  }).then(function(myJson) {
    console.log(myJson);
  });
}
