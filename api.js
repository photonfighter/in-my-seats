/*
    Addresses must be structured like "1234 Peaceful Ln. Cleveland OH"
*/

import 'isomorphic-fetch'
import './../console-dot-emoji/console.emoji.js'

const config = require('./config.js');
const PROPUBLICA_API_KEY = config.publica_KEY;
const GOOGLE_API_KEY = config.google_KEY;
const publicaHead = new Headers({
    'x-api-key': PROPUBLICA_API_KEY
});
const publicaInit = {headers: publicaHead};

function listSenateMembers(address) {
    address = addressForURL(address);
    let state = getStateGoogle(address);
    console.dog(state);
    console.cat(address);

    // setting up ProPublica Senate URL
    let sURL = 'https://api.propublica.org/congress/v1/members/senate/' + state + '/current.json';

    // Accessing ProPublica Congress API
    /*fetch(sURL, publicaInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
    });*/
}

function listHouseMembers(address) {
    let hURL = 'https://api.propublica.org/congress/v1/members/house/' + /* 2 letter state code */ + /* district number */ + '/current.json';
    fetch(hURL, publicaInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
}

function getStateGoogle(address) {
    var googURL = 'https://www.googleapis.com/civicinfo/v2/voterinfo?key=' + GOOGLE_API_KEY + '&address=' + address;
    fetch(googURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson){
        let state = JSON.stringify(myJson.normalizedInput.state);
        return state;
      });
}

function addressForURL(address) {
    address = address.split(' ').join('%20');
    return address;
}

listSenateMembers(""); // Insert address during testing, but do not commit addresses to the repo
