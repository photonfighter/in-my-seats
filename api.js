import 'isomorphic-fetch'

const config = require('./config.js');
const PROPUBLICA_API_KEY = config.publica_KEY;
const GOOGLE_API_KEY = config.google_KEY;
var sURL = '';
var hURL = '';
const publicaHead = new Headers({
    'x-api-key': PROPUBLICA_API_KEY
});
const publicaInit = {headers: publicaHead};

function senateURL(){
    sURL = 'https://api.propublica.org/congress/v1/members/senate/' + /* 2 letter state code */ + '/current.json';
}

function houseURL(){
    sURL = 'https://api.propublica.org/congress/v1/members/house/' + /* 2 letter state code */ + /* district number */ + '/current.json';
}

function getInfoGoogle(address){
    var googURL = 'https://www.googleapis.com/civicinfo/v2/voterinfo?key=' + GOOGLE_API_KEY;
    fetch(googURL) // working on fetch request to civic api
}

function listSenateMembers(){
    fetch(oxfordSURL, publicaInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
}

function listHouseMembers(){
    fetch(oxfordHURL, publicaInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
}
