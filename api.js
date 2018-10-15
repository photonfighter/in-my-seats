/*
    Address must be structured like "1234 Peaceful Ln. Cleveland OH"
*/

import 'isomorphic-fetch'

const config = require('./config.js');
const PROPUBLICA_API_KEY = config.publica_KEY;
const GOOGLE_API_KEY = config.google_KEY;
var sURL = '';
var hURL = '';
var dist = 0;
const publicaHead = new Headers({
    'x-api-key': PROPUBLICA_API_KEY
});
const publicaInit = {headers: publicaHead};

function senateURL(address) {
    var stateTwo = getInfoGoogle(address);
    sURL = 'https://api.propublica.org/congress/v1/members/senate/' + stateTwo + '/current.json';
    console.log(sURL);
}

function houseURL(address) {
    sURL = 'https://api.propublica.org/congress/v1/members/house/' + /* 2 letter state code */ + /* district number */ + '/current.json';
}

function getInfoGoogle(address) {
    address = addressForURL(address);
    var googURL = 'https://www.googleapis.com/civicinfo/v2/voterinfo?key=' + GOOGLE_API_KEY + '&address=' + address;
    fetch(googURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data){
         return setState(data);
      });
}

function listSenateMembers(address) {
    fetch(senateURL(address), publicaInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
}

function listHouseMembers(address) {
    fetch(hURL, publicaInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
}

function addressForURL(address) {
    address = address.split(' ').join('%20');
    return address;
}

function setState(data) {
    return data.normalizedInput.state;
}

senateURL("8112 High Oaks Dr. Lambertville MI");
