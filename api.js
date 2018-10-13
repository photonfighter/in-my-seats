// Current testing requests are set to Miami University area/District 8 in Ohio
import 'isomorphic-fetch'

const config = require('./config.js');
const PROPUBLICA_API_KEY = config.API_KEY;
const oxfordSURL = 'https://api.propublica.org/congress/v1/members/senate/OH/current.json';
const oxfordHURL = 'https://api.propublica.org/congress/v1/members/house/OH/8/current.json';
const myHeaders = new Headers({
    'x-api-key': PROPUBLICA_API_KEY
});
const myInit = {headers: myHeaders};

function listSenateMembers(){
    fetch(oxfordSURL, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
}

function listHouseMembers(){
    fetch(oxfordHURL, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
}
